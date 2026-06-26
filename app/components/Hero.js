"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Package } from '@phosphor-icons/react';
import TrackingWidget from './TrackingWidget';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="hero">
      
      <div className="hero-container" style={{ alignItems: 'center' }}>
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="hero-badge" 
            variants={itemVariants}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: 'var(--text-main)',
              marginBottom: '1.5rem',
              letterSpacing: '0.05em',
              width: 'fit-content'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary)', borderRadius: '4px', padding: '3px' }}>
              <Package size={14} color="#FFF" weight="fill" />
            </span>
            <span>¡MUNDO EXPRESS! MÁS QUE UN ENVÍO, UNA SOLUCIÓN CONFIABLE.</span>
          </motion.div>

          <motion.h1 className="title" variants={itemVariants} style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: '1.1' }}>
            SOLUCIONES LOGÍSTICAS <br />
            PARA UN MUNDO <br />
            <span className="text-gradient">SIN FRONTERAS</span>
          </motion.h1>
          
          <motion.p className="description" variants={itemVariants}>
            Compra en cualquier parte del mundo sin complicaciones. Importa, recibe y crece con el respaldo de Mundo Express. Recibe tus compras en Costa Rica de forma rápida, segura y confiable.
          </motion.p>
          
          <motion.div className="hero-actions" variants={itemVariants}>
            <a href="https://www.mundoexpresscr.com" className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>Regístrate Gratis</a>
            <a href="https://www.mundoexpresscr.com" className="btn-secondary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>Tu dirección en Miami</a>
          </motion.div>
        </motion.div>

        <div className="hero-graphics-wrapper">
          <TrackingWidget />
          
          <motion.div 
            className="hero-airplane-container"
            initial={{ opacity: 0, x: 100, y: 50 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: 0,
              transition: { duration: 1.2, ease: "easeOut", delay: 0.6 }
            }}
          >
            <motion.img 
              src="/assets/Avionheaderprincipal.png" 
              alt="Avion Mundo Express" 
              className="hero-airplane-img"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 0.8, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

