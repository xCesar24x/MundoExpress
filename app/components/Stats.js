"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Stats() {
  return (
    <section className="stats-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
        
        <div style={{ textAlign: "left" }}>
          <span className="badge">CIFRAS</span>
          <h2>
            Los números que te brindan seguridad
          </h2>
          <p className="description">
            Cada paquete entregado, cliente satisfecho y kilómetro recorrido es el resultado de un engranaje perfecto diseñado para proteger tus envíos. En Mundo Express no solo movemos carga; transportamos tu tranquilidad con precisión y el respaldo tecnológico más confiable del país.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", textAlign: "left" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            style={{ gridColumn: "1 / -1" }}
          >
            <div className="stat-number-big">+40K</div>
            <div className="stat-label">Clientes activos</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.15 }}
          >
            <div className="stat-number-medium">+500K</div>
            <div className="stat-label">Paquetes entregados</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.25 }}
          >
            <div className="stat-number-medium">3-5</div>
            <div className="stat-label">Días hábiles promedio</div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
