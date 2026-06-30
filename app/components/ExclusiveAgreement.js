"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from '@phosphor-icons/react';

export default function ExclusiveAgreement() {
  return (
    <section style={{ 
      padding: "3rem 1rem", 
      background: "var(--bg-dark)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {/* Background glow for luxury feel */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60vw",
        height: "20vw",
        background: "radial-gradient(ellipse, rgba(212, 175, 55, 0.15) 0%, rgba(0,0,0,0) 70%)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        style={{
          width: "100%",
          maxWidth: "1000px",
          position: "relative",
          borderRadius: "24px",
          padding: "1px", // For gradient border
          background: "linear-gradient(135deg, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0.2) 30%, rgba(0,0,0,0) 50%, rgba(212,175,55,0.2) 70%, rgba(212,175,55,0.8) 100%)",
          boxShadow: "0 20px 50px -10px rgba(0,0,0,0.8), 0 0 30px rgba(212, 175, 55, 0.15)"
        }}
      >
        {/* Shimmer animation on border */}
        <motion.div 
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            backgroundSize: "200% 100%",
            zIndex: 0,
            opacity: 0.5
          }}
        />

        <div style={{
          background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
          borderRadius: "23px",
          padding: "3rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          overflow: "hidden"
        }}>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}
          >
            <Star weight="fill" color="#D4AF37" size={24} style={{ filter: "drop-shadow(0 0 10px rgba(212,175,55,0.8))" }} />
            <h4 style={{ 
              color: "#D4AF37", 
              textTransform: "uppercase", 
              letterSpacing: "4px",
              fontSize: "0.9rem",
              fontWeight: 700,
              margin: 0
            }}>
              Convenio Exclusivo
            </h4>
            <Star weight="fill" color="#D4AF37" size={24} style={{ filter: "drop-shadow(0 0 10px rgba(212,175,55,0.8))" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ 
              background: "white", 
              padding: "1.5rem 3rem", 
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.05)",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid rgba(212,175,55,0.3)"
            }}
          >
            <img 
              src="/assets/exclusivo.png.jpeg" 
              alt="Amerijet Exclusive Agreement" 
              style={{
                height: "80px",
                objectFit: "contain",
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            style={{
              color: "rgba(255,255,255,0.8)",
              textAlign: "center",
              maxWidth: "600px",
              fontSize: "1.05rem",
              lineHeight: "1.6",
              margin: 0,
              fontWeight: 300
            }}
          >
            Nuestra alianza estratégica de primer nivel nos permite garantizar vuelos directos, manejo prioritario y la máxima seguridad en todos sus envíos internacionales.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
