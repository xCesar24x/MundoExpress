"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Boat, Warehouse, ClipboardText, Package, Headset } from '@phosphor-icons/react';

const servicesList = [
  {
    title: 'Carga Marítima',
    desc: 'Soluciones FCL y LCL ultra eficientes y económicas para volúmenes grandes a nivel internacional.',
    Icon: Boat
  },
  {
    title: 'Consolidación',
    desc: 'Agrupamos tus múltiples compras en un solo paquete para que ahorres al máximo en tu envío a Costa Rica.',
    Icon: Warehouse
  },
  {
    title: 'Servicios Aduanales',
    desc: 'Gestión rápida y sin complicaciones de trámites de nacionalización e impuestos para tus importaciones.',
    Icon: ClipboardText
  },
  {
    title: 'Última Milla',
    desc: 'Entregas precisas y puntuales directamente a la puerta de su cliente final con total trazabilidad.',
    Icon: Package
  },
  {
    title: 'Atención Personalizada',
    desc: 'Asesoría y soporte continuo durante todo el proceso de importación, adaptándonos a tus necesidades específicas.',
    Icon: Headset
  }
];

export default function Services() {
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
              <a href="#" className="btn-link">Conocer más <span>→</span></a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
