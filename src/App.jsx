import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './composants/NAVBAR/Navbar.jsx';
import Dashboard from './pages/DashBoard/dashboard.jsx';
import Recherche from './pages/Recherche/Recherche.jsx';
import Alerte from './pages/Alerte/Alerte.jsx';
import Dossier from './pages/Dossier/Dossier.jsx'
import CreationPoste from './pages/CreationPoste';
import Admin from './pages/Admin';
import Logout from './pages/Logout';
import Etablissement from './pages/Etablissement/Etablissement.jsx';
import Login from './pages/Login/Login.jsx';
import Faciale from './pages/Faciale/Faciale.jsx';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  const url = "http://localhost:4000";

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<Dashboard url={url} />} />
          <Route path="/recherche" element={<Recherche url={url} />} />
          <Route path="/alerte" element={<Alerte url={url} />} />
          <Route path="/Etablissement" element={<Etablissement url={url} />} />
          <Route path="/faciale" element={<Faciale url={url} />} />
          <Route path="/dossier" element={<Dossier url={url} />} />
          <Route path="/admin" element={<Admin url={url} />} />
          <Route path="/sedeconnecter" element={<Logout url={url} />} />
          <Route path="/login" element={<Login url={url} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
