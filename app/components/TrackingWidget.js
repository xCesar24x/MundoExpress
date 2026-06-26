"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TrackingWidget() {
  const [activeTab, setActiveTab] = useState('rastrea');

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
          onClick={() => setActiveTab('rastrea')}
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
          onClick={() => setActiveTab('calcula')}
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
      
      <div className="tab-content" style={{ padding: "2rem" }}>
        {activeTab === 'rastrea' && (
          <div>
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
            <p style={{ marginTop: "1.2rem", fontSize: "0.8rem", opacity: 0.8, lineHeight: "1.4" }}>
              Recuerda que este rastreo es únicamente para los paquetes que ya han sido recibidos en Miami.
            </p>
          </div>
        )}
        {activeTab === 'calcula' && (
          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: 800 }}>CALCULA TU ENVÍO</h3>
            <p style={{ marginBottom: "1.5rem", fontSize: "0.9rem", opacity: 0.9, lineHeight: "1.5" }}>
              Calcula el costo aproximado de traer tu paquete a Costa Rica.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: "700", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Peso del paquete</span>
                <input 
                  type="number" 
                  placeholder="Libras" 
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
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: "700", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Valor de la compra</span>
                <input 
                  type="number" 
                  placeholder="$ USD (Valor FOB)" 
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
              <motion.button 
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
          </div>
        )}
      </div>
    </motion.div>
  );
}
