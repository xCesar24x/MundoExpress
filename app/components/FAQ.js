"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqCategories = [
  { id: 'all', name: 'Todas' },
  { id: 'casillero', name: 'Casillero Internacional' },
  { id: 'tarifas', name: 'Tarifas y Envíos' },
  { id: 'compras', name: 'Compra Asistida y China' },
  { id: 'aduanas', name: 'Aduanas y Restricciones' }
];

const faqItems = [
  {
    category: 'casillero',
    question: '¿Cómo funciona el casillero internacional?',
    answer: 'Al registrarte gratis en Mundo Express, te asignamos direcciones físicas exclusivas en Miami (EE.UU.), China y Colombia, cada una con tu número de casillero. Realizas tus compras online en cualquier tienda del mundo, ingresas la dirección correspondiente al pagar y, una vez que tus paquetes llegan a nuestras bodegas, nos encargamos de transportarlos e importarlos a Costa Rica hasta la puerta de tu casa.'
  },
  {
    category: 'tarifas',
    question: '¿Qué tarifas tienen y cómo se calcula el cobro?',
    answer: 'Nuestras tarifas se basan principalmente en el peso real de los paquetes en kilos. Manejamos una tarifa plana todo incluido de ₡6,480 por kilo hacia Costa Rica. No cobramos peso volumétrico para la gran mayoría de envíos estándar. El cobro final incluye el flete internacional, el trámite aduanal y la entrega a domicilio.'
  },
  {
    category: 'aduanas',
    question: '¿Qué artículos están prohibidos importar a Costa Rica?',
    answer: 'Por regulaciones gubernamentales de aduanas, algunos artículos tienen restricciones de ingreso o prohibición total, tales como: armas de fuego (o de juguete/balines/comprimidas). Si tienes dudas sobre un producto, contáctanos antes de comprar.'
  },
  {
    category: 'compras',
    question: '¿Cómo funciona el servicio de Compra Asistida?',
    answer: 'Si no tienes tarjeta internacional o se te dificulta comprar en tiendas de Estados Unidos, China o Colombia, simplemente envíanos el enlace del producto que deseas. Nosotros cotizamos en minutos, realizamos la compra de forma segura por ti y tú nos pagas localmente mediante SINPE o transferencia.'
  },
  {
    category: 'tarifas',
    question: '¿Hacen entregas en todo el país?',
    answer: '¡Sí! Realizamos entregas a domicilio en todo el territorio nacional. Para la Gran Área Metropolitana (GAM) utilizamos nuestro servicio de mensajería express propia. Para zonas fuera de la GAM o rurales, coordinamos los envíos a través de Correos de Costa Rica o servicios de encomiendas de confianza.'
  },
  {
    category: 'casillero',
    question: '¿Qué es la consolidación y cómo puedo solicitarla?',
    answer: 'La consolidación consiste en agrupar varias compras diferentes que llegan a tus casilleros (por ejemplo, en Miami) para enviarlas en un solo paquete unificado. Esto te ayuda a ahorrar al máximo en los costos de envío hacia Costa Rica. Puedes solicitar este servicio a través de nuestro equipo o panel de usuario.'
  },
  {
    category: 'casillero',
    question: '¿Cómo rastreo el estado de mis paquetes?',
    answer: 'Una vez que tus paquetes ingresen a cualquiera de nuestras bodegas de origen (Miami, China o Colombia), recibirás una notificación automática con tu número de guía de Mundo Express. Podrás ingresar ese número en la sección de rastreo en nuestro sitio web para ver el estado de tu envío en tiempo real.'
  },
  {
    category: 'compras',
    question: '¿Puedo comprar en tiendas de China como Taobao o 1688?',
    answer: '¡Claro que sí! Puedes comprar directamente usando tu casillero de China. Si no sabes cómo comprar en plataformas locales como Taobao, Tmall o 1688.com (que requieren cuentas y métodos de pago chinos), puedes enviarnos los links y nosotros nos encargamos de toda la compra y logística mediante nuestro servicio de Compra Asistida.'
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Filter FAQs based on active category and search query
  const filteredFAQs = faqItems.filter((item, index) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="faq-section" style={{ 
      padding: "8rem 2rem", 
      background: "#050505", 
      color: "#FFFFFF",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Glows */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "-200px",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(20, 177, 189, 0.05) 0%, rgba(5, 5, 5, 0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Pill Label */}
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <span style={{ 
            color: "var(--primary, #14B1BD)", 
            border: "1px solid var(--primary, #14B1BD)", 
            padding: "0.5rem 2rem", 
            borderRadius: "50px", 
            textTransform: "uppercase", 
            fontSize: "0.85rem", 
            letterSpacing: "2px", 
            fontWeight: 600,
            display: "inline-block"
          }}>
            Ayuda y Soporte
          </span>
        </div>

        {/* Title */}
        <h2 style={{ 
          fontSize: "clamp(2rem, 5vw, 3rem)", 
          fontWeight: 900, 
          textAlign: "center",
          marginBottom: "4rem", 
          letterSpacing: "-1px"
        }}>
          Preguntas <span style={{ color: "var(--primary, #14B1BD)" }}>Frecuentes</span>
        </h2>

        <div className="faq-layout">
          {/* Left Column: Mascot */}
          <div className="faq-mascot-container">
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{
                position: "absolute",
                width: "220px",
                height: "220px",
                background: "radial-gradient(circle, rgba(20, 177, 189, 0.18) 0%, transparent 70%)",
                zIndex: -1,
                borderRadius: "50%",
                pointerEvents: "none"
              }} />
              <motion.img 
                src="/assets/mascota/POSE_PENSANDO.png"
                alt="Mascota Mundo Express"
                className="faq-mascot-img"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Right Column: FAQ Content */}
          <div style={{ flex: 1, minWidth: 0 }}>

        {/* Search Bar */}
        <div style={{ 
          position: "relative",
          marginBottom: "3rem",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          transition: "all 0.3s ease",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}
        onFocusCapture={(e) => {
          e.currentTarget.style.borderColor = "var(--primary, #14B1BD)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(20, 177, 189, 0.1)";
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
        }}
        >
          <svg style={{ marginLeft: "1rem", marginRight: "0.5rem" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="¿Qué estás buscando? Escribe tu pregunta aquí..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              outline: "none",
              color: "#FFFFFF",
              fontSize: "1.05rem",
              padding: "1rem 0.5rem",
              fontFamily: "inherit"
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                marginRight: "0.5rem",
                color: "#FFFFFF",
                fontSize: "0.8rem"
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "center", 
          gap: "0.75rem", 
          marginBottom: "4rem" 
        }}>
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setExpandedIndex(null);
              }}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                border: activeCategory === cat.id ? "1px solid var(--primary, #14B1BD)" : "1px solid rgba(255,255,255,0.05)",
                background: activeCategory === cat.id ? "rgba(20, 177, 189, 0.1)" : "rgba(255,255,255,0.02)",
                color: activeCategory === cat.id ? "var(--primary, #14B1BD)" : "var(--text-light, #A1A1AA)"
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "#FFFFFF";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--text-light, #A1A1AA)";
                }
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ Items Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AnimatePresence mode="popLayout">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const isOpen = expandedIndex === index;
                return (
                  <motion.div
                    key={faq.question}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      background: isOpen ? "rgba(20, 177, 189, 0.02)" : "rgba(255, 255, 255, 0.01)",
                      border: isOpen ? "1px solid rgba(20, 177, 189, 0.25)" : "1px solid rgba(255, 255, 255, 0.04)",
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "border-color 0.3s ease, background-color 0.3s ease"
                    }}
                  >
                    <button
                      className="faq-button"
                      onClick={() => toggleFAQ(index)}
                      style={{
                        width: "100%",
                        padding: "1.75rem 2rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        color: isOpen ? "var(--primary, #14B1BD)" : "#FFFFFF",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        transition: "color 0.3s ease"
                      }}
                    >
                      <span>{faq.question}</span>
                      <span style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: isOpen ? "var(--primary, #14B1BD)" : "rgba(255,255,255,0.05)",
                        color: isOpen ? "#050505" : "#FFFFFF",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: isOpen ? "rotate(135deg)" : "rotate(0deg)"
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="faq-answer" style={{ 
                            padding: "0 2rem 2rem 2rem", 
                            color: "rgba(255, 255, 255, 0.75)", 
                            lineHeight: "1.7",
                            fontSize: "1.05rem"
                          }}>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                layout
                style={{ 
                  textAlign: "center", 
                  padding: "4rem 2rem", 
                  color: "var(--text-light, #A1A1AA)",
                  fontSize: "1.1rem"
                }}
              >
                No encontramos preguntas que coincidan con tu búsqueda. ¡Prueba con otra palabra!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

          </div>
        </div>

      </div>
    </section>
  );
}
