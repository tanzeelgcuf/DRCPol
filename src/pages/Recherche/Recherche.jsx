import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Recherche.css';
import { assets } from "../../assets/assets";

const Nfiche = () => {
  // États pour création watchlist
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [agency, setAgency] = useState("");
  const [priority, setPriority] = useState("low");
  const [creationMessage, setCreationMessage] = useState(null);

  // États pour recherche
  const [showSearch, setShowSearch] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [alerteActive, setAlerteActive] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");

  // Création dans watchlist
  const handleCreateWatchlist = async () => {
    if (!name || !reason || !agency || !priority) {
      setCreationMessage("Tous les champs sont obligatoires.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.30.198.6:8081/api/intelligence/watchlist/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, reason, agency, priority }),
      });

      if (response.ok) {
        setCreationMessage("Entrée créée avec succès !");
        // Reset des champs
        setName("");
        setReason("");
        setAgency("");
        setPriority("low");
      } else {
        const errorData = await response.json();
        setCreationMessage("Erreur : " + (errorData.message || "Impossible de créer l'entrée."));
      }
    } catch (error) {
      setCreationMessage("Erreur réseau : " + error.message);
    }
  };

  // Recherche (inchangé)
  const toggleSearch = () => setShowSearch(!showSearch);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://34.30.198.6:8081/api/watchlist/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, nationality }),
      });

      if (!response.ok) {
        setSearchResult(null);
        return;
      }

      const data = await response.json();
      if (data && Object.keys(data).length > 0) {
        setSearchResult(data);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error("Erreur de recherche :", error.message);
      setSearchResult(null);
    }
  };

  return (
    <div id="content">
      <main>
        <header className="header">
          <span className="admin">Dashboard</span>
          <div className="logout">
            <Link to='/login'><i id="bx_power" className='bx bx-power-off'></i></Link>
            <span className="status-icon"></span>
          </div>
        </header>

        {/* Formulaire création watchlist */}
        <section className="advanced-search" style={{ marginBottom: "40px" }}>
          <h2>Créer une entrée dans la liste de surveillance</h2>
          <div className="search-container" style={{ flexWrap: "wrap", gap: "15px" }}>
            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: "2", padding: "10px" }}
            />
            <input
              type="text"
              placeholder="Raison"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{ flex: "3", padding: "10px" }}
            />
            <input
              type="text"
              placeholder="Agence"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              style={{ flex: "2", padding: "10px" }}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ flex: "1", padding: "10px" }}
            >
              <option value="low">Faible</option>
              <option value="medium">Moyen</option>
              <option value="high">Élevé</option>
              <option value="critical">Critique</option>
            </select>
            <button
              onClick={handleCreateWatchlist}
              className="search-btn"
              style={{ flex: "1" }}
            >
              Créer
            </button>
          </div>
          {creationMessage && <p style={{ marginTop: "10px", color: creationMessage.includes("Erreur") ? "red" : "green" }}>{creationMessage}</p>}
        </section>

        {/* Section recherche */}
        <section className="advanced-search">
          <button className="toggle-btn" onClick={toggleSearch}>
            Recherche avancée
          </button>

          {showSearch && (
            <>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Entrer le Prénom de la personne surveiller"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Entrer le nom de la personne surveiller"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Entrer la nationalité de la personne surveiller"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
                <button type="button" onClick={handleSearch} className="search-btn">
                  Rechercher
                </button>
              </div>
            </>
          )}

          {searchResult && (
            <div className="search-result">
              <div className="result-left">
                <h3>Identité complète</h3>
                <p><strong>Nom :</strong> {searchResult.lastName} {searchResult.firstName}</p>
                <p><strong>Nationalité :</strong> {searchResult.nationality}</p>
                <p><strong>Téléphone :</strong> {searchResult.phoneNumber || "N/A"}</p>
                <p><strong>Numéro ID :</strong> {searchResult.documentNumber || "N/A"}</p>
                <p><strong>Alertes :</strong> {searchResult.alerts?.length || 0} alerte(s)</p>
                <p><strong>Hôtels visités :</strong> {searchResult.hotels?.join(", ") || "N/A"}</p>
                <p><strong>Moyens de paiement :</strong> {searchResult.paymentMethods?.join(", ") || "N/A"}</p>
                <p style={{ cursor: "pointer" }}><strong>Voir plus</strong></p>
              </div>

              <div className="result-right">
                <img src={searchResult.photo || assets.passport} alt="photo utilisateur" className="user-photo" />
              </div>

              {!showDescription ? (
                <div className="form-switch">
                  <span>Activer l'alerte maintenant</span>
                  <div className="label_switch">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={alerteActive}
                        onChange={(e) => {
                          setAlerteActive(e.target.checked);
                          if (e.target.checked) {
                            setShowDescription(true);
                          }
                        }}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label>Description de l’alerte</label>
                  <div className="description">
                    <textarea
                      placeholder="Ex : individu recherché pour vol..."
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setShowDescription(false);
                      setAlerteActive(false);
                      setDescription("");
                    }}
                  >
                    Annuler
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Nfiche;
