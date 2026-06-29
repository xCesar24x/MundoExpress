"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package } from '@phosphor-icons/react';
import TrackingWidget from './TrackingWidget';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('miami'); // 'miami' or 'china'
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const openModal = params.get('openAddressModal');
      const tab = params.get('tab');
      if (openModal === 'true') {
        setIsModalOpen(true);
        if (tab && ['miami', 'china', 'colombia'].includes(tab)) {
          setModalTab(tab);
        }
        
        // Clean URL parameters so they don't stick on page refresh
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, []);

  const handleCopy = (text, fieldId) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const miamiAddress = [
    { label: "Nombre / Consignatario", value: "Mundo Express + [Tu Casillero] (Ej: Mundo Express 0007)", id: "m_name" },
    { label: "Dirección / Address Line 1", value: "11350 NW 25th St", id: "m_addr" },
    { label: "Dirección 2 / Address Line 2 (Suite - Apartment - Building)", value: "Ste 100", id: "m_suite" },
    { label: "Ciudad / City", value: "Doral", id: "m_city" },
    { label: "Estado / State", value: "Florida", id: "m_state" },
    { label: "Código Postal / Zip Code", value: "33172", id: "m_zip" },
    { label: "País / Country", value: "Estados Unidos", id: "m_country" },
    { label: "Teléfono / Phone", value: "+1 (305) 477-5508", id: "m_phone" }
  ];

  const chinaAddress = [
    { label: "Nombre / Consignatario", value: "Mundo Express + [Tu Casillero] (Ej: Mundo Express 0007)", id: "c_name" },
    { label: "Dirección (Chino)", value: "广东省佛山市南海区横二路6号 聚润创意园", id: "c_addr_cn" },
    { label: "Dirección (Inglés)", value: "No.6, Heng Er Road, Nanhai District, Foshan City, Guangdong Province", id: "c_addr_en" },
    { label: "Ciudad", value: "Foshan", id: "c_city" },
    { label: "Provincia", value: "Guangdong", id: "c_prov" },
    { label: "Código Postal", value: "528244", id: "c_zip" },
    { label: "País", value: "China", id: "c_country" },
    { label: "Teléfono", value: "+86 138 0013 8000", id: "c_phone" }
  ];

  const colombiaAddress = [
    { label: "Nombre / Name", value: "Mundo", id: "co_name" },
    { label: "Apellido / Last Name", value: "Express + [Tu Casillero] (Ej: Express 00076)", id: "co_lastname" },
    { label: "Dirección / Address Line 1", value: "CRA 46D #75 sur - 47, Aguas Claras 2 apto 214", id: "co_addr" },
    { label: "Dirección 2 / Suite / Lock Number", value: "[Tu Código de Casillero] (Ej: ME00076)", id: "co_suite" },
    { label: "Estado / Departamento", value: "Antioquia", id: "co_state" },
    { label: "Ciudad / City", value: "Sabaneta", id: "co_city" },
    { label: "Código Postal / Zip Code", value: "055450", id: "co_zip" },
    { label: "País / Country", value: "Colombia", id: "co_country" },
    { label: "Teléfono / Phone", value: "+57 315-148-5719", id: "co_phone" }
  ];

  const AddressRow = ({ label, value, id }) => (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "1rem 0", 
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      gap: "1.5rem"
    }}>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
          {label}
        </span>
        <div style={{ fontSize: "0.95rem", color: "white", marginTop: "0.2rem", fontWeight: 500, wordBreak: "break-all" }}>
          {value}
        </div>
      </div>
      <button 
        onClick={() => handleCopy(value, id)}
        style={{
          background: copiedField === id ? "rgba(16, 185, 129, 0.15)" : "rgba(255,255,255,0.05)",
          color: copiedField === id ? "#10b981" : "white",
          border: copiedField === id ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.1)",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "0.8rem",
          fontWeight: 600,
          transition: "all 0.25s ease",
          minWidth: "90px"
        }}
      >
        {copiedField === id ? "¡Copiado!" : "Copiar"}
      </button>
    </div>
  );

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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-secondary" 
              style={{ padding: "1rem 2rem", fontSize: "1.1rem", border: "none", cursor: "pointer" }}
            >
              Tus Direcciones: Miami, China y Colombia
            </button>
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

      {/* Address Info Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: "1rem"
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "rgba(10, 10, 10, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                width: "100%",
                maxWidth: "680px",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "2.5rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                color: "white"
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Direcciones de Casillero
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "none",
                    color: "white",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
                >
                  ✕
                </button>
              </div>

              {/* Tab Selector */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(3, 1fr)",
                padding: "6px", 
                background: "rgba(255, 255, 255, 0.05)", 
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                position: "relative",
                marginBottom: "2rem"
              }}>
                {/* Animated Sliding Pill */}
                <motion.div 
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: modalTab === 'miami' ? "6px" : modalTab === 'china' ? "calc(33.33% + 2px)" : "calc(66.66% - 2px)",
                    width: "calc(33.33% - 4px)",
                    height: "calc(100% - 12px)",
                    background: modalTab === 'miami' 
                      ? "linear-gradient(135deg, #002868 0%, #bf0a30 100%)" // USA: Exact Blue & Red
                      : modalTab === 'china'
                      ? "linear-gradient(135deg, #de2910 0%, #ffde00 100%)" // China: Exact Red & Yellow
                      : "linear-gradient(135deg, #fcd116 0%, #003893 50%, #ce1126 100%)", // Colombia: Exact Yellow, Blue, Red
                    borderRadius: "12px",
                    boxShadow: modalTab === 'miami'
                      ? "0 4px 12px rgba(0, 40, 104, 0.3)"
                      : modalTab === 'china'
                      ? "0 4px 12px rgba(222, 41, 16, 0.3)"
                      : "0 4px 12px rgba(252, 209, 22, 0.3)",
                    zIndex: 1
                  }}
                  layout
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />

                {[
                  { id: 'miami', name: 'Miami', flag: '/assets/flag-usa.avif' },
                  { id: 'china', name: 'China', flag: '/assets/flag-china.avif' },
                  { id: 'colombia', name: 'Colombia', flag: '/assets/flag-colombia.jpg' }
                ].map((tab) => {
                  const on = modalTab === tab.id;
                  return (
                    <button 
                      key={tab.id}
                      onClick={() => { setModalTab(tab.id); setCopiedField(null); }}
                      style={{
                        padding: "0.8rem 0",
                        width: "100%",
                        fontSize: "0.9rem",
                        fontWeight: "700",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "12px",
                        background: "transparent",
                        color: on ? "white" : "rgba(255, 255, 255, 0.6)",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.6rem",
                        transition: "color 0.2s ease"
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "16px",
                          borderRadius: "3px",
                          overflow: "hidden",
                          border: on ? "1px solid rgba(255,255,255,0.8)" : "1px solid rgba(255, 255, 255, 0.15)",
                          transition: "transform 0.2s, border-color 0.18s",
                          transform: on ? "scale(1.1)" : "scale(1)",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <img 
                          src={tab.flag} 
                          alt={tab.name} 
                          style={{ 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "cover" 
                          }} 
                        />
                      </div>
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {modalTab === 'miami' && (
                  miamiAddress.map((field) => (
                    <AddressRow key={field.id} label={field.label} value={field.value} id={field.id} />
                  ))
                )}
                {modalTab === 'china' && (
                  chinaAddress.map((field) => (
                    <AddressRow key={field.id} label={field.label} value={field.value} id={field.id} />
                  ))
                )}
                {modalTab === 'colombia' && (
                  colombiaAddress.map((field) => (
                    <AddressRow key={field.id} label={field.label} value={field.value} id={field.id} />
                  ))
                )}
              </div>

              <div style={{ marginTop: "2rem", fontSize: "0.8rem", color: "var(--text-light)", textAlign: "center", lineHeight: "1.4" }}>
                * Recuerda colocar tu número de casillero (código asignado al registrarte) en el campo correspondiente al hacer tus compras.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


