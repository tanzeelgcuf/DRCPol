import React, { useMemo, useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Se connecter");
  const [username, setUsername] = useState('');
  const [valueMdp, setValueMdp] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const securite = useMemo(() => {
    return Motdepase(valueMdp);
  }, [valueMdp]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currState === "Se connecter") {
        const response = await fetch("http://34.30.198.6:8081/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password: valueMdp
          })
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Échec de la connexion");
          return;
        }

        localStorage.setItem("token", data.token);
        toast.success(data.message || "Connexion réussie !");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        const userData = {
          username,
          email,
          password: valueMdp,
          firstName,
          lastName,
          role: "user"
        };

        const response = await fetch("http://34.30.198.6:8081/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Échec de la création");
          return;
        }

        toast.success(data.message || "Compte créé avec succès !");
        setCurrState("Se connecter");
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur de communication avec le serveur");
    }
  };

  function Motdepase(valueMdp) {
    if (valueMdp.length === 0) return '';
    if (valueMdp.length < 5) return 'Mot de passe faible';
    else if (valueMdp.length < 7) return 'Mot de passe moyen';
    else return 'Mot de passe fort';
  }

  return (
    <div className="fullscreen-background">
      <div className="login-popup">
        <form className="login-popup-contenair" onSubmit={handleSubmit}>
          <div className="img_logo">
            <img src={assets.logo} alt="Logo" />
          </div>
          <div className="login-popup-title">
            <h2>{currState}</h2>
          </div>
          <div className="login-popup-inputs">
            {currState === "Créer un compte" && (
              <>
                <div className="input-pair">
                  <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-pair">
                  <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            {currState === "Se connecter" && (
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <input
              type="password"
              placeholder="Mot de passe"
              value={valueMdp}
              onChange={(e) => setValueMdp(e.target.value)}
              required
            />
            {currState === "Créer un compte" && <p>{securite}</p>}
          </div>
          <button type="submit">
            {currState === "Créer un compte" ? "Créer un compte" : "Se connecter"}
          </button>
          {currState === "Se connecter" ? (
            <p>
              Créer un compte ? <span onClick={() => setCurrState("Créer un compte")}>cliquez ici</span>
            </p>
          ) : (
            <p>
              Déjà inscrit ? <span onClick={() => setCurrState("Se connecter")}>Se connecter</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
