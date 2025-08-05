// src/components/PasswordPopup.js
import React, { useState, useEffect } from "react";

const PasswordPopup = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const correctPassword = process.env.GATSBY_SITE_PASSWORD || "CISP_2025"; // Utilise une variable d'environnement

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(""); // Efface l'erreur quand l'utilisateur tape
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem("authenticated", "true");
      setIsAuthenticated(true);
    } else {
      setError("Mot de passe incorrect. Veuillez réessayer.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
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
          role="dialog"
          aria-labelledby="password-dialog-title"
          aria-describedby="password-dialog-description"
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 id="password-dialog-title" style={{ marginBottom: "15px", color: "#333" }}>
              Accès sécurisé
            </h2>
            <p id="password-dialog-description" style={{ marginBottom: "20px", color: "#666" }}>
              Veuillez entrer le mot de passe pour continuer :
            </p>
            
            <form onSubmit={handleSubmit}>
              <div style={{ position: "relative", marginBottom: "15px" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Mot de passe"
                  aria-label="Mot de passe"
                  style={{
                    padding: "12px 40px 12px 12px",
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}

                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                  }}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              
              {error && (
                <div style={{ color: "#d32f2f", marginBottom: "15px", fontSize: "14px" }}>
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                  transition: "background-color 0.3s",
                }}
                onFocus={(e) => e.target.style.backgroundColor = "#45a049"}
                onBlur={(e) => e.target.style.backgroundColor = "#4CAF50"}
              >
                Accéder
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PasswordPopup;
