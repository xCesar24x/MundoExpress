"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatTeardropText } from '@phosphor-icons/react';

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState('sugerencia');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      // Reemplaza 'FORM_ID' con tu ID de formulario de Formspree (ej. 'xoqgkyap')
      // configurado para enviar correos a info@mundoexpresscr.com.
      // Regístrate gratis en https://formspree.io para obtenerlo.
      const formId = "mnjkzoke"; 
      
      if (formId === "FORM_ID") {
        // Simulación en local si aún no se ha configurado el ID real
        console.log("Simulación de envío a info@mundoexpresscr.com:", { subject, email, message });
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simular retraso de red
        setIsSubmitted(true);
      } else {
        const response = await fetch(`https://formspree.io/f/${formId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            tipo: subject,
            email: email || "No proporcionado",
            mensaje: message
          })
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          alert("Hubo un problema al enviar tu sugerencia. Por favor intenta de nuevo.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
      
      // Auto close and reset
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setSubject('sugerencia');
        setEmail('');
        setMessage('');
      }, 2500);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button 
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 133, 25, 0.35)" }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          background: "var(--orange)",
          color: "white",
          border: "none",
          borderRadius: "50px",
          padding: "0.8rem 1.3rem",
          fontWeight: "700",
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 6px 20px rgba(255, 133, 25, 0.25)",
        }}
      >
        <ChatTeardropText size={20} weight="bold" />
        <span>Sugerencias</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
              padding: "1rem"
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "rgba(12, 12, 12, 0.98)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                width: "100%",
                maxWidth: "420px",
                padding: "2.5rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                color: "white",
                position: "relative"
              }}
            >
              {/* Close button */}
              <button 
                onClick={() => setIsOpen(false)}
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "none",
                  color: "white",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: 700,
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
              >
                ✕
              </button>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem", textTransform: "uppercase" }}>
                      Feedback / Sugerencias
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-light)", marginBottom: "1.5rem", lineHeight: "1.4" }}>
                      Tu opinión es muy importante para nosotros. Ayúdanos a mejorar Mundo Express.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: "700", opacity: 0.8, textTransform: "uppercase" }}>Tipo de mensaje</span>
                        <select 
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          style={{
                            padding: "0.8rem",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            outline: "none",
                            background: "rgba(255,255,255,0.05)",
                            color: "white",
                            fontSize: "0.9rem",
                            fontWeight: "500",
                            cursor: "pointer"
                          }}
                        >
                          <option value="sugerencia" style={{ background: "#0c0c0c" }}>💡 Sugerencia</option>
                          <option value="error" style={{ background: "#0c0c0c" }}>⚠️ Reportar un error</option>
                          <option value="felicitacion" style={{ background: "#0c0c0c" }}>🎉 Felicitación</option>
                          <option value="otro" style={{ background: "#0c0c0c" }}>💬 Otro asunto</option>
                        </select>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: "700", opacity: 0.8, textTransform: "uppercase" }}>Tu correo (opcional)</span>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ejemplo@correo.com"
                          style={{
                            padding: "0.8rem",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            outline: "none",
                            background: "rgba(255,255,255,0.05)",
                            color: "white",
                            fontSize: "0.9rem"
                          }}
                        />
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: "700", opacity: 0.8, textTransform: "uppercase" }}>Mensaje</span>
                        <textarea 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Escribe aquí tus comentarios o sugerencias..."
                          required
                          rows={4}
                          style={{
                            padding: "0.8rem",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            outline: "none",
                            background: "rgba(255,255,255,0.05)",
                            color: "white",
                            fontSize: "0.9rem",
                            resize: "none",
                            lineHeight: "1.4"
                          }}
                        />
                      </div>

                      <motion.button 
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        style={{
                          background: isLoading ? "rgba(255,255,255,0.1)" : "var(--primary)",
                          color: isLoading ? "rgba(255,255,255,0.4)" : "white",
                          padding: "0.8rem",
                          border: "none",
                          borderRadius: "8px",
                          fontWeight: "700",
                          cursor: isLoading ? "not-allowed" : "pointer",
                          fontSize: "0.95rem",
                          marginTop: "0.5rem",
                          boxShadow: isLoading ? "none" : "0 4px 10px rgba(0,0,0,0.15)"
                        }}
                      >
                        {isLoading ? "Enviando..." : "Enviar Sugerencia"}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: "center", padding: "1rem 0" }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                      ¡Muchas Gracias!
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-light)", lineHeight: "1.5" }}>
                      Tu mensaje ha sido recibido con éxito. Agradecemos mucho tu tiempo para ayudarnos a mejorar.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
