"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "#050505",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}
        >
          {/* Logo container */}
          <div style={{ position: "relative", width: "min(840px, 90vw)", height: "min(210px, 22.5vw)", marginBottom: "2rem" }}>
            
            {/* Background Logo (Grayscale / Darkened Outline version) */}
            <img 
              src="/assets/Logo.png" 
              alt="Cargando..." 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 0.1,
                filter: "brightness(0) invert(1)",
                position: "absolute",
                top: 0,
                left: 0,
                userSelect: "none",
                pointerEvents: "none"
              }}
            />

            {/* Foreground Logo (Fills from left to right) */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden"
              }}
            >
              <img 
                src="/assets/Logo.png" 
                alt="Mundo Express" 
                style={{
                  width: "100%", // fits dynamic container size
                  height: "100%",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none"
                }}
              />
            </motion.div>

          </div>

          {/* Smooth teal loading line below the logo */}
          <div style={{ width: "min(400px, 60vw)", height: "3px", background: "rgba(255, 255, 255, 0.05)", borderRadius: "3px", position: "relative", overflow: "hidden" }}>
            <motion.div 
              initial={{ left: "-100%", width: "50%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.1 }}
              style={{
                height: "100%",
                position: "absolute",
                background: "linear-gradient(90deg, transparent, var(--primary, #14B1BD), transparent)",
                boxShadow: "0 0 8px var(--primary, #14B1BD)"
              }}
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
