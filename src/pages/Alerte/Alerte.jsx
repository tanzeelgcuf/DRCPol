import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Alerte.css';

const Alerte = () => {
  const [alerts, setAlerts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [severityId, setSeverityId] = useState(3);
  const [clearanceLevelId, setClearanceLevelId] = useState(3);
  const [location, setLocation] = useState('');
  const [createdById, setCreatedById] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch("http://34.30.198.6:8081/api/intelligence/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          categoryId,
          severityId,
          clearanceLevelId,
          location,
          createdById
        })
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || "Erreur lors de la création de l'alerte");
      } else {
        setMessage("Alerte créée avec succès !");
        setAlerts(prev => [...prev, data]);
        setTitle('');
        setDescription('');
        setLocation('');
        setCategoryId(1);
        setSeverityId(3);
        setClearanceLevelId(3);
      }
    } catch (error) {
      setMessage("Erreur de communication avec le serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="content">
      <main>
        <header className="header">
          <span className="admin">Alerte</span>
          <div className="search-box2">
            <input type="text" placeholder="Rechercher une alerte..." />
            <button type="submit">Rechercher</button>
          </div>
          <div className="logout">
            <Link to='/login'><i id="bx_power" className='bx bx-power-off'></i></Link>
            <span className="status-icon"></span>
          </div>
        </header>

        {/* Formulaire de création d'alerte */}
        <section className="advanced-search">
          <h2>Créer une alerte</h2>
          <form className="search-container" onSubmit={handleSubmit}>
            <input
              className="search-input"
              type="text"
              placeholder="Titre de l'alerte"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              className="search-input"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <select
              className="search-select"
              value={categoryId}
              onChange={(e) => setCategoryId(parseInt(e.target.value))}
            >
                <option value="">Catégorie</option>
              <option value={1}>Catégorie 1</option>
              <option value={2}>Catégorie 2</option>
              <option value={3}>Catégorie 3</option>
            </select>
            <select
              className="search-select"
              value={severityId}
              onChange={(e) => setSeverityId(parseInt(e.target.value))}
            >
                <option value="">Sévérité</option>
              <option value={1}>Gravité Faible</option>
              <option value={2}>Gravité Moyenne</option>
              <option value={3}>Gravité Élevée</option>
            </select>
            <select
              className="search-select"
              value={clearanceLevelId}
              onChange={(e) => setClearanceLevelId(parseInt(e.target.value))}
            >
                <option value="">Niveau d'autorisation</option>
              <option value={1}>Niveau 1</option>
              <option value={2}>Niveau 2</option>
              <option value={3}>Niveau 3</option>
            </select>
            <input
              className="search-input"
              type="text"
              placeholder="Lieu"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <button className="search-btn" type="submit" disabled={loading}>
              {loading ? "En cours..." : "Créer l'alerte"}
            </button>
          </form>
          {message && <p style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>{message}</p>}
        </section>

        {/* Tableau des alertes */}
        <section className="advanced-search">
          <h2>Liste des alertes</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0f0', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Titre</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Lieu</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{alert.title}</td>
                  <td style={{ padding: '12px' }}>{alert.description}</td>
                  <td style={{ padding: '12px' }}>{alert.location}</td>
                </tr>
              ))}
              {alerts.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ padding: '12px', textAlign: 'center' }}>Aucune alerte enregistrée.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Alerte;
