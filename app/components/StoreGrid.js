"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const usaStores = [
  { name: "Amazon", url: "https://www.amazon.com", img: "/assets/Amazon.png" },
  { name: "Walmart", url: "https://www.walmart.com", img: "/assets/Walmart.png" },
  { name: "eBay", url: "https://www.ebay.com", img: "/assets/ebay.png" },
  { name: "Target", url: "https://www.target.com", img: "/assets/Target.png" },
  { name: "Best Buy", url: "https://www.bestbuy.com", img: "/assets/bestbuy.svg" },
  { name: "Apple", url: "https://www.apple.com", img: "/assets/Apple-Logo.png" },
  { name: "Nike", url: "https://www.nike.com", img: "/assets/Nike-Logo.png" },
  { name: "Adidas", url: "https://www.adidas.com", img: "/assets/Adidas_logo.png" },
  { name: "Sephora", url: "https://www.sephora.com", img: "/assets/Sephora-Logo.png" },
  { name: "Victoria's Secret", url: "https://www.victoriassecret.com", img: "/assets/Victoria-Secret-Logo.png" },
  { name: "The Home Depot", url: "https://www.homedepot.com", img: "/assets/the-home-depot.png" },
  { name: "Etsy", url: "https://www.etsy.com", img: "/assets/Etsy_logo.svg.png" },
  { name: "Costco", url: "https://www.costco.com", img: "/assets/Costco_Wholesale_logo_2010-10-26.svg.png" },
  { name: "Wayfair", url: "https://www.wayfair.com", img: "/assets/wayfair-logo-vector-free-download-11573939809tdwzvh3e6p.png" },
  { name: "Macy's", url: "https://www.macys.com", img: "/assets/macys-logo-png_seeklogo-504490.png" }
];

const chinaStores = [
  { name: "AliExpress", url: "https://www.aliexpress.com", img: "/assets/png-clipart-amazon-com-aliexpress-app-store-shopping-app-android-text-logo.png" },
  { name: "Temu", url: "https://www.temu.com", img: "/assets/Temu-Logo.png" },
  { name: "SHEIN", url: "https://www.shein.com", img: "/assets/logo-Shein.png" },
  { name: "JD.com (Jingdong)", url: "https://global.jd.com", img: "/assets/JD.com-logo.png" },
  { name: "Taobao", url: "https://www.taobao.com", img: "/assets/Taobao_Logo.svg.png" },
  { name: "Tmall", url: "https://www.tmall.com", img: "/assets/Logo-Tmall.png" },
  { name: "Pinduoduo", url: "https://www.pinduoduo.com", img: "/assets/pinduoduo-logo-png_seeklogo-385485.png" },
  { name: "1688.com", url: "https://www.1688.com", img: "/assets/1688-com-logo-png_seeklogo-318954.png" },
  { name: "DHgate", url: "https://www.dhgate.com", img: "/assets/563-5632091_dhgate-com-logo-png-transparent-png.png" },
  { name: "Banggood", url: "https://www.banggood.com", img: "/assets/png-transparent-banggood-logo-icons-logos-emojis-iconic-brands.png" }
];

export default function StoreGrid() {
  const [activeTab, setActiveTab] = useState('usa');
  const currentStores = activeTab === 'usa' ? usaStores : chinaStores;

  return (
    <section style={{ padding: "8rem 2rem", background: "#FFFFFF", color: "var(--bg-dark)", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Title Block */}
        <span style={{ color: "var(--primary)", border: "1px solid var(--primary)", padding: "0.5rem 2rem", borderRadius: "50px", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px", fontWeight: 600 }}>
          Directorio
        </span>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", marginTop: "2rem", letterSpacing: "-1px" }}>
          ¿DÓNDE COMPRAR?
        </h2>
        <p style={{ color: "var(--dark-gray)", fontSize: "1.1rem", marginTop: "1rem", marginBottom: "4rem", maxWidth: "600px", marginInline: "auto" }}>
          Explore las principales tiendas recomendadas en Estados Unidos y China para realizar sus compras de forma segura.
        </p>

        {/* Dynamic Segmented Switcher */}
        <div style={{ 
          display: "inline-flex", 
          padding: "6px", 
          background: "rgba(68, 68, 68, 0.05)", 
          borderRadius: "16px",
          border: "1px solid rgba(68, 68, 68, 0.08)",
          position: "relative",
          marginBottom: "4rem"
        }}>
          {/* Animated Sliding Pill */}
          <motion.div 
            style={{
              position: "absolute",
              top: "6px",
              left: activeTab === 'usa' ? "6px" : "calc(50% + 2px)",
              width: "calc(50% - 8px)",
              height: "calc(100% - 12px)",
              background: "var(--primary)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(20, 177, 189, 0.3)",
              zIndex: 1
            }}
            layout
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />

          <button 
            onClick={() => setActiveTab('usa')}
            style={{
              padding: "0.8rem 2.5rem",
              fontSize: "1rem",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
              borderRadius: "12px",
              background: "transparent",
              color: activeTab === 'usa' ? "white" : "var(--dark-gray)",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "color 0.2s ease"
            }}
          >
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>🇺🇸</span>
            <span>Estados Unidos</span>
          </button>
          <button 
            onClick={() => setActiveTab('china')}
            style={{
              padding: "0.8rem 2.5rem",
              fontSize: "1rem",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
              borderRadius: "12px",
              background: "transparent",
              color: activeTab === 'china' ? "white" : "var(--dark-gray)",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "color 0.2s ease"
            }}
          >
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>🇨🇳</span>
            <span>China</span>
          </button>
        </div>

        {/* Directory Grid of Logos */}
        <motion.div 
          layout
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
            gap: "1.5rem",
            justifyContent: "center"
          }}
        >
          <AnimatePresence mode="popLayout">
            {currentStores.map((store) => (
              <motion.a 
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.25 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 12px 24px rgba(0,0,0,0.06)", 
                  borderColor: "var(--primary)" 
                }}
                style={{
                  border: "1px solid rgba(68, 68, 68, 0.08)",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  background: "#FFFFFF",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  aspectRatio: "1.6 / 1",
                  overflow: "hidden"
                }}
                title={store.name}
              >
                <img 
                  src={store.img} 
                  alt={store.name} 
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                />
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
