"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockOrders } from '../../../lib/mockOrders';
import Link from 'next/link';

export default function AdminDashboard() {
  const [expandedId, setExpandedId] = useState(null);
  
  // Basic stats
  const totalOrders = mockOrders.length;
  const inTransit = mockOrders.filter(o => o.status === "En Tránsito a CR").length;
  const inCustoms = mockOrders.filter(o => o.status === "En Aduanas").length;
  const readyToDeliver = mockOrders.filter(o => o.status === "Listo para Entrega").length;

  const getStatusColor = (status) => {
    switch(status) {
      case "Comprado": return "#3b82f6"; // Blue
      case "Recibido en Miami": return "#8b5cf6"; // Purple
      case "En Tránsito a CR": return "#f59e0b"; // Yellow/Orange
      case "En Aduanas": return "#ef4444"; // Red
      case "Listo para Entrega": return "#10b981"; // Green
      case "Entregado": return "#6b7280"; // Gray
      default: return "#14B1BD"; // Teal
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-dark)", padding: "2rem", color: "white" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, margin: 0, letterSpacing: "-1px" }}>Dashboard Logístico</h1>
            <p style={{ color: "var(--text-light)", marginTop: "0.5rem" }}>Bienvenido, Wilson. Vista general de las operaciones.</p>
          </div>
          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                padding: "0.8rem 1.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Volver al Inicio
            </motion.button>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
          {[
            { title: "Total Paquetes Activos", value: totalOrders, color: "var(--primary)" },
            { title: "En Tránsito a CR", value: inTransit, color: "#f59e0b" },
            { title: "En Aduanas (CR)", value: inCustoms, color: "#ef4444" },
            { title: "Listos para Entrega", value: readyToDeliver, color: "#10b981" }
          ].map((metric, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                padding: "1.5rem",
                borderLeft: `4px solid ${metric.color}`
              }}
            >
              <h3 style={{ fontSize: "0.9rem", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>
                {metric.title}
              </h3>
              <div style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>{metric.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Orders Table */}
        <div style={{ 
          background: "rgba(255, 255, 255, 0.02)", 
          border: "1px solid rgba(255, 255, 255, 0.05)", 
          borderRadius: "16px", 
          overflow: "hidden" 
        }}>
          <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Rastreo de Paquetes en Tiempo Real</h2>
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.2)", color: "var(--text-light)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  <th style={{ padding: "1.5rem 1rem", fontWeight: 600 }}>Tracking ID</th>
                  <th style={{ padding: "1.5rem 1rem", fontWeight: 600 }}>Cliente</th>
                  <th style={{ padding: "1.5rem 1rem", fontWeight: 600 }}>Contenido / Origen</th>
                  <th style={{ padding: "1.5rem 1rem", fontWeight: 600 }}>Peso / Valor</th>
                  <th style={{ padding: "1.5rem 1rem", fontWeight: 600 }}>Estado Actual</th>
                  <th style={{ padding: "1.5rem 1rem", fontWeight: 600, textAlign: "right" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr 
                      style={{ 
                        borderBottom: "1px solid rgba(255,255,255,0.03)", 
                        background: expandedId === order.id ? "rgba(255,255,255,0.02)" : "transparent",
                        transition: "background 0.2s"
                      }}
                    >
                      <td style={{ padding: "1.5rem 1rem", fontWeight: 600, color: "var(--primary)" }}>{order.id}</td>
                      <td style={{ padding: "1.5rem 1rem" }}>{order.client}</td>
                      <td style={{ padding: "1.5rem 1rem" }}>
                        <div style={{ fontWeight: 600 }}>{order.content}</div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>{order.origin}</div>
                      </td>
                      <td style={{ padding: "1.5rem 1rem" }}>
                        <div style={{ fontWeight: 600 }}>{order.weight}</div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>${order.price.toLocaleString()}</div>
                      </td>
                      <td style={{ padding: "1.5rem 1rem" }}>
                        <span style={{ 
                          background: `${getStatusColor(order.status)}20`, 
                          color: getStatusColor(order.status), 
                          padding: "0.4rem 0.8rem", 
                          borderRadius: "50px", 
                          fontSize: "0.85rem", 
                          fontWeight: 700 
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: "1.5rem 1rem", textAlign: "right" }}>
                        <button 
                          onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                          style={{
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                          onMouseLeave={(e) => e.target.style.background = "transparent"}
                        >
                          {expandedId === order.id ? "Ocultar" : "Detalles"}
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expanded Timeline Row */}
                    <AnimatePresence>
                      {expandedId === order.id && (
                        <tr>
                          <td colSpan="6" style={{ padding: 0 }}>
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              style={{ overflow: "hidden", background: "rgba(0,0,0,0.3)" }}
                            >
                              <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <h4 style={{ margin: 0, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-light)" }}>Línea de Tiempo del Paquete</h4>
                                
                                <div style={{ position: "relative", paddingLeft: "1.5rem", borderLeft: "2px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1rem" }}>
                                  {order.timeline.map((event, i) => (
                                    <div key={i} style={{ position: "relative" }}>
                                      <div style={{ 
                                        position: "absolute", 
                                        left: "-1.5rem", 
                                        transform: "translateX(-50%)", 
                                        width: "12px", 
                                        height: "12px", 
                                        borderRadius: "50%", 
                                        background: i === order.timeline.length - 1 ? "var(--primary)" : "rgba(255,255,255,0.2)",
                                        border: "2px solid var(--bg-dark)"
                                      }} />
                                      <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 700, marginBottom: "0.2rem" }}>{event.date}</div>
                                      <div style={{ fontSize: "0.95rem" }}>{event.action}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
