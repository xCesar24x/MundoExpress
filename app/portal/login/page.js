"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortalLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && (!name || !phone))) {
      setError("Por favor completa todos los campos requeridos.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    
    // Save login status locally for the demo session
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    if (!isLogin) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userPhone", phone);
    }
    
    router.push("/portal/dashboard");
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "#050505", 
      padding: "2rem", 
      position: "relative", 
      overflow: "hidden",
      fontFamily: "var(--font-sans, system-ui, sans-serif)"
    }}>
      {/* Background glow effects */}
      <div style={{ 
        position: "absolute", 
        top: "20%", 
        left: "20%", 
        width: "35vw", 
        height: "35vw", 
        background: "radial-gradient(circle, rgba(20, 177, 189, 0.15) 0%, rgba(0,0,0,0) 70%)", 
        filter: "blur(60px)", 
        zIndex: 0 
      }} />
      <div style={{ 
        position: "absolute", 
        bottom: "20%", 
        right: "20%", 
        width: "35vw", 
        height: "35vw", 
        background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(0,0,0,0) 70%)", 
        filter: "blur(60px)", 
        zIndex: 0 
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "3.5rem 3rem",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "480px",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <a href="/">
            <img src="/assets/Logo.png" alt="Mundo Express" style={{ height: "45px", margin: "0 auto 1.5rem auto", cursor: "pointer" }} />
          </a>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>
            {isLogin ? "Portal de Clientes" : "Crear Casillero"}
          </h2>
          <p style={{ color: "var(--text-light)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
            {isLogin ? "Ingresa tus datos para gestionar tus paquetes" : "Regístrate para obtener tu casillero en Miami gratis"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: "1.2rem", overflow: "hidden" }}
              >
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-light)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Nombre Completo
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. César Madrigal"
                    required={!isLogin}
                    style={{
                      width: "100%",
                      padding: "0.9rem 1.1rem",
                      borderRadius: "12px",
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.25s, box-shadow 0.25s"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow = "0 0 10px rgba(20, 177, 189, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-light)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    WhatsApp / Celular
                  </label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. 84349442"
                    required={!isLogin}
                    style={{
                      width: "100%",
                      padding: "0.9rem 1.1rem",
                      borderRadius: "12px",
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.25s, box-shadow 0.25s"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow = "0 0 10px rgba(20, 177, 189, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-light)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Correo Electrónico
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              style={{
                width: "100%",
                padding: "0.9rem 1.1rem",
                borderRadius: "12px",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "white",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.25s, box-shadow 0.25s"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--primary)";
                e.target.style.boxShadow = "0 0 10px rgba(20, 177, 189, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-light)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Contraseña
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "0.9rem 1.1rem",
                borderRadius: "12px",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "white",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.25s, box-shadow 0.25s"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--primary)";
                e.target.style.boxShadow = "0 0 10px rgba(20, 177, 189, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              style={{ color: "#ef4444", fontSize: "0.85rem", fontWeight: 500, marginTop: "0.5rem" }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(135deg, var(--primary) 0%, #108d98 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: "pointer",
              marginTop: "0.8rem",
              boxShadow: "0 4px 15px rgba(20, 177, 189, 0.3)"
            }}
          >
            {isLogin ? "Ingresar →" : "Comenzar Registro →"}
          </motion.button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
            {isLogin ? "¿Aún no tienes cuenta?" : "¿Ya tienes un casillero?"}{" "}
            <span 
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              style={{ color: "var(--primary)", fontWeight: "600", cursor: "pointer", textDecoration: "underline" }}
            >
              {isLogin ? "Regístrate gratis" : "Inicia Sesión"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
