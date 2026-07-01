"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "WilsonOwner" && password === "121196") {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-dark)", padding: "2rem", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "40vw", height: "40vw", background: "radial-gradient(circle, var(--primary-glow) 0%, rgba(0,0,0,0) 70%)", filter: "blur(80px)", zIndex: 0, opacity: 0.5 }} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "4rem",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "480px",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <img src="/assets/Logo.png" alt="Mundo Express" style={{ height: "45px", margin: "0 auto 1.5rem auto" }} />
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "0.5px" }}>Portal Administrativo</h2>
          <p style={{ color: "var(--text-light)", fontSize: "0.95rem", marginTop: "0.5rem" }}>Ingresa tus credenciales para acceder</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-light)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Usuario
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej. WilsonOwner"
              style={{
                width: "100%",
                padding: "1rem 1.2rem",
                borderRadius: "12px",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-light)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Contraseña
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "1rem 1.2rem",
                borderRadius: "12px",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center", fontWeight: 600 }}
            >
              Credenciales incorrectas. Intenta de nuevo.
            </motion.div>
          )}

          <motion.button 
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "var(--primary)",
              color: "white",
              padding: "1rem",
              borderRadius: "12px",
              border: "none",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: "1rem",
              boxShadow: "0 0 20px var(--primary-glow)",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}
          >
            Ingresar
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
