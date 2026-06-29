"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Handshake, Briefcase } from '@phosphor-icons/react';

const plans = [
  {
    id: '01',
    title: 'DIRECCIÓN PERSONAL INTERNACIONAL',
    desc: 'Recibí una dirección en Miami, Colombia o China exclusiva para vos. Comprá en cualquier tienda online y nosotros nos encargamos de traerlo hasta tu puerta.',
    features: ['Dirección personal en 3 localidades', 'Consolidación gratuita', 'Entrega a domicilio'],
    icon: Package,
    img: '/assets/01. DIRECCIÓN PERSONAL EN MIAMI.PNG'
  },
  {
    id: '02',
    title: 'COMPRA ASISTIDA',
    desc: '¿No tienes tarjeta internacional o se te complica comprar? Envíanos el link de lo que deseas y nosotros lo compramos y traemos por ti.',
    features: ['Cotización en minutos', 'Sin necesidad de tarjeta de crédito', 'Garantía de entrega', 'Asesoría personalizada'],
    icon: Handshake,
    img: '/assets/02. COMPRA ASISTIDA.PNG'
  },
  {
    id: '03',
    title: 'MUNDO BUSINESS',
    desc: 'Soluciones logísticas completas para importadores, pymes y grandes empresas. Tarifas especiales por volumen y carga consolidada.',
    features: ['Agenciamiento aduanal', 'Flete aéreo y marítimo', 'Bodegaje', 'Atención ejecutiva'],
    icon: Briefcase,
    img: '/assets/03. MUNDO BUSINESS.PNG'
  }
];

export default function ServiceAccordion() {
  const [activeId, setActiveId] = useState('01');

  const activePlan = plans.find(p => p.id === activeId);
  const ActiveIcon = activePlan.icon;

  return (
    <section style={{ padding: "8rem 2rem", background: "var(--bg-dark)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ color: "var(--primary)", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.9rem", border: "1px solid var(--primary)", padding: "0.5rem 1.5rem", borderRadius: "50px" }}>NUESTRO PORTAFOLIO</span>
          <h2 style={{ fontSize: "3rem", fontWeight: 800, textTransform: "uppercase", marginTop: "2rem" }}>UN PLAN PARA CADA <span style={{ color: "var(--primary)" }}>NECESIDAD</span></h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          
          {/* Accordion Left Side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {plans.map((plan) => (
              <div 
                key={plan.id}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}
              >
                <button 
                  onClick={() => setActiveId(plan.id)}
                  style={{ 
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "none", border: "none", color: activeId === plan.id ? "var(--primary)" : "var(--text-light)",
                    fontSize: "1.5rem", fontWeight: 800, cursor: "pointer", textAlign: "left", padding: "1rem 0"
                  }}
                >
                  {plan.id}. {plan.title}
                  <span style={{ 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "40px", height: "40px", borderRadius: "50%", 
                    background: activeId === plan.id ? "var(--primary)" : "transparent",
                    color: activeId === plan.id ? "var(--bg-dark)" : "var(--text-light)",
                    border: activeId === plan.id ? "none" : "1px solid rgba(255,255,255,0.2)"
                  }}>
                    {activeId === plan.id ? '-' : '+'}
                  </span>
                </button>

                <AnimatePresence>
                  {activeId === plan.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{ color: "var(--text-main)", marginBottom: "1.5rem", lineHeight: 1.6 }}>{plan.desc}</p>
                      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
                        {plan.features.map((feat, i) => (
                          <li key={i} style={{ color: "var(--text-light)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ color: "var(--primary)" }}>●</span> {feat}
                          </li>
                        ))}
                      </ul>
                      <a href="#" className="btn-primary" style={{ padding: "0.8rem 2rem" }}>Seleccionar Plan</a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Image Right Side (Dynamic service image) */}
          <div style={{ 
            position: "relative", 
            width: "100%", 
            height: "100%", 
            minHeight: "500px", 
            background: "var(--secondary-light)", 
            borderRadius: "20px", 
            overflow: "hidden", 
            border: "1px solid rgba(255, 255, 255, 0.05)"
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  width: "100%", 
                  height: "100%" 
                }}
              >
                <img 
                  src={activePlan.img} 
                  alt={activePlan.title} 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover" 
                  }} 
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
