// src/components/PasswordPopup.js
import React, { useState, useEffect } from "react";

const PasswordPopup = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Nouveau state pour afficher/masquer le mot de passe
  const correctPassword = "CISP_2025"; // Remplace par ton mot de passe

  // Vérifie si le mot de passe est valide à chaque changement
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (password === correctPassword) {
      localStorage.setItem("authenticated", "true"); // Sauvegarde l'état dans localStorage
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alterne l'état de visibilité du mot de passe
  };

  useEffect(() => {
    // Vérifie si l'utilisateur est déjà authentifié dans le localStorage
    if (localStorage.getItem("authenticated") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {!isAuthenticated ? (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9999",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <h2>Accès sécurisé</h2>
            <p>Veuillez entrer le mot de passe pour continuer :</p>
            <input
              type={showPassword ? "text" : "password"} // Change le type en fonction de l'état
              value={password}
              onChange={handlePasswordChange}
              placeholder="Mot de passe"
              style={{ padding: "10px", width: "80%" }}
            />
            <button
              onClick={togglePasswordVisibility}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? (
                <span role="img" aria-label="Masquer le mot de passe">
                  👁️
                </span>
              ) : (
                <span role="img" aria-label="Afficher le mot de passe">
                  👁️‍🗨️
                </span>
              )}
            </button>
            <br />
            <button
              onClick={handleSubmit}
              style={{
                padding: "10px 20px",
                marginTop: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Accéder
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PasswordPopup;
