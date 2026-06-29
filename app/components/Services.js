"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Boat, Warehouse, ClipboardText, Package, Headset, X } from '@phosphor-icons/react';

const servicesList = [
  {
    title: 'Carga Marítima',
    desc: 'Soluciones FCL y LCL ultra eficientes y económicas para volúmenes grandes a nivel internacional.',
    Icon: Boat,
    details: [
      'Transporte de contenedores completos (FCL) y carga consolidada (LCL).',
      'Gestión de fletes marítimos desde y hacia los principales puertos del mundo.',
      'Asesoría en rutas, tiempos de tránsito y optimización de costos.',
      'Seguimiento en tiempo real de su carga marítima.',
      'Seguro de mercancía opcional para mayor tranquilidad.'
    ]
  },
  {
    title: 'Consolidación',
    desc: 'Agrupamos tus múltiples compras en un solo paquete para que ahorres al máximo en tu envío a Costa Rica.',
    Icon: Warehouse,
    details: [
      'Recepción y almacenaje seguro de sus paquetes en nuestras bodegas.',
      'Reempaque y optimización de espacio para reducir costos de envío.',
      'Fotografías y verificación de estado de la mercancía al recibirla.',
      'Consolidación gratuita de múltiples paquetes en un solo envío.',
      'Gestión de inventario para clientes frecuentes.'
    ]
  },
  {
    title: 'Agencia Aduanal',
    desc: 'Seremos su apoyo en todo el proceso de los trámites aduaneros para el despacho de sus mercancías.',
    Icon: ClipboardText,
    details: [
      'Servicio de desalmacenajes y trámites de exportación.',
      'Cálculo de impuestos previo a la importación de su mercadería.',
      'Revisión de documentos previos a sus trámites para que cumplan con la Ley General de Aduanas.',
      'Trámites de exportaciones, importaciones temporales y Zona Franca.',
      'Brindamos servicio en todas las aduanas del país.',
      'Entrega local de tus mercancías.'
    ]
  },
  {
    title: 'Última Milla',
    desc: 'Entregas precisas y puntuales directamente a la puerta de su cliente final con total trazabilidad.',
    Icon: Package,
    details: [
      'Distribución y entrega de paquetes a nivel nacional.',
      'Rutas de entrega optimizadas para reducir tiempos.',
      'Confirmación de entrega con prueba electrónica.',
      'Personal de entrega capacitado y confiable.',
      'Flexibilidad en horarios y métodos de entrega.'
    ]
  },
  {
    title: 'Atención Personalizada',
    desc: 'Asesoría y soporte continuo durante todo el proceso de importación, adaptándonos a tus necesidades específicas.',
    Icon: Headset,
    details: [
      'Asignación de un ejecutivo de cuenta exclusivo.',
      'Soporte por teléfono, correo y WhatsApp en todo momento.',
      'Asesoramiento en clasificación arancelaria y regulaciones.',
      'Resolución rápida y efectiva de cualquier inconveniente.',
      'Reportes de estado y notificaciones personalizadas.'
    ]
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="services-section" id="services">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="subtitle">Nuestra Experiencia</span>
        <h2 className="title">Servicios Destacados</h2>
      </motion.div>

      <div 
        className="services-grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2.5rem",
          justifyContent: "center"
        }}
      >
        {servicesList.map((service, index) => {
          const IconComponent = service.Icon;
          return (
            <motion.div 
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                flex: "1 1 350px",
                maxWidth: "400px"
              }}
            >
              <div className="service-icon">
                <IconComponent weight="duotone" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <a href="#!" onClick={(e) => { e.preventDefault(); setSelectedService(service); }} className="btn-link">Conocer más <span>→</span></a>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedService && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                background: 'var(--bg-dark)', border: '1px solid var(--primary)',
                borderRadius: '20px', padding: '3rem', maxWidth: '600px', width: '100%',
                position: 'relative',
                maxHeight: '90vh', overflowY: 'auto'
              }}
            >
              <button 
                onClick={() => setSelectedService(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ color: 'var(--primary)' }}>
                  <selectedService.Icon size={48} weight="duotone" />
                </div>
                <h3 style={{ fontSize: '2rem', margin: 0 }}>{selectedService.title}</h3>
              </div>
              
              <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                {selectedService.desc}
              </p>

              <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.2rem', textTransform: 'uppercase' }}>Lo que ofrecemos:</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '0' }}>
                {selectedService.details.map((detail, idx) => (
                  <li key={idx} style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'flex-start', gap: '0.8rem', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--primary)', marginTop: '4px' }}>●</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              
              {selectedService.title === 'Agencia Aduanal' && (
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <p style={{ color: "var(--text-main)", fontWeight: 500, marginBottom: "1rem" }}>
                    ¿Te gustaría empezar hoy a traer tus compras con nosotros?
                  </p>
                  <a href="#contacto" onClick={() => setSelectedService(null)} className="btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem' }}>
                    Solicitar más información
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
