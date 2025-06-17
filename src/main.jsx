import React from 'react';
import ReactDOM from 'react-dom/client';  // Importation correcte de ReactDOM dans React 18
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Création du root
root.render(  // Utilisation de render sur le root
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
