"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockOrders } from '../../lib/mockOrders';

export default function TrackingWidget() {
  const [activeTab, setActiveTab] = useState('rastrea');

  // Tracking State
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null); // null, { error: true }, or order data

  // Calculation State
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kilos"); // 'kilos' or 'libras'
  const [calcResult, setCalcResult] = useState(null);

  const handleTrack = () => {
    if (!trackingId.trim()) return;
    const order = mockOrders.find(o => o.id.toUpperCase() === trackingId.toUpperCase().trim());
    if (order) {
      setTrackingResult(order);
    } else {
      setTrackingResult({ error: true });
    }
  };

  const handleCalculate = () => {
    const w = parseFloat(weight);
    if (!isNaN(w) && w > 0) {
      // Tarifa todo incluido: 6480 por kilo
      let total;
      if (unit === 'kilos') {
        total = w * 6480;
      } else {
        // unit is libras. Convert libras to kilos.
        // 1 kilo = 2.20462 libras
        total = (w / 2.20462) * 6480;
      }
      setCalcResult(Math.round(total));
    } else {
      setCalcResult(null);
    }
  };

  return (
    <motion.div 
      className="tracking-widget"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      style={{
        background: "var(--primary)",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        maxWidth: "500px",
        width: "100%",
        color: "var(--bg-dark)",
        position: "relative"
      }}
    >
      <div 
        className="tabs-container" 
        style={{ 
          padding: "5px", 
          background: "rgba(0, 0, 0, 0.12)", 
          borderRadius: "14px", 
          margin: "1.5rem 1.5rem 0.5rem 1.5rem",
          display: "flex",
          position: "relative"
        }}
      >
        <motion.div 
          style={{
            position: "absolute",
            top: "5px",
            left: activeTab === 'rastrea' ? "5px" : "calc(50% + 2px)",
            width: "calc(50% - 7px)",
            height: "calc(100% - 10px)",
            background: "var(--bg-dark)",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 1
          }}
          layout
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
        
        <button 
          onClick={() => { setActiveTab('rastrea'); setTrackingResult(null); }}
          style={{
            flex: 1,
            padding: "0.8rem",
            fontSize: "0.95rem",
            fontWeight: "700",
            border: "none",
            cursor: "pointer",
            borderRadius: "10px",
            background: "transparent",
            color: activeTab === 'rastrea' ? "white" : "rgba(0,0,0,0.55)",
            zIndex: 2,
            transition: "color 0.2s ease"
          }}
        >
          Rastrea
        </button>
        <button 
          onClick={() => { setActiveTab('calcula'); setCalcResult(null); }}
          style={{
            flex: 1,
            padding: "0.8rem",
            fontSize: "0.95rem",
            fontWeight: "700",
            border: "none",
            cursor: "pointer",
            borderRadius: "10px",
            background: "transparent",
            color: activeTab === 'calcula' ? "white" : "rgba(0,0,0,0.55)",
            zIndex: 2,
            transition: "color 0.2s ease"
          }}
        >
          Calcula
        </button>
      </div>
      
      <div className="tab-content" style={{ padding: "2rem", minHeight: "300px" }}>
        {activeTab === 'rastrea' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: 800 }}>RASTREA TU COMPRA</h3>
            <p style={{ marginBottom: "1.5rem", fontSize: "0.9rem", opacity: 0.9, lineHeight: "1.5" }}>
              Digita tu ID de rastreo (este número te lo brinda la tienda donde realizaste la compra)
            </p>
            <div style={{ 
              display: "flex", 
              alignItems: "center",
              background: "white", 
              borderRadius: "12px", 
              padding: "4px",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.08)",
              marginTop: "1.5rem"
            }}>
              <input 
                type="text" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') handleTrack() }}
                placeholder="Ej: TBA329462486956" 
                style={{ 
                  flex: 1, 
                  padding: "0.8rem 1rem", 
                  border: "none", 
                  outline: "none", 
                  fontSize: "1rem",
                  background: "transparent",
                  color: "var(--bg-dark)",
                  fontWeight: "500"
                }} 
              />
              <motion.button 
                onClick={handleTrack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: "var(--bg-dark)", 
                  color: "white", 
                  padding: "0.8rem 1.8rem",
                  border: "none", 
                  borderRadius: "8px", 
                  fontWeight: "700", 
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  fontSize: "0.95rem"
                }}
              >
                Buscar
              </motion.button>
            </div>
            
            <AnimatePresence>
              {trackingResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  style={{ marginTop: "1.5rem", background: "white", borderRadius: "12px", padding: "1.2rem", color: "var(--bg-dark)" }}
                >
                  {trackingResult.error ? (
                    <div style={{ textAlign: "center", color: "#e11d48", fontWeight: "600" }}>
                      ID no encontrado. Verifica tu número de guía.
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.85rem", opacity: 0.6, fontWeight: 700 }}>ESTADO ACTUAL</span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)", background: "rgba(20,177,189,0.1)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                          {trackingResult.status}
                        </span>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.2rem" }}>
                        {trackingResult.content}
                      </div>
                      <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                        A nombre de: <strong>{trackingResult.client}</strong>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            <p style={{ marginTop: "1.2rem", fontSize: "0.8rem", opacity: 0.8, lineHeight: "1.4" }}>
              Recuerda que este rastreo es únicamente para los paquetes que ya han sido recibidos en Miami.
            </p>
          </motion.div>
        )}
        {activeTab === 'calcula' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: 800 }}>CALCULA TU ENVÍO</h3>
            <p style={{ marginBottom: "1.5rem", fontSize: "0.9rem", opacity: 0.9, lineHeight: "1.5" }}>
              Calcula el costo aproximado de traer tu paquete a Costa Rica.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: "700", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Peso del paquete</span>
                  
                  {/* Unit Selector Toggle */}
                  <div style={{ display: "flex", background: "rgba(0, 0, 0, 0.08)", padding: "2px", borderRadius: "8px" }}>
                    <button 
                      type="button"
                      onClick={() => { setUnit('kilos'); setCalcResult(null); }}
                      style={{
                        padding: "0.3rem 0.7rem",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        border: "none",
                        background: unit === 'kilos' ? "var(--bg-dark)" : "transparent",
                        color: unit === 'kilos' ? "white" : "rgba(0,0,0,0.6)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Kilos (kg)
                    </button>
                    <button 
                      type="button"
                      onClick={() => { setUnit('libras'); setCalcResult(null); }}
                      style={{
                        padding: "0.3rem 0.7rem",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        border: "none",
                        background: unit === 'libras' ? "var(--bg-dark)" : "transparent",
                        color: unit === 'libras' ? "white" : "rgba(0,0,0,0.6)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Libras (lb)
                    </button>
                  </div>
                </div>
                
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === 'kilos' ? "Kilos" : "Libras"} 
                  style={{ 
                    padding: "1rem", 
                    borderRadius: "10px", 
                    border: "1px solid rgba(0,0,0,0.08)", 
                    outline: "none",
                    background: "white",
                    color: "var(--bg-dark)",
                    fontSize: "1rem",
                    fontWeight: "500"
                  }} 
                />
              </div>
              
              {calcResult !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ background: "white", borderRadius: "10px", padding: "1.5rem", textAlign: "center", color: "var(--bg-dark)", border: "2px solid var(--orange)" }}
                >
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, opacity: 0.6, marginBottom: "0.5rem" }}>COSTO APROXIMADO</div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--orange)" }}>
                    ₡{calcResult.toLocaleString()}
                  </div>
                </motion.div>
              )}

              <motion.button 
                onClick={handleCalculate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: "var(--bg-dark)", 
                  color: "white", 
                  padding: "1rem",
                  border: "none", 
                  borderRadius: "10px", 
                  fontWeight: "700", 
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  fontSize: "1rem",
                  marginTop: "0.5rem"
                }}
              >
                Calcular Tarifa
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
