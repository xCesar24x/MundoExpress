"use client";
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Regístrate',
    desc: 'Afíliate gratis y obtén tus direcciones de casilleros internacionales al instante.',
    img: '/assets/registrate.PNG'
  },
  {
    number: '02',
    title: 'Compra globalmente',
    desc: 'Comprá en cualquier tienda u app online del mundo.',
    img: '/assets/compra en linea.PNG'
  },
  {
    number: '03',
    title: 'Envío a CR',
    desc: 'Recibimos tu compra en nuestra bodega de Miami, China y Colombia y la enviamos a Costa Rica.',
    img: '/assets/envios a cr.PNG'
  },
  {
    number: '04',
    title: 'Entrega',
    desc: 'Recibí tu paquete en la puerta de tu casa.',
    img: '/assets/entrega.PNG'
  }
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "8rem 2rem", background: "var(--bg-dark)", color: "white" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <h2 style={{ fontSize: "3.5rem", fontWeight: 800, textTransform: "uppercase" }}>¿Cómo Funciona?</h2>
          <p style={{ color: "var(--text-light)", fontSize: "1.1rem", marginTop: "1rem" }}>En solo 4 pasos, tus compras internacionales llegan a tu puerta en Costa Rica.</p>
        </div>

        <div className="steps-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
          gap: "2.5rem" 
        }}>
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.12 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02, 
                borderColor: "rgba(20, 177, 189, 0.25)", 
                boxShadow: "0 15px 35px rgba(20, 177, 189, 0.05)" 
              }}
              style={{
                background: "var(--secondary-light)",
                borderRadius: "24px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                border: "1px solid rgba(255,255,255,0.03)",
                boxShadow: "var(--shadow-md)",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease"
              }}
            >
              {/* Square image with rounded corners */}
              <div style={{ 
                width: "100%", 
                aspectRatio: "1/1", 
                borderRadius: "16px", 
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.05)"
              }}>
                <img 
                  src={step.img} 
                  alt={step.title} 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover" 
                  }} 
                />
              </div>

              {/* Bottom part with orange number and text content */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ 
                  fontSize: "3.5rem", 
                  fontWeight: 900, 
                  color: "var(--primary)", 
                  lineHeight: "1.1",
                  fontFamily: "inherit"
                }}>
                  {step.number}
                </div>
                <div style={{ paddingTop: "0.2rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "white" }}>{step.title}</h3>
                  <p style={{ color: "var(--text-light)", fontSize: "0.9rem", lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          <a href="https://www.mundoexpresscr.com" className="btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}>Regístrate Gratis</a>
        </div>
      </div>
    </section>
  );
}
