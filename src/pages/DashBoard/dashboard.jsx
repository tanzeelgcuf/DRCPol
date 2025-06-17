import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import './Dash.css';

const Dashboard = () => {
  const data = [
    { mois: 'Avril 2025', value: 2 },
    { mois: 'Mars 2025', value: 0 },
    { mois: 'Février 2025', value: 0 },
    { mois: 'Janvier 2025', value: 0 },
    { mois: 'Décembre 2024', value: 0 },
    { mois: 'Novembre 2024', value: 0 },
  ];

  const defaultIcon = new L.Icon({
    iconUrl,
    shadowUrl: iconShadow,
  });

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

        <section className="dashboard-overview">
        <div className="stats-cards">
            <div className="card card-bg">
              <i className='bx bxs-user-detail icon-large'></i>
              <div className="card-content">
                <h3>Total Individus Enregistrés</h3>
                <ul className="checkin-list">
                  <li>Jour : 12</li>
                  <li>Semaine : 87</li>
                  <li>Mois : 300</li>
                </ul>
              </div>
            </div>

            <div className="card card-bg">
              <i className='bx bxs-bell-ring icon-large'></i>
              <div className="card-content">
                <h3>Alertes Déclenchées</h3>
                <ul className="checkin-list">
                  <li>Nombre par jour: 8 <i className='bx bx-alarm'></i></li>
                  <li>Nombre par Semaine : 234 <i className='bx bx-alarm'></i></li>
                  <li>Nombre par mois: 659 <i className='bx bx-alarm'></i></li>
                </ul>
              </div>
            </div>

            <div className="card card-bg">
              <i className='bx bxs-error-alt icon-large'></i>
              <div className="card-content">
                <h3>Derniers Check-ins Suspects</h3>
                <ul className="checkin-list">
                  <li>John Doe | Hôtel: Serena</li>
                  <li>Jane Smith | Hôtel: Memling</li>
                  <li>Albert D. | Hôtel: Béatrice</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="dashboard-visuals">
            <div className="chart">
              <h3>Statistiques des enregistrements</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="map-section">
            <h3>Carte des mouvements (par hôtel)</h3>
            <MapContainer center={[-4.325, 15.322]} zoom={6} scrollWheelZoom={false} style={{ height: '300px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={[-4.325, 15.322]} icon={defaultIcon}>
                <Popup>
                  Hôtel Serena <br /> Kinshasa
                </Popup>
              </Marker>
              <Marker position={[-1.683, 29.235]} icon={defaultIcon}>
                <Popup>
                  Hôtel Memling <br /> Goma
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          </div>

          <div className="filters-section">
            <h3>Filtres</h3>
            <div className="filters">
              <select>
                <option>Province</option>
                <option>Kinshasa</option>
                <option>Nord-Kivu</option>
                <option>Kasaï</option>
              </select>
              <select>
                <option>Ville</option>
                <option>Goma</option>
                <option>Lubumbashi</option>
                <option>Kananga</option>
              </select>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
