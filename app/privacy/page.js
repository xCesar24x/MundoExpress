"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const policies = [
    {
      title: "1. Datos que recopilamos",
      content: "Al registrarse en Mundo Express, recopilamos información personal básica como su nombre, correo electrónico, número de teléfono, número de identificación (cédula física o jurídica) y dirección física para la entrega de sus compras. Adicionalmente, al utilizar el casillero, guardamos las facturas comerciales de sus compras y los detalles de los paquetes importados."
    },
    {
      title: "2. Uso de la información",
      content: "La información recolectada se utiliza estrictamente para operar sus servicios de casillero y transporte, incluyendo: gestionar el ingreso de mercancías en nuestras bodegas internacionales (Miami, China y Colombia), realizar el trámite de nacionalización ante la Dirección General de Aduanas de Costa Rica, enviarle notificaciones automáticas sobre el estado de sus paquetes y coordinar la entrega física en su domicilio."
    },
    {
      title: "3. Confidencialidad y Terceros",
      content: "Mundo Express no vende, alquila ni comercializa sus datos personales con ninguna empresa externa con fines publicitarios. Compartimos sus datos únicamente con las autoridades aduaneras nacionales (para el debido pago de impuestos) y con empresas subcontratadas de mensajería (únicamente dirección y teléfono de contacto) para finalizar la entrega física de sus envíos."
    },
    {
      title: "4. Seguridad de su Información",
      content: "Implementamos tecnologías avanzadas de seguridad informática, incluyendo bases de datos encriptadas y conexiones SSL para proteger su cuenta y su información de facturación de accesos no autorizados, modificaciones o divulgaciones no deseadas."
    },
    {
      title: "5. Sus Derechos",
      content: "Como usuario registrado, usted tiene derecho a acceder a su información personal almacenada, solicitar la rectificación de datos inexactos o la eliminación de su cuenta escribiendo directamente a nuestro canal de soporte técnico al correo info@mundoexpresscr.com."
    }
  ];

  return (
    <div className="app-container" style={{ background: "var(--bg-dark)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      
      <main style={{ flex: 1 }}>
        {/* Privacy Hero */}
        <section className="privacy-hero" style={{ padding: "10rem 2rem 4rem 2rem", textAlign: "center", position: "relative" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span style={{ color: "var(--primary)", border: "1px solid var(--primary)", padding: "0.5rem 1.5rem", borderRadius: "50px", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "2px" }}>
              Privacidad y Seguridad
            </span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, textTransform: "uppercase", marginTop: "1.5rem", color: "var(--text-main)", letterSpacing: "-1px" }}>
              Políticas de Privacidad
            </h1>
            <p style={{ marginTop: "1.5rem", color: "var(--text-light)", fontSize: "1.2rem", lineHeight: 1.6 }}>
              Protección de sus datos y manejo de la información en Mundo Express.
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section style={{ padding: "2rem 2rem 8rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {policies.map((p, idx) => (
              <motion.div
                key={idx}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 style={{ color: "#FFFFFF", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>
                  {p.title}
                </h3>
                <p style={{ color: "var(--text-light)", lineHeight: "1.8", fontSize: "1.05rem" }}>
                  {p.content}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
