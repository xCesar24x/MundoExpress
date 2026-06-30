"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ExclusiveAgreement() {
  return (
    <section style={{ 
      padding: "2rem 1rem",
      background: "var(--bg-dark)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Subtle gold glow in background */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px",
        height: "200px",
        background: "radial-gradient(ellipse, rgba(212, 175, 55, 0.06) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        style={{ position: "relative", display: "inline-block" }}
      >
        {/* CSS keyframe for rotating golden light */}
        <style>{`
          @keyframes rotate-gold {
            0%   { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          .gold-ring-outer {
            animation: rotate-gold 4s linear infinite;
          }
        `}</style>

        {/* Rotating border container */}
        <div className="exclusive-card-wrapper" style={{
          position: "relative",
          borderRadius: "20px",
          padding: "4px",
          background: "transparent",
          width: "fit-content",
          overflow: "hidden"
        }}>
          {/* Rotating conic-gradient gold ring */}
          <div className="gold-ring-outer" style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(0deg)",
            width: "200%",
            height: "200%",
            background: "conic-gradient(from 0deg, transparent 40%, #9a7a00 52%, #D4AF37 58%, #FFE57A 63%, #FFF5A0 66%, #FFE57A 69%, #D4AF37 74%, #9a7a00 80%, transparent 88%)",
            zIndex: 0
          }} />

          {/* Dark base layer */}
          <div style={{
            position: "absolute",
            inset: "4px",
            borderRadius: "16px",
            background: "#0a0a0a",
            zIndex: 1
          }} />

          {/* Card content */}
          <div className="exclusive-card-inner" style={{
            position: "relative",
            zIndex: 2,
            background: "linear-gradient(160deg, #111111 0%, #0d0d0d 100%)",
            borderRadius: "16px",
            padding: "2rem 3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2rem",
            minWidth: "480px",
            maxWidth: "600px"
          }}>
            {/* Top badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <span style={{ display: "block", width: "30px", height: "1px", background: "linear-gradient(to right, transparent, #D4AF37)" }} />
              <p style={{
                margin: 0,
                color: "#D4AF37",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "5px",
                textTransform: "uppercase"
              }}>Convenio Exclusivo</p>
              <span style={{ display: "block", width: "30px", height: "1px", background: "linear-gradient(to left, transparent, #D4AF37)" }} />
            </div>

            {/* Amerijet logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "1rem 2.5rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src="/assets/exclusivo.png.jpeg"
                alt="Amerijet Exclusive Partner"
                style={{ height: "55px", objectFit: "contain", display: "block" }}
              />
            </motion.div>

            {/* Ornamental divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", width: "100%" }}>
              <span style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4))" }} />
              <span style={{ color: "#D4AF37", fontSize: "0.6rem" }}>✦</span>
              <span style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(212,175,55,0.4))" }} />
            </div>

            {/* Copy */}
            <p style={{
              margin: 0,
              textAlign: "center",
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.82rem",
              lineHeight: "1.65",
              fontWeight: 300,
              letterSpacing: "0.2px"
            }}>
              Alianza estratégica de primer nivel que garantiza vuelos directos,<br />
              manejo prioritario y máxima seguridad en cada envío.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
