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

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function Stats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="stats-section" ref={sectionRef}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
        
        {/* Left Side text with scroll reveal */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: "left" }}
        >
          <span className="badge" style={{ display: "inline-block", background: "rgba(20, 177, 189, 0.1)", color: "var(--primary)", border: "1px solid rgba(20, 177, 189, 0.2)", padding: "0.4rem 1rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            CIFRAS
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "1.5rem" }}>
            Los números que te brindan seguridad
          </h2>
          <p className="description" style={{ color: "var(--text-light)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Cada paquete entregado, cliente satisfecho y kilómetro recorrido es el resultado de un engranaje perfecto diseñado para proteger tus envíos. En Mundo Express no solo movemos carga; transportamos tu tranquilidad con precisión y el respaldo tecnológico más confiable del país.
          </p>
        </motion.div>

        {/* Right Side numbers with scroll count up and scale-in */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", textAlign: "left" }}>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} 
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            style={{ gridColumn: "1 / -1" }}
          >
            <div className="stat-number-big" style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)", fontWeight: 900, color: "var(--primary)", lineHeight: 1.1 }}>
              <Counter from={0} to={40} prefix="+" suffix="K" />
            </div>
            <div className="stat-label" style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "1.1rem", marginTop: "0.5rem" }}>
              Clientes activos
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} 
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
          >
            <div className="stat-number-medium" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: "var(--primary)", lineHeight: 1.1 }}>
              <Counter from={0} to={500} prefix="+" suffix="K" />
            </div>
            <div className="stat-label" style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "1.1rem", marginTop: "0.5rem" }}>
              Paquetes entregados
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} 
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          >
            <div className="stat-number-medium" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, color: "var(--primary)", lineHeight: 1.1 }}>
              <Counter from={0} to={3} />-<Counter from={0} to={5} />
            </div>
            <div className="stat-label" style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "1.1rem", marginTop: "0.5rem" }}>
              Días hábiles promedio
            </div>
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
