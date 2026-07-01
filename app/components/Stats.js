"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ from, to, duration = 1.5, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    let animationFrameId;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Quadratic ease out
      const easedProgress = progress * (2 - progress);
      const current = Math.floor(from + easedProgress * (to - from));
      
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-grid-outer" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
        
        <div style={{ textAlign: "left" }}>
          <span className="badge">CIFRAS</span>
          <h2>
            Los números que te brindan seguridad
          </h2>
          <p className="description">
            Cada paquete entregado, cliente satisfecho y kilómetro recorrido es el resultado de un engranaje perfecto diseñado para proteger tus envíos. En Mundo Express no solo movemos carga; transportamos tu tranquilidad con precisión y el respaldo tecnológico más confiable del país.
          </p>
        </div>

        <div className="stats-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", textAlign: "left" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            style={{ gridColumn: "1 / -1" }}
          >
            <div className="stat-number-big">
              <Counter from={0} to={1000} prefix="+" />
            </div>
            <div className="stat-label">Clientes activos</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.15 }}
          >
            <div className="stat-number-medium">
              <Counter from={0} to={13600} prefix="+" />
            </div>
            <div className="stat-label">Paquetes entregados</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.25 }}
          >
            <div className="stat-number-medium">
              <Counter from={0} to={5} />-<Counter from={0} to={7} />
            </div>
            <div className="stat-label">Días hábiles promedio</div>
          </motion.div>
        </div>

      </div>

      <div className="stats-slogan">
        <p className="stats-slogan-text">
          "Más que un envío, una solución confiable"
        </p>
      </div>
    </section>
  );
}
