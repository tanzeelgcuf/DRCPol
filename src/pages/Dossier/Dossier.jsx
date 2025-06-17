import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Dossier.css';

const Dossier = () => {
  const [dossiers, setDossiers] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch("http://34.30.198.6:8081/api/intelligence/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          priority,
          assigned_to: assignedTo
        })
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || "Erreur lors de la création du dossier");
      } else {
        setMessage("Dossier créé avec succès !");
        setDossiers(prev => [...prev, data]);
        setTitle('');
        setPriority('medium');
        setAssignedTo('');
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
          <span className="admin">Dashboard</span>
          <div className="search-box2">
            <input type="text" placeholder="Rechercher un dossier..." />
            <button type="submit">Rechercher</button>
          </div>
          <div className="logout">
            <Link to='/login'><i id="bx_power" className='bx bx-power-off'></i></Link>
            <span className="status-icon"></span>
          </div>
        </header>

        {/* Formulaire */}
        <section className="advanced-search">
          <h2>Créer un nouveau dossier</h2>
          <form className="search-container" onSubmit={handleSubmit}>
            <input
              className="search-input"
              type="text"
              placeholder="Titre du dossier"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <select
              className="search-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
              <option value="critical">Critique</option>
            </select>
            <input
              className="search-input"
              type="text"
              placeholder="Assigné à"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            />
            <button className="search-btn" type="submit" disabled={loading}>
              {loading ? "En cours..." : "Créer"}
            </button>
          </form>
          {message && <p style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>{message}</p>}
        </section>

        {/* Tableau des dossiers */}
        <section className="advanced-search">
          <h2>Liste des dossiers</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0f0', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Titre</th>
                <th style={{ padding: '12px' }}>Priorité</th>
                <th style={{ padding: '12px' }}>Assigné à</th>
              </tr>
            </thead>
            <tbody>
              {dossiers.map((dossier, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{dossier.title}</td>
                  <td style={{ padding: '12px' }}>{dossier.priority}</td>
                  <td style={{ padding: '12px' }}>{dossier.assigned_to}</td>
                </tr>
              ))}
              {dossiers.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ padding: '12px', textAlign: 'center' }}>Aucun dossier enregistré pour l'instant.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dossier;
