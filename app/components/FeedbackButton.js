"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatTeardropText, LockKey, SignOut, CheckCircle, Clock } from '@phosphor-icons/react';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('form'); // 'form' | 'login' | 'dashboard'
  
  // Form State
  const [subject, setSubject] = useState('sugerencia');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Dashboard State
  const [tickets, setTickets] = useState([]);
  const [filterTipo, setFilterTipo] = useState('Todos');
  const [isFetching, setIsFetching] = useState(false);

  // Close completely
  const closeAll = () => {
    setIsOpen(false);
    setTimeout(() => {
      setView('form');
      setIsSubmitted(false);
      setSubject('sugerencia');
      setEmail('');
      setMessage('');
      setUsername('');
      setPassword('');
      setFilterTipo('Todos');
    }, 500);
  };

  // Submit Feedback to Firebase
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      await addDoc(collection(db, "feedbacks"), {
        tipo: subject,
        email: email || "No proporcionado",
        mensaje: message,
        status: "Pendiente",
        createdAt: serverTimestamp()
      });

      setIsSubmitted(true);
      setTimeout(closeAll, 3000);
    } catch (error) {
      console.error(error);
      alert("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Admin Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "WilsonOwner" && password === "121196") {
      setView('dashboard');
      setLoginError(false);
      setUsername("");
      setPassword("");
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    }
  };

  // Handle Dashboard Realtime Fetch
  useEffect(() => {
    if (view === 'dashboard') {
      setIsFetching(true);
      const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTickets(data);
        setIsFetching(false);
      }, (error) => {
        console.error("Error fetching tickets:", error);
        setIsFetching(false);
      });
      return () => unsubscribe();
    }
  }, [view]);

  // Toggle Ticket Status
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pendiente" ? "Atendido" : "Pendiente";
    try {
      await updateDoc(doc(db, "feedbacks", id), {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredTickets = tickets.filter(t => filterTipo === 'Todos' || t.tipo === filterTipo);

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
            onClick={closeAll}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
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
                maxWidth: view === 'dashboard' ? "800px" : "420px",
                padding: "2.5rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                color: "white",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto",
                transition: "max-width 0.3s ease"
              }}
            >
              {/* Close button */}
              <button 
                onClick={closeAll}
                style={{
                  position: "absolute", top: "1.5rem", right: "1.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "none", color: "white", width: "32px", height: "32px",
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: "1rem", fontWeight: 700, transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
              >
                ✕
              </button>

              {/* Secret Admin Button (only visible in form view) */}
              {view === 'form' && !isSubmitted && (
                <button
                  onClick={() => setView('login')}
                  style={{
                    position: "absolute", top: "1.5rem", right: "4rem",
                    background: "transparent", border: "none", color: "rgba(255,255,255,0.15)",
                    cursor: "pointer", transition: "color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.15)"}
                  title="Acceso Admin"
                >
                  <LockKey size={20} />
                </button>
              )}

              {/* VIEW 1: NORMAL FORM */}
              {view === 'form' && (
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem", textTransform: "uppercase" }}>
                        Feedback / Sugerencias
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-light)", marginBottom: "1.5rem", lineHeight: "1.4" }}>
                        Tu opinión es muy importante para nosotros. Ayúdanos a mejorar Mundo Express.
                      </p>

                      <form onSubmit={handleSubmitFeedback} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: "700", opacity: 0.8, textTransform: "uppercase" }}>Tipo de mensaje</span>
                          <select 
                            value={subject} onChange={(e) => setSubject(e.target.value)}
                            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", outline: "none", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "0.9rem", cursor: "pointer" }}
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
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@correo.com"
                            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", outline: "none", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: "700", opacity: 0.8, textTransform: "uppercase" }}>Mensaje</span>
                          <textarea 
                            value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escribe aquí tus comentarios o sugerencias..." required rows={4}
                            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", outline: "none", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "0.9rem", resize: "none" }}
                          />
                        </div>
                        <motion.button 
                          type="submit" disabled={isLoading} whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}
                          style={{
                            background: isLoading ? "rgba(255,255,255,0.1)" : "var(--primary)",
                            color: isLoading ? "rgba(255,255,255,0.4)" : "white",
                            padding: "0.8rem", border: "none", borderRadius: "8px", fontWeight: "700",
                            cursor: isLoading ? "not-allowed" : "pointer", fontSize: "0.95rem", marginTop: "0.5rem"
                          }}
                        >
                          {isLoading ? "Enviando..." : "Enviar Sugerencia"}
                        </motion.button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "1rem 0" }}>
                      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
                      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" }}>¡Muchas Gracias!</h3>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-light)", lineHeight: "1.5" }}>Tu mensaje ha sido recibido con éxito. Agradecemos mucho tu tiempo para ayudarnos a mejorar.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* VIEW 2: LOGIN */}
              {view === 'login' && (
                <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <LockKey size={40} color="var(--primary)" style={{ marginBottom: "1rem" }} />
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, textTransform: "uppercase" }}>Acceso Administrativo</h3>
                  </div>
                  <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input 
                      type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario"
                      style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "0.9rem" }}
                    />
                    <input 
                      type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"
                      style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "0.9rem" }}
                    />
                    {loginError && <p style={{ color: "#ff4d4d", fontSize: "0.85rem", textAlign: "center", margin: 0 }}>Credenciales incorrectas</p>}
                    <button 
                      type="submit"
                      style={{ background: "var(--primary)", color: "white", padding: "0.8rem", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", marginTop: "0.5rem" }}
                    >Ingresar</button>
                    <button 
                      type="button" onClick={() => setView('form')}
                      style={{ background: "transparent", color: "var(--text-light)", padding: "0.5rem", border: "none", fontSize: "0.85rem", cursor: "pointer", textDecoration: "underline" }}
                    >Volver al formulario</button>
                  </form>
                </motion.div>
              )}

              {/* VIEW 3: ADMIN DASHBOARD */}
              {view === 'dashboard' && (
                <motion.div key="dashboard" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Dashboard de Feedback</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <select 
                        value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)}
                        style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.5)", color: "white", cursor: "pointer" }}
                      >
                        <option value="Todos">Todos</option>
                        <option value="sugerencia">Sugerencias</option>
                        <option value="error">Errores</option>
                        <option value="felicitacion">Felicitaciones</option>
                        <option value="otro">Otros</option>
                      </select>
                      <button 
                        onClick={() => setView('form')}
                        style={{ background: "transparent", border: "none", color: "var(--text-light)", display: "flex", alignItems: "center", gap: "0.3rem", cursor: "pointer" }}
                        title="Salir del panel"
                      >
                        <SignOut size={20} /> Salir
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {isFetching && tickets.length === 0 ? (
                      <p style={{ textAlign: "center", color: "var(--text-light)" }}>Cargando tickets...</p>
                    ) : filteredTickets.length === 0 ? (
                      <p style={{ textAlign: "center", color: "var(--text-light)", padding: "2rem 0" }}>No hay mensajes para mostrar.</p>
                    ) : (
                      filteredTickets.map(ticket => (
                        <div key={ticket.id} style={{ 
                          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", 
                          borderRadius: "12px", padding: "1.5rem", position: "relative" 
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                            <div>
                              <span style={{ 
                                display: "inline-block", background: "rgba(255,255,255,0.1)", padding: "0.3rem 0.6rem", 
                                borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.5rem" 
                              }}>
                                {ticket.tipo}
                              </span>
                              <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>{ticket.email}</div>
                              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                                {ticket.createdAt?.seconds ? new Date(ticket.createdAt.seconds * 1000).toLocaleDateString() : 'Reciente'}
                              </div>
                            </div>
                            
                            <button
                              onClick={() => toggleStatus(ticket.id, ticket.status)}
                              style={{
                                background: ticket.status === "Atendido" ? "rgba(45, 198, 83, 0.15)" : "rgba(255, 133, 0, 0.15)",
                                border: `1px solid ${ticket.status === "Atendido" ? "rgba(45, 198, 83, 0.3)" : "rgba(255, 133, 0, 0.3)"}`,
                                color: ticket.status === "Atendido" ? "#2DC653" : "#FF8500",
                                padding: "0.5rem 1rem", borderRadius: "50px", fontSize: "0.8rem", fontWeight: 700,
                                display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", transition: "all 0.2s"
                              }}
                            >
                              {ticket.status === "Atendido" ? <CheckCircle size={16} weight="fill" /> : <Clock size={16} weight="fill" />}
                              {ticket.status}
                            </button>
                          </div>
                          
                          <div style={{ 
                            background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px", 
                            fontSize: "0.95rem", lineHeight: "1.5", color: "rgba(255,255,255,0.9)", whiteSpace: "pre-wrap"
                          }}>
                            {ticket.mensaje}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
