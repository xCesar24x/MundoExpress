"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: "var(--bg-dark)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "5rem 2rem 2rem 2rem" }}>
      {/* 4-Column Main Grid */}
      <div className="footer-container" style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "4rem" }}>
        
        {/* Column 1: Brand & Social Description */}
        <div className="footer-brand" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Link href="/">
            <img src="/assets/Logo.png" alt="Mundo Express Logo" style={{ height: "40px", width: "auto", objectFit: "contain", cursor: "pointer" }} />
          </Link>
          <p style={{ color: "var(--text-light)", lineHeight: "1.8", fontSize: "0.95rem" }}>
            Su aliado estratégico en logística global, brindando soluciones eficaces y ultra seguras para importar desde Estados Unidos y China sin límites.
          </p>
          
          {/* Social Media Icons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <motion.a 
              href="https://www.facebook.com/share/1AGJVmAE8t/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 8px rgba(24, 119, 242, 0.7))" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" width="30" height="30" style={{ display: "block" }}>
                <circle cx="12" cy="12" r="12" fill="#1877F2"/>
                <path d="M13.5 18h-2.5v-6H9.5V9.5h1.5V8c0-1.8 1.1-2.8 2.8-2.8.8 0 1.5.06 1.7.08v2h-1.2c-.87 0-1 .4-1 1v1.3h2.2l-.3 2.5h-1.9V18z" fill="#FFF"/>
              </svg>
            </motion.a>
            
            <motion.a 
              href="https://www.instagram.com/mundoexpresscr?igsh=a2loeDA1ZzR5eTl2&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 8px rgba(225, 48, 108, 0.7))" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" width="30" height="30" style={{ display: "block" }}>
                <defs>
                  <radialGradient id="ig-grad" cx="30%" cy="100%" r="110%">
                    <stop offset="0%" stopColor="#fdf497"/>
                    <stop offset="5%" stopColor="#fdf497"/>
                    <stop offset="30%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect width="24" height="24" rx="5.5" fill="url(#ig-grad)"/>
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
              whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              title="TikTok"
            >
              <svg viewBox="0 0 24 24" width="30" height="30" style={{ display: "block" }}>
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
              whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 8px rgba(37, 211, 102, 0.7))" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="30" height="30" style={{ display: "block" }}>
                <circle cx="12" cy="12" r="12" fill="#25D366"/>
                <path d="M16.75 13.96c-.25-.13-1.5-.74-1.73-.82-.23-.08-.4-.12-.57.12-.17.25-.66.83-.8 1-.15.17-.3.19-.55.07-.25-.13-1.07-.4-2.04-1.27-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.38.1-.5.12-.1.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.5-.4-.43-.57-.44h-.49c-.17 0-.44.06-.67.3-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.62.12.18 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.5-.61 1.71-1.2.2-1.2.2-1.2.14-1.42-.06-.08-.22-.12-.47-.25zM12 2C6.48 2 2 6.48 2 12c0 1.91.54 3.7 1.48 5.24L2.03 22l4.93-1.29C8.42 21.52 10.13 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.63 0-3.15-.43-4.47-1.18l-.32-.19-2.94.77.78-2.86-.21-.33C4.09 15.05 3.6 13.58 3.6 12c0-4.63 3.77-8.4 8.4-8.4s8.4 3.77 8.4 8.4-3.77 8.4-8.4 8.4z" fill="#FFF"/>
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Column 2: Servicios */}
        <div className="footer-links" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h4 style={{ color: "var(--text-main)", fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Servicios</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <li>
              <Link href="/services" style={{ color: "var(--text-light)", fontSize: "0.95rem", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>
                Dirección en Miami
              </Link>
            </li>
            <li>
              <Link href="/services" style={{ color: "var(--text-light)", fontSize: "0.95rem", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>
                Compra Asistida
              </Link>
            </li>
            <li>
              <Link href="/services" style={{ color: "var(--text-light)", fontSize: "0.95rem", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>
                Mundo Business
              </Link>
            </li>
            <li>
              <Link href="/services" style={{ color: "var(--text-light)", fontSize: "0.95rem", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>
                Casillero en China
              </Link>
            </li>
            <li>
              <Link href="/services" style={{ color: "var(--text-light)", fontSize: "0.95rem", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>
                Consolidación de Carga
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Empresa */}
        <div className="footer-links" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h4 style={{ color: "var(--text-main)", fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Empresa</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <li>
              <Link href="/about" style={{ color: "var(--text-light)", fontSize: "0.95rem", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link href="/contact" style={{ color: "var(--text-light)", fontSize: "0.95rem", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>
                Contacto & Soporte
              </Link>
            </li>
            <li>
              <Link href="/#faq" style={{ color: "var(--text-light)", fontSize: "0.95rem", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>
                Preguntas Frecuentes
              </Link>
            </li>
            <li>
              <Link href="/terms" style={{ color: "var(--text-light)", fontSize: "0.95rem", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>
                Términos de Servicio
              </Link>
            </li>
            <li>
              <Link href="/privacy" style={{ color: "var(--text-light)", fontSize: "0.95rem", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>
                Políticas de Privacidad
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Casillero Acciones */}
        <div className="footer-actions" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h4 style={{ color: "var(--text-main)", fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Mi Casillero</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <motion.a 
              href="https://sistema.mundoexpresscr.com/register" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ 
                width: "100%", 
                textAlign: "center", 
                padding: "0.85rem 1.5rem", 
                borderRadius: "8px", 
                fontWeight: "700",
                fontSize: "0.95rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Regístrate gratis
            </motion.a>
            
            <motion.a 
              href="https://sistema.mundoexpresscr.com/login" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                width: "100%", 
                textAlign: "center", 
                padding: "0.85rem 1.5rem", 
                borderRadius: "8px", 
                fontWeight: "700",
                fontSize: "0.95rem",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                background: "rgba(255, 255, 255, 0.02)",
                color: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
              whileHover={{ 
                scale: 1.03,
                borderColor: "var(--primary)",
                background: "rgba(20, 177, 189, 0.08)"
              }}
              whileTap={{ scale: 0.97 }}
            >
              Iniciar sesión
            </motion.a>
          </div>
        </div>

      </div>

      {/* Sede Central Information Bar */}
      <div style={{ 
        maxWidth: "1400px", 
        margin: "4rem auto 0 auto", 
        paddingTop: "2rem", 
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1.5rem",
        color: "var(--text-light)"
      }}>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            📍 San José, Costa Rica
          </span>
          <span style={{ fontSize: "0.9rem" }}>
            📞 <a 
              href="https://wa.me/50670511239" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "var(--text-light)", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#25D366"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}
            >
              +506 7051-1239
            </a>
          </span>
          <span style={{ fontSize: "0.9rem" }}>
            ✉️ <a 
              href="mailto:info@mundoexpresscr.com"
              style={{ color: "var(--text-light)", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}
            >
              info@mundoexpresscr.com
            </a>
          </span>
        </div>
        
        {/* Sub-legal copyright & Admin Access */}
        <div style={{ fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>© {new Date().getFullYear()} Mundo Express. Todos los derechos reservados.</span>
          <Link href="/admin/login" style={{ color: "var(--text-light)", opacity: 0.5, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.5} title="Admin Portal">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
