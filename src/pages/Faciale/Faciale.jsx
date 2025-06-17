import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Faciale.css";

const Faciale = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Convertit l'image en base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Veuillez sélectionner une image.");
      return;
    }
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const base64Image = await convertToBase64(imageFile);

      // Récupération du token dans localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "Token d'authentification non trouvé. Veuillez vous connecter."
        );
      }

      const response = await fetch(
        "http://34.30.198.6:8081/api/facial-recognition/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            image_data: base64Image,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="content" style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <main >
        <header
          className="header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <span className="admin" style={{ fontWeight: "bold", fontSize: 24 }}>
            Dashboard
          </span>
          <div className="logout">
            <Link to="/login" title="Déconnexion">
              <i
                id="bx_power"
                className="bx bx-power-off"
                
              ></i>
            </Link>
            <span className="status-icon"></span>
          </div>
        </header>

        <section
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20,
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 20,
              color: "#111827",
            }}
          >
            Recherche par Reconnaissance Faciale
          </h1>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <label
              htmlFor="imageUpload"
              style={{ fontWeight: "600", color: "#374151" }}
            >
              Sélectionnez une image
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                cursor: "pointer",
                borderRadius: 6,
                border: "1px solid #d1d5db",
                padding: 8,
                fontSize: 14,
              }}
            />

            {imagePreview && (
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontWeight: "600",
                    color: "#4b5563",
                    marginBottom: 8,
                  }}
                >
                  Aperçu de l'image :
                </p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxHeight: 200,
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            {error && (
              <p
                style={{
                  color: "#dc2626",
                  fontWeight: "600",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? "#9ca3af" : "#3b82f6",
                color: "white",
                padding: "12px 0",
                border:0,
                borderRadius: 8,
                fontWeight: "700",
                fontSize: 16,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.3s",
              }}
            >
              {loading ? "Recherche en cours..." : "Rechercher"}
            </button>
          </form>

          {results && (
            <div
              style={{
                marginTop: 30,
                backgroundColor: "#f3f4f6",
                borderRadius: 8,
                padding: 20,
                maxHeight: 300,
                overflowY: "auto",
                fontFamily: "monospace",
                fontSize: 14,
                color: "#374151",
                whiteSpace: "pre-wrap",
              }}
            >
              <h2
                style={{
                  fontWeight: "700",
                  marginBottom: 10,
                  color: "#111827",
                }}
              >
                Résultats de la recherche :
              </h2>
              {JSON.stringify(results, null, 2)}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Faciale;
