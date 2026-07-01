"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LeaveOpinion() {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [stars, setStars] = useState(5);
  const [hoveredStars, setHoveredStars] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setStatus('submitting');
    try {
      await addDoc(collection(db, "testimonials"), {
        name: name.trim(),
        text: text.trim(),
        stars: stars,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setName('');
      setText('');
      setStars(5);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setStatus('error');
    }
  };

  return (
    <main style={{ 
      minHeight: "100vh", 
      background: "#050505", 
      color: "#FFFFFF", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      padding: "2rem",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(20, 177, 189, 0.08) 0%, transparent 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: "500px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <img src="/assets/Logo.png" alt="Mundo Express Logo" style={{ height: "45px", marginBottom: "2rem" }} />
          <h1 style={{ fontSize: "2rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.5px" }}>
            Compartí tu <span style={{ color: "var(--primary, #14B1BD)" }}>Experiencia</span>
          </h1>
          <p style={{ color: "var(--text-light, #A1A1AA)", marginTop: "0.5rem" }}>
            Tu opinión es muy importante para ayudarnos a seguir mejorando nuestro servicio logístico.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: "rgba(20, 177, 189, 0.02)",
                border: "1px solid rgba(20, 177, 189, 0.2)",
                borderRadius: "20px",
                padding: "3rem 2rem",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
            >
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                background: "rgba(20, 177, 189, 0.1)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                margin: "0 auto 1.5rem auto",
                color: "var(--primary, #14B1BD)"
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>¡Muchas Gracias!</h2>
              <p style={{ color: "var(--text-light, #A1A1AA)", lineHeight: 1.6, marginBottom: "2rem" }}>
                Tu comentario ha sido enviado exitosamente y ya se muestra en nuestra página web principal.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <button 
                  onClick={() => setStatus('idle')}
                  className="btn-secondary"
                  style={{ width: "100%", padding: "0.8rem", border: "none", cursor: "pointer" }}
                >
                  Dejar otro comentario
                </button>
                <a 
                  href="/"
                  className="btn-primary"
                  style={{ width: "100%", display: "block", textAlign: "center", padding: "0.8rem", textDecoration: "none" }}
                >
                  Ir al Inicio
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{
                background: "rgba(255, 255, 255, 0.01)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "20px",
                padding: "2.5rem 2rem",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
            >
              {/* Star Rating */}
              <div style={{ marginBottom: "2rem", textAlign: "center" }}>
                <label style={{ display: "block", fontSize: "0.9rem", color: "var(--text-light, #A1A1AA)", marginBottom: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Calificación
                </label>
                <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = hoveredStars !== null ? star <= hoveredStars : star <= stars;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setStars(star)}
                        onMouseEnter={() => setHoveredStars(star)}
                        onMouseLeave={() => setHoveredStars(null)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0.2rem",
                          color: isFilled ? "var(--primary, #14B1BD)" : "rgba(255, 255, 255, 0.15)",
                          transition: "color 0.2s ease, transform 0.1s ease"
                        }}
                        onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.85)"}
                        onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                      >
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name Input */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-light, #A1A1AA)", marginBottom: "0.5rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Nombre completo
                </label>
                <input 
                  type="text" 
                  placeholder="Ej: Priscilla Rojas" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                  style={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "0.9rem 1.2rem",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--primary, #14B1BD)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.08)"}
                />
              </div>

              {/* Testimonial text area */}
              <div style={{ marginBottom: "2.5rem" }}>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-light, #A1A1AA)", marginBottom: "0.5rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Comentario
                </label>
                <textarea 
                  rows="4"
                  placeholder="Contanos tu experiencia trayendo tus paquetes con nosotros..." 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                  style={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "0.9rem 1.2rem",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    outline: "none",
                    resize: "none",
                    lineHeight: "1.5",
                    transition: "all 0.3s ease",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--primary, #14B1BD)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.08)"}
                />
              </div>

              {status === 'error' && (
                <div style={{ color: "#ef4444", fontSize: "0.9rem", marginBottom: "1.5rem", textAlign: "center" }}>
                  Hubo un problema al enviar tu comentario. Por favor, intenta de nuevo.
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary"
                style={{ 
                  width: "100%", 
                  padding: "1rem", 
                  fontSize: "1.05rem", 
                  fontWeight: "700",
                  cursor: status === 'submitting' ? "not-allowed" : "pointer" 
                }}
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar Opinión'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
