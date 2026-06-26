"use client";
import React from 'react';
import Header from '../components/Header';
import Services from '../components/Services';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  return (
    <div className="app-container" style={{ background: "var(--bg-dark)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      
      <main style={{ flex: 1 }}>
        {/* Services Hero */}
        <section className="services-hero" style={{ padding: "10rem 2rem 2rem 2rem", textAlign: "center", position: "relative" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span style={{ color: "var(--primary)", border: "1px solid var(--primary)", padding: "0.5rem 1.5rem", borderRadius: "50px", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "2px" }}>
              NUESTRA OFERTA
            </span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, textTransform: "uppercase", marginTop: "1.5rem", color: "var(--text-main)", letterSpacing: "-1px" }}>
              SOLUCIONES LOGÍSTICAS
            </h1>
            <p style={{ marginTop: "1.5rem", color: "var(--text-light)", fontSize: "1.2rem", lineHeight: 1.6 }}>
              Conectamos su negocio con los principales mercados globales a través de nuestra robusta infraestructura de transporte aéreo, marítimo y terrestre.
            </p>
          </div>
        </section>

        {/* Featured Services Grid Component */}
        <Services />
      </main>

      <Footer />
    </div>
  );
}
