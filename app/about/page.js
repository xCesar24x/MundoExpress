"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const values = [
    { title: "Transparencia", desc: "Sin cargos ocultos ni sorpresas en sus facturas. Tarifas claras calculadas por peso real." },
    { title: "Seguridad", desc: "Cuidamos sus paquetes como si fueran nuestros, garantizando que lleguen en perfecto estado." },
    { title: "Rapidez", desc: "Flujo logístico optimizado en Miami y aduanas de Costa Rica para que sus envíos lleguen en tiempo récord." },
    { title: "Atención", desc: "Soporte personalizado y constante por WhatsApp, teléfono y correo electrónico 24/7." }
  ];

  return (
    <div className="app-container" style={{ background: "var(--bg-dark)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      
      <main style={{ flex: 1 }}>
        {/* About Hero */}
        <section className="about-hero" style={{ padding: "10rem 2rem 4rem 2rem", textAlign: "center", position: "relative" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span style={{ color: "var(--primary)", border: "1px solid var(--primary)", padding: "0.5rem 1.5rem", borderRadius: "50px", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "2px" }}>
              Sobre Nosotros
            </span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, textTransform: "uppercase", marginTop: "1.5rem", color: "var(--text-main)", letterSpacing: "-1px" }}>
              CONECTANDO SU MUNDO
            </h1>
            <p style={{ marginTop: "1.5rem", color: "var(--text-light)", fontSize: "1.2rem", lineHeight: 1.6 }}>
              Somos Mundo Express, su aliado estratégico en importación, logística y compras asistidas desde Estados Unidos, China y Colombia.
            </p>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem" }}>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                padding: "3rem 2.5rem",
                borderRadius: "20px"
              }}
            >
              <h3 style={{ color: "var(--primary)", fontSize: "1.8rem", fontWeight: 800, marginBottom: "1rem" }}>NUESTRA MISIÓN</h3>
              <p style={{ color: "var(--text-light)", lineHeight: "1.8", fontSize: "1.05rem" }}>
                Facilitar las compras internacionales de las personas y empresas en Costa Rica, ofreciendo un servicio de casillero rápido, transparente y con entrega garantizada, eliminando por completo la complejidad de los trámites aduanales.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                padding: "3rem 2.5rem",
                borderRadius: "20px"
              }}
            >
              <h3 style={{ color: "var(--primary)", fontSize: "1.8rem", fontWeight: 800, marginBottom: "1rem" }}>NUESTRA VISIÓN</h3>
              <p style={{ color: "var(--text-light)", lineHeight: "1.8", fontSize: "1.05rem" }}>
                Convertirnos en el courier logístico de referencia y mayor confianza en Costa Rica, distinguiéndonos por nuestra constante innovación tecnológica, la excelencia en el servicio al cliente y soluciones integrales de logística puerta a puerta.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Corporate Values */}
        <section style={{ padding: "6rem 2rem 8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, textAlign: "center", marginBottom: "4rem", textTransform: "uppercase" }}>
            NUESTROS VALORES <span style={{ color: "var(--primary)" }}>FUNDAMENTALES</span>
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  background: "rgba(20, 177, 189, 0.01)",
                  border: "1px solid rgba(20, 177, 189, 0.08)",
                  padding: "2.5rem 2rem",
                  borderRadius: "16px",
                  transition: "all 0.3s ease"
                }}
                whileHover={{
                  transform: "translateY(-5px)",
                  borderColor: "var(--primary)",
                  boxShadow: "0 10px 30px rgba(20, 177, 189, 0.05)"
                }}
              >
                <h4 style={{ color: "#FFFFFF", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>
                  {val.title}
                </h4>
                <p style={{ color: "var(--text-light)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  {val.desc}
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
