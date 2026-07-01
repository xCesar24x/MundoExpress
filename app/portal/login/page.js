"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortalLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Registration States
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idCard, setIdCard] = useState("");
  const [phone, setPhone] = useState("");
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [deliveryZone, setDeliveryZone] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [exactAddress, setExactAddress] = useState("");
  
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      if (!email || !password) {
        setError("Por favor completa todos los campos requeridos.");
        setTimeout(() => setError(""), 3000);
        return;
      }
    } else {
      if (!name || !lastName || !idCard || !password || !email || !phone || !provincia || !canton || !distrito || !deliveryZone || !deliveryType || !exactAddress) {
        setError("Por favor completa todos los campos requeridos (*).");
        setTimeout(() => setError(""), 3000);
        return;
      }
    }
    
    // Save login status and registration fields locally for the session
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    
    if (!isLogin) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userLastName", lastName);
      localStorage.setItem("userIdCard", idCard);
      localStorage.setItem("userPhone", phone);
      localStorage.setItem("userAddress", `${exactAddress}, ${distrito}, ${canton}, ${provincia}`);
    } else {
      // Set defaults for login demo
      localStorage.setItem("userName", "Cesar");
      localStorage.setItem("userLastName", "Madrigal Rodriguez");
      localStorage.setItem("userIdCard", "116680724");
      localStorage.setItem("userPhone", "84349442");
    }
    
    router.push("/portal/dashboard");
  };

  const inputStyle = {
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s"
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "20px"
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "var(--text-light)",
    marginBottom: "0.4rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "var(--primary)";
    e.target.style.boxShadow = "0 0 8px rgba(20, 177, 189, 0.2)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(255,255,255,0.08)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "#050505", 
      padding: "3rem 2rem", 
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
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          padding: isLogin ? "3.5rem 3rem" : "3rem 2.5rem",
          borderRadius: "24px",
          width: "100%",
          maxWidth: isLogin ? "480px" : "900px",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <a href="/">
            <img src="/assets/Logo.png" alt="Mundo Express" style={{ height: "40px", margin: "0 auto 1.2rem auto", cursor: "pointer" }} />
          </a>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>
            {isLogin ? "Portal de Clientes" : "Crea tu Casillero"}
          </h2>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginTop: "0.4rem" }}>
            {isLogin ? "Ingresa tus datos para gestionar tus paquetes" : "Únete a Mundo Express y empieza a comprar globalmente."}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          
          {isLogin ? (
            /* LOGIN FIELDS */
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div>
                <label style={labelStyle}>Correo Electrónico</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Contraseña</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          ) : (
            /* COMPREHENSIVE REGISTRATION FIELDS (matching screenshot) */
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Row 1: Datos Personales & Contacto */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr", md: "1fr 1fr", gap: "2rem" }} className="form-grid">
                
                {/* Column 1: Datos Personales */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--primary)", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>Datos Personales</h3>
                  
                  <div>
                    <label style={labelStyle}>Nombre *</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. César"
                      required
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Apellidos *</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Ej. Madrigal Rodriguez"
                      required
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Cédula / ID *</label>
                    <input 
                      type="text" 
                      value={idCard}
                      onChange={(e) => setIdCard(e.target.value)}
                      placeholder="Ej. 116680724"
                      required
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Contraseña *</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* Column 2: Contacto y Ubicación */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--primary)", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>Contacto y Ubicación</h3>
                  
                  <div>
                    <label style={labelStyle}>Correo Electrónico *</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      required
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Celular *</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 84349442"
                      required
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Provincia *</label>
                    <select 
                      value={provincia}
                      onChange={(e) => setProvincia(e.target.value)}
                      required
                      style={selectStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled style={{ background: "#050505" }}>Seleccione Provincia</option>
                      {["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"].map(prov => (
                        <option key={prov} value={prov} style={{ background: "#050505" }}>{prov}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Cantón *</label>
                      <select 
                        value={canton}
                        onChange={(e) => setCanton(e.target.value)}
                        required
                        style={selectStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        <option value="" disabled style={{ background: "#050505" }}>Cantón</option>
                        {["Central", "Escazú", "Desamparados", "San Pablo", "San Ramón", "Siquirres", "Liberia", "Puntarenas"].map(c => (
                          <option key={c} value={c} style={{ background: "#050505" }}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Distrito *</label>
                      <select 
                        value={distrito}
                        onChange={(e) => setDistrito(e.target.value)}
                        required
                        style={selectStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        <option value="" disabled style={{ background: "#050505" }}>Distrito</option>
                        {["Carmen", "San Rafael", "Aguas Claras", "San Francisco", "Sabanilla", "El Roble"].map(d => (
                          <option key={d} value={d} style={{ background: "#050505" }}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Row 2: Preferencias de Entrega */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "0.5rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--primary)", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>Preferencias de Entrega</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr", md: "1fr 1fr", gap: "1.5rem" }} className="form-grid">
                  <div>
                    <label style={labelStyle}>Zona de Entrega *</label>
                    <select 
                      value={deliveryZone}
                      onChange={(e) => setDeliveryZone(e.target.value)}
                      required
                      style={selectStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled style={{ background: "#050505" }}>Seleccione Zona</option>
                      {["GAM (Gran Área Metropolitana)", "Fuera del GAM / Rural"].map(z => (
                        <option key={z} value={z} style={{ background: "#050505" }}>{z}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Tipo de Entrega *</label>
                    <select 
                      value={deliveryType}
                      onChange={(e) => setDeliveryType(e.target.value)}
                      required
                      style={selectStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled style={{ background: "#050505" }}>Seleccione Tipo</option>
                      {["Retiro en Sucursal Central", "A domicilio por Correos de Costa Rica", "A domicilio por Encomienda"].map(t => (
                        <option key={t} value={t} style={{ background: "#050505" }}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Dirección Exacta *</label>
                  <textarea 
                    value={exactAddress}
                    onChange={(e) => setExactAddress(e.target.value)}
                    placeholder="Ej. 100 metros norte de la escuela, casa color verde con rejas negras."
                    required
                    rows="3"
                    style={{
                      ...inputStyle,
                      resize: "none",
                      fontFamily: "inherit"
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

            </div>
          )}

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
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(135deg, var(--primary) 0%, #108d98 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              cursor: "pointer",
              marginTop: "0.8rem",
              boxShadow: "0 4px 15px rgba(20, 177, 189, 0.3)"
            }}
          >
            {isLogin ? "Ingresar →" : "CREAR MI CASILLERO"}
          </motion.button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
            {isLogin ? "¿Aún no tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <span 
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              style={{ color: "var(--primary)", fontWeight: "600", cursor: "pointer", textDecoration: "none" }}
            >
              {isLogin ? "Regístrate gratis" : "Inicia Sesión"}
            </span>
          </p>
        </div>
      </motion.div>
      
      {/* Form styles grid responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
