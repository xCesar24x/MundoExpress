"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header" style={{ padding: scrolled ? "1rem 0" : "1.5rem 0", background: scrolled ? "rgba(5, 5, 5, 0.85)" : "transparent", borderBottomColor: scrolled ? "rgba(255, 255, 255, 0.05)" : "transparent" }}>
      <div className="header-container" style={{ padding: "0 2rem" }}>
        <div className="logo">
          <a href="/">
            <img src="/assets/Logo.png" alt="Mundo Express Logo" />
          </a>
        </div>
        <nav className="nav-links">
          <a href="/" className="nav-item">Inicio</a>
          <a href="/services" className="nav-item">Servicios</a>
          <a href="/contact" className="nav-item">Contacto</a>
          <motion.a 
            href="https://www.mundoexpresscr.com" 
            className="btn-primary" 
            style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portal de Clientes
          </motion.a>
        </nav>
      </div>
    </header>
  );
}
