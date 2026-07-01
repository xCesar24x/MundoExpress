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
          
          <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", margin: "0 0.5rem" }}>
            <motion.a 
              href="https://www.facebook.com/share/1AGJVmAE8t/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 6px rgba(24, 119, 242, 0.7))" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" style={{ display: "block" }}>
                <circle cx="12" cy="12" r="12" fill="#1877F2"/>
                <path d="M13.5 18h-2.5v-6H9.5V9.5h1.5V8c0-1.8 1.1-2.8 2.8-2.8.8 0 1.5.06 1.7.08v2h-1.2c-.87 0-1 .4-1 1v1.3h2.2l-.3 2.5h-1.9V18z" fill="#FFF"/>
              </svg>
            </motion.a>
            
            <motion.a 
              href="https://www.instagram.com/mundoexpresscr?igsh=a2loeDA1ZzR5eTl2&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 6px rgba(225, 48, 108, 0.7))" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" style={{ display: "block" }}>
                <defs>
                  <radialGradient id="ig-grad-header" cx="30%" cy="100%" r="110%">
                    <stop offset="0%" stopColor="#fdf497"/>
                    <stop offset="5%" stopColor="#fdf497"/>
                    <stop offset="30%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect width="24" height="24" rx="5.5" fill="url(#ig-grad-header)"/>
                <rect x="5" y="5" width="14" height="14" rx="4.2" fill="none" stroke="#FFF" strokeWidth="1.6"/>
                <circle cx="12" cy="12" r="3.2" fill="none" stroke="#FFF" strokeWidth="1.6"/>
                <circle cx="16.2" cy="7.8" r="0.9" fill="#FFF"/>
              </svg>
            </motion.a>

            <motion.a 
              href="https://www.tiktok.com/@mundoexpresscr?_r=1&_t=ZS-97WA6NimZNN" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              title="TikTok"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" style={{ display: "block" }}>
                <rect width="24" height="24" rx="5.5" fill="#000"/>
                <g transform="translate(0.5, 0.5)">
                  <path d="M16 9.5c-.8 0-1.5-.2-2.1-.6V14a4 4 0 1 1-4-4c.3 0 .6 0 .9.1v1.8c-.3-.1-.6-.1-.9-.1a2.2 2.2 0 1 0 2.2 2.2V6h1.8c.3.9 1 1.7 1.8 2.2.8.5 1.7.8 2.7.8v1.7c-1 0-1.9-.3-2.4-.7z" fill="#00F2FE" transform="translate(-0.4, 0.4)" />
                  <path d="M16 9.5c-.8 0-1.5-.2-2.1-.6V14a4 4 0 1 1-4-4c.3 0 .6 0 .9.1v1.8c-.3-.1-.6-.1-.9-.1a2.2 2.2 0 1 0 2.2 2.2V6h1.8c.3.9 1 1.7 1.8 2.2.8.5 1.7.8 2.7.8v1.7c-1 0-1.9-.3-2.4-.7z" fill="#FE2C55" transform="translate(0.4, -0.4)" />
                  <path d="M16 9.5c-.8 0-1.5-.2-2.1-.6V14a4 4 0 1 1-4-4c.3 0 .6 0 .9.1v1.8c-.3-.1-.6-.1-.9-.1a2.2 2.2 0 1 0 2.2 2.2V6h1.8c.3.9 1 1.7 1.8 2.2.8.5 1.7.8 2.7.8v1.7c-1 0-1.9-.3-2.4-.7z" fill="#FFF"/>
                </g>
              </svg>
            </motion.a>

            <motion.a 
              href="https://wa.me/50670511239" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 6px rgba(37, 211, 102, 0.7))" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" style={{ display: "block" }}>
                <circle cx="12" cy="12" r="12" fill="#25D366"/>
                <path d="M16.75 13.96c-.25-.13-1.5-.74-1.73-.82-.23-.08-.4-.12-.57.12-.17.25-.66.83-.8 1-.15.17-.3.19-.55.07-.25-.13-1.07-.4-2.04-1.27-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.38.1-.5.12-.1.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.5-.4-.43-.57-.44h-.49c-.17 0-.44.06-.67.3-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.62.12.18 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.5-.61 1.71-1.2.2-1.2.2-1.2.14-1.42-.06-.08-.22-.12-.47-.25zM12 2C6.48 2 2 6.48 2 12c0 1.91.54 3.7 1.48 5.24L2.03 22l4.93-1.29C8.42 21.52 10.13 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.63 0-3.15-.43-4.47-1.18l-.32-.19-2.94.77.78-2.86-.21-.33C4.09 15.05 3.6 13.58 3.6 12c0-4.63 3.77-8.4 8.4-8.4s8.4 3.77 8.4 8.4-3.77 8.4-8.4 8.4z" fill="#FFF"/>
              </svg>
            </motion.a>
          </div>

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
