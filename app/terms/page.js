"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function TermsPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const sections = [
    {
      num: "01",
      title: "Registro y Cuenta de Casillero",
      content: "El registro en nuestra plataforma de casillero es gratuito. El usuario se compromete a ingresar información de contacto verídica, incluyendo nombre completo, número de cédula, teléfono y dirección física de entrega en Costa Rica. El mal uso de la cuenta puede ser causal de suspensión del servicio."
    },
    {
      num: "02",
      title: "Dirección de Envío y Prealertas",
      content: "El cliente debe enviar sus compras a cualquiera de las direcciones internacionales asignadas (Miami, China o Colombia) con su código de casillero único visible en la etiqueta del paquete. Es responsabilidad del cliente prealertar sus compras adjuntando la factura comercial correspondiente antes del ingreso de la mercancía a nuestras bodegas de origen."
    },
    {
      num: "03",
      title: "Cargos, Tarifas y Cálculo de Peso",
      content: "Las tarifas de flete internacional se calculan sobre el peso físico real de la mercancía en kilos. El costo final incluirá flete, trámites de nacionalización e impuestos correspondientes según lo dictado por el Ministerio de Hacienda de Costa Rica para entregar el paquete libre de cargos adicionales a tu domicilio."
    },
    {
      num: "04",
      title: "Mercancía Prohibida y Restricciones",
      content: "El cliente se compromete a no enviar mercancía de prohibición absoluta por leyes aduaneras nacionales e internacionales, incluyendo armas de fuego (reales, de juguete, balines o aire comprimido), drogas, explosivos o mercancía ilegal. Otros artículos de importación restringida pueden requerir trámites adicionales de nacionalización."
    },
    {
      num: "05",
      title: "Tiempos de Tránsito e Importación",
      content: "Nuestros tiempos de entrega habituales son de 5 a 7 días hábiles a partir de la llegada del paquete a nuestras bodegas de origen y tras contar con la factura comercial completa. Mundo Express no se responsabiliza por retrasos debidos a revisiones físicas aleatorias por parte de la Aduana de Costa Rica o huelgas de puertos/aeropuertos."
    },
    {
      num: "06",
      title: "Seguro y Límite de Responsabilidad",
      content: "Todos los paquetes despachados cuentan con cobertura de seguro contra pérdida total durante el tránsito internacional desde nuestras bodegas en origen (Miami, China o Colombia) hasta nuestras bodegas en Costa Rica, siempre y cuando se cuente con la factura comercial que demuestre el valor de la mercancía. La cobertura no aplica para paquetes mal embalados por el vendedor de origen."
    }
  ];

  return (
    <div className="app-container" style={{ background: "var(--bg-dark)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      
      <main style={{ flex: 1 }}>
        {/* Terms Hero */}
        <section className="terms-hero" style={{ padding: "10rem 2rem 4rem 2rem", textAlign: "center", position: "relative" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span style={{ color: "var(--primary)", border: "1px solid var(--primary)", padding: "0.5rem 1.5rem", borderRadius: "50px", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "2px" }}>
              Aspectos Legales
            </span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, textTransform: "uppercase", marginTop: "1.5rem", color: "var(--text-main)", letterSpacing: "-1px" }}>
              Términos de Servicio
            </h1>
            <p style={{ marginTop: "1.5rem", color: "var(--text-light)", fontSize: "1.2rem", lineHeight: 1.6 }}>
              Contrato de condiciones del servicio de casillero y transporte de mercancías de Mundo Express.
            </p>
          </div>
        </section>

        {/* Terms Content List */}
        <section style={{ padding: "2rem 2rem 8rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {sections.map((sec, idx) => (
              <motion.div
                key={idx}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  paddingBottom: "2.5rem"
                }}
              >
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <span style={{ 
                    fontSize: "1.3rem", 
                    fontWeight: 800, 
                    color: "var(--primary)",
                    background: "rgba(20, 177, 189, 0.1)",
                    padding: "0.5rem 0.8rem",
                    borderRadius: "8px",
                    lineHeight: 1
                  }}>
                    {sec.num}
                  </span>
                  <div>
                    <h3 style={{ color: "#FFFFFF", fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>
                      {sec.title}
                    </h3>
                    <p style={{ color: "var(--text-light)", lineHeight: "1.8", fontSize: "1.05rem" }}>
                      {sec.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
