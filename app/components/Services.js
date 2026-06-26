"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, AirplaneTilt, Boat, Warehouse, ClipboardText, Package } from '@phosphor-icons/react';

const servicesList = [
  {
    title: 'Transporte Terrestre',
    desc: 'Flota moderna para carga pesada y distribución urbana en todo el país, con rastreo GPS en tiempo real.',
    Icon: Truck
  },
  {
    title: 'Flete Aéreo',
    desc: 'Envíos urgentes con las mejores aerolíneas comerciales para carga crítica y de alto valor.',
    Icon: AirplaneTilt
  },
  {
    title: 'Carga Marítima',
    desc: 'Soluciones FCL y LCL ultra eficientes y económicas para volúmenes grandes a nivel internacional.',
    Icon: Boat
  },
  {
    title: 'Almacenaje',
    desc: 'Centros de distribución de alta seguridad con control de inventario inteligente y vigilancia 24/7.',
    Icon: Warehouse
  },
  {
    title: 'Aduanas',
    desc: 'Gestión rápida y sin fricciones de trámites aduaneros de importación y exportación.',
    Icon: ClipboardText
  },
  {
    title: 'Última Milla',
    desc: 'Entregas precisas y puntuales directamente a la puerta de su cliente final con total trazabilidad.',
    Icon: Package
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

      <div className="services-grid">
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
