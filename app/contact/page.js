"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Envelope, Phone, MapPin, PaperPlane, WhatsappLogo } from '@phosphor-icons/react';

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsLoading(true);
    try {
      // Usamos tu ID de Formspree 'mnjkzoke' para recibir los mensajes
      const formId = "mnjkzoke"; 
      
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `Contacto Web: Mensaje de ${name}`,
          nombre: name,
          email: email,
          mensaje: message
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ background: "var(--bg-dark)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      
      <main style={{ flex: 1 }}>
        {/* Contact Hero */}
        <section className="contact-hero" style={{ padding: "10rem 2rem 4rem 2rem", textAlign: "center", position: "relative" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span style={{ color: "var(--primary)", border: "1px solid var(--primary)", padding: "0.5rem 1.5rem", borderRadius: "50px", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "2px" }}>
              CONTACTO
            </span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, textTransform: "uppercase", marginTop: "1.5rem", color: "var(--text-main)", letterSpacing: "-1px" }}>
              ¿CÓMO PODEMOS AYUDARTE?
            </h1>
            <p style={{ marginTop: "1.5rem", color: "var(--text-light)", fontSize: "1.2rem", lineHeight: 1.6 }}>
              Póngase en contacto con nuestro equipo de expertos logísticos. Estamos listos para brindarle soporte inmediato.
            </p>
          </div>
        </section>

        {/* Contact Content Container */}
        <section className="contact-content" style={{ padding: "2rem 2rem 8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "start" }}>
            
            {/* Info Section (Left Side) */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "white" }}>DATOS DE CONTACTO</h2>
              <p style={{ color: "var(--text-light)", lineHeight: 1.7 }}>
                Escríbanos o llámenos para consultas comerciales, cotizaciones de carga pesada o soporte sobre sus envíos.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <div style={{ background: "rgba(20, 177, 189, 0.1)", color: "var(--primary)", padding: "1rem", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin size={24} weight="duotone" />
                  </div>
                  <div>
                    <h4 style={{ color: "white", fontSize: "1.1rem", fontWeight: 700 }}>Dirección Central</h4>
                    <p style={{ color: "var(--text-light)", fontSize: "0.95rem", marginTop: "0.2rem" }}>San José, Costa Rica</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <a 
                    href="https://wa.me/50670511239" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      background: "rgba(37, 211, 102, 0.1)", 
                      color: "#25D366", 
                      padding: "1rem", 
                      borderRadius: "16px", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      transition: "transform 0.2s ease, background 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.background = "rgba(37, 211, 102, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.background = "rgba(37, 211, 102, 0.1)";
                    }}
                    title="Chat en WhatsApp"
                  >
                    <WhatsappLogo size={24} weight="duotone" />
                  </a>
                  <div>
                    <h4 style={{ color: "white", fontSize: "1.1rem", fontWeight: 700 }}>WhatsApp de Soporte</h4>
                    <p style={{ fontSize: "0.95rem", marginTop: "0.2rem" }}>
                      <a 
                        href="https://wa.me/50670511239" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: "var(--text-light)", textDecoration: "none", transition: "color 0.2s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#25D366"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}
                      >
                        +506 7051-1239
                      </a>
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <div style={{ background: "rgba(20, 177, 189, 0.1)", color: "var(--primary)", padding: "1rem", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Envelope size={24} weight="duotone" />
                  </div>
                  <div>
                    <h4 style={{ color: "white", fontSize: "1.1rem", fontWeight: 700 }}>Correo Electrónico</h4>
                    <p style={{ color: "var(--text-light)", fontSize: "0.95rem", marginTop: "0.2rem" }}>
                      <a 
                        href="mailto:info@mundoexpresscr.com"
                        style={{ color: "var(--text-light)", textDecoration: "none", transition: "color 0.2s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}
                      >
                        info@mundoexpresscr.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Section (Right Side) */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                background: "rgba(255, 255, 255, 0.03)", 
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: "24px", 
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "3rem",
                boxShadow: "var(--shadow-lg)"
              }}
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem", color: "white" }}>ENVÍENOS UN MENSAJE</h2>
                    <p style={{ color: "var(--text-light)", fontSize: "0.95rem", marginBottom: "2rem" }}>Complete el formulario y le responderemos en menos de 24 horas.</p>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                      <input 
                        type="text" 
                        required
                        placeholder="Nombre completo" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ 
                          padding: "1rem", 
                          background: "rgba(255, 255, 255, 0.05)", 
                          border: "1px solid rgba(255, 255, 255, 0.1)", 
                          borderRadius: "12px",
                          color: "white",
                          outline: "none",
                          fontSize: "1rem",
                          transition: "all 0.3s ease"
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--primary)";
                          e.target.style.background = "rgba(255, 255, 255, 0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                          e.target.style.background = "rgba(255, 255, 255, 0.05)";
                        }}
                      />
                      
                      <input 
                        type="email" 
                        required
                        placeholder="Correo electrónico" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ 
                          padding: "1rem", 
                          background: "rgba(255, 255, 255, 0.05)", 
                          border: "1px solid rgba(255, 255, 255, 0.1)", 
                          borderRadius: "12px",
                          color: "white",
                          outline: "none",
                          fontSize: "1rem",
                          transition: "all 0.3s ease"
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--primary)";
                          e.target.style.background = "rgba(255, 255, 255, 0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                          e.target.style.background = "rgba(255, 255, 255, 0.05)";
                        }}
                      />
                      
                      <textarea 
                        required
                        placeholder="¿En qué podemos ayudarte?" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="5" 
                        style={{ 
                          padding: "1rem", 
                          background: "rgba(255, 255, 255, 0.05)", 
                          border: "1px solid rgba(255, 255, 255, 0.1)", 
                          borderRadius: "12px",
                          color: "white",
                          outline: "none",
                          fontSize: "1rem",
                          resize: "none",
                          fontFamily: "inherit",
                          transition: "all 0.3s ease"
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--primary)";
                          e.target.style.background = "rgba(255, 255, 255, 0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                          e.target.style.background = "rgba(255, 255, 255, 0.05)";
                        }}
                      ></textarea>

                      <motion.button 
                        type="submit" 
                        disabled={isLoading}
                        className="btn-primary" 
                        style={{ 
                          border: "none", 
                          cursor: isLoading ? "not-allowed" : "pointer", 
                          padding: "1rem", 
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.8rem",
                          fontSize: "1.05rem",
                          opacity: isLoading ? 0.7 : 1
                        }}
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      >
                        <PaperPlane size={18} weight="fill" />
                        {isLoading ? "Enviando..." : "Enviar Mensaje"}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: "center", padding: "2rem 0" }}
                  >
                    <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✉️</div>
                    <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.8rem", color: "white" }}>
                      ¡MENSAJE ENVIADO!
                    </h3>
                    <p style={{ color: "var(--text-light)", fontSize: "1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
                      Gracias por ponerte en contacto. Tu mensaje ha sido recibido con éxito y te responderemos en menos de 24 horas.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "white",
                        padding: "0.8rem 1.5rem",
                        borderRadius: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--primary)";
                        e.currentTarget.style.background = "rgba(20, 177, 189, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      }}
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
