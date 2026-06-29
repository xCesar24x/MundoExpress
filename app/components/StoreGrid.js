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
  { name: "Macy's", url: "https://www.macys.com", img: "/assets/macys-logo-png_seeklogo-504490.png" },
  { name: "Marshalls", url: "https://www.marshalls.com", img: "/assets/Marshall-Logo.png" },
  { name: "Shop Premium Outlets", url: "https://shoppremiumoutlets.com", img: "/assets/Simon_Logo.png" },
  { name: "Joe's New Balance Outlet", url: "https://www.joesnewbalanceoutlet.com", img: "/assets/joes-outlet.png" },
  { name: "RockAuto", url: "https://www.rockauto.com", img: "/assets/rockauto.png" },
  { name: "Carter's", url: "https://www.carters.com", img: "/assets/carters.png", style: { transform: "scale(1.35)" } }
];


const chinaStores = [
  { name: "AliExpress", url: "https://www.aliexpress.com", img: "/assets/png-clipart-amazon-com-aliexpress-app-store-shopping-app-android-text-logo.png" },
  { name: "Temu", url: "https://www.temu.com", img: "/assets/Temu-Logo.png" },
  { name: "SHEIN", url: "https://www.shein.com", img: "/assets/logo-Shein.png" },
  { name: "JD.com (Jingdong)", url: "https://global.jd.com", img: "/assets/JD.com-logo.png" },
  { name: "Alibaba.com", url: "https://www.alibaba.com", img: "/assets/alibabagroup.png" },
  { name: "Taobao", url: "https://www.taobao.com", img: "/assets/Taobao_Logo.svg.png" },
  { name: "Tmall", url: "https://www.tmall.com", img: "/assets/Logo-Tmall.png" },
  { name: "Pinduoduo", url: "https://www.pinduoduo.com", img: "/assets/pinduoduo-logo-png_seeklogo-385485.png" },
  { name: "1688.com", url: "https://www.1688.com", img: "/assets/1688-com-logo-png_seeklogo-318954.png" },
  { name: "DHgate", url: "https://www.dhgate.com", img: "/assets/563-5632091_dhgate-com-logo-png-transparent-png.png" },
  { name: "Banggood", url: "https://www.banggood.com", img: "/assets/png-transparent-banggood-logo-icons-logos-emojis-iconic-brands.png" },
  { name: "Gearbest", url: "https://www.gearbest.com", img: "/assets/Gearbest-Logo.png" },
  { name: "LightInTheBox", url: "https://www.lightinthebox.com", img: "/assets/png-transparent-light-in-the-box-logo.png" },
  { name: "Made-in-China.com", url: "https://www.made-in-china.com", img: "/assets/madeinchina.png" },
  { name: "Zaful", url: "https://www.zaful.com", img: "/assets/png-transparent-zaful-logo.png" },
  { name: "Weidian", url: "https://www.weidian.com", img: "/assets/Weidian-logo.png" },
  { name: "Vipshop", url: "https://www.vip.com", img: "/assets/VIP.png" },
  { name: "Xiaomi Youpin", url: "https://www.xiaomiyoupin.com", img: "/assets/Xiaomi.png" },
  { name: "Dangdang", url: "https://www.dangdang.com", img: "/assets/dangdang.png" },
  { name: "Suning", url: "https://www.suning.com", img: "/assets/suning.png" }
];

const colombiaStores = [
  { name: "Mercado Libre", url: "https://www.mercadolibre.com.co", img: "/assets/424-4241106_mercadolibre-logo-de-mercado-libre-hd-png-download.png" },
  { name: "Éxito", url: "https://www.exito.com", img: "/assets/Almacenes_exito_logo.svg.png" },
  { name: "Falabella", url: "https://www.falabella.com.co", img: "/assets/Falabella.svg.png" },
  { name: "Alkosto", url: "https://www.alkosto.com", img: "/assets/2016Alkosto.webp" },
  { name: "Olímpica", url: "https://www.olimpica.com", img: "/assets/Olimpical.png" },
  { name: "Arturo Calle", url: "https://www.arturocalle.com", img: "/assets/Arturo_Calle_logo.svg.png" },
  { name: "Totto", url: "https://co.totto.com", img: "/assets/Totto.png" },
  { name: "Studio F", url: "https://www.studiof.com.co", img: "/assets/png-transparent-mazda-studio-f-clothing-fashion-shoe-mazda-text-fashion-logo.png" },
  { name: "Vélez", url: "https://www.velez.com.co", img: "/assets/velez-logo-png_seeklogo-460133.png" },
  { name: "Koaj", url: "https://www.koaj.co", img: "/assets/koaj-logo-300x300.png" },
  { name: "Gef", url: "https://www.gef.co", img: "/assets/GEF-1.png" },
  { name: "Leonisa", url: "https://www.leonisa.com/co/", img: "/assets/hisotria-leonisa.webp" },
  { name: "Homecenter", url: "https://www.homecenter.com.co", img: "/assets/sodimac-homecenter-logo-0.png" },
  { name: "Ktronix", url: "https://www.ktronix.com", img: "/assets/ktronix.png" },
  { name: "Panamericana", url: "https://www.panamericana.com.co", img: "/assets/panamericana.png" },
  { name: "iShop Colombia", url: "https://tiendasishop.com/co/", img: "/assets/0-ISHOP-1.png" },
  { name: "Pepe Ganga", url: "https://www.pepeganga.com", img: "/assets/pepeganga.png" },
  { name: "Decathlon", url: "https://www.decathlon.com.co", img: "/assets/decathlon.png" },
  { name: "Farmatodo", url: "https://www.farmatodo.com.co", img: "/assets/farmatodo-logo-png_seeklogo-391009.png" },
  { name: "Cromantic", url: "https://www.cromantic.com", img: "/assets/cromantic.png" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.4, y: 40, rotateX: -60 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    rotateX: 0,
    transition: { type: "spring", stiffness: 280, damping: 20 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: -20, 
    rotateX: 45,
    transition: { duration: 0.2 }
  }
};

export default function StoreGrid() {
  const [activeTab, setActiveTab] = useState('usa');
  const currentStores = activeTab === 'usa' ? usaStores : activeTab === 'china' ? chinaStores : colombiaStores;

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
          Explore las principales tiendas recomendadas en Estados Unidos, China y Colombia para realizar sus compras de forma segura.
        </p>

        {/* Dynamic Segmented Switcher */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)",
          padding: "6px", 
          background: "rgba(68, 68, 68, 0.05)", 
          borderRadius: "16px",
          border: "1px solid rgba(68, 68, 68, 0.08)",
          position: "relative",
          marginBottom: "4rem",
          width: "100%",
          maxWidth: "620px",
          marginInline: "auto"
        }}>
          {/* Animated Sliding Pill */}
          <motion.div 
            style={{
              position: "absolute",
              top: "6px",
              left: activeTab === 'usa' ? "6px" : activeTab === 'china' ? "calc(33.33% + 2px)" : "calc(66.66% - 2px)",
              width: "calc(33.33% - 4px)",
              height: "calc(100% - 12px)",
              background: activeTab === 'usa' 
                ? "linear-gradient(135deg, #002868 0%, #bf0a30 100%)" // USA: Exact Blue & Red
                : activeTab === 'china'
                ? "linear-gradient(135deg, #de2910 0%, #de2910 75%, #ffde00 100%)" // China: Mostly Red with Yellow end
                : "linear-gradient(135deg, #fcd116 0%, #003893 50%, #ce1126 100%)", // Colombia: Exact Yellow, Blue, Red
              borderRadius: "12px",
              boxShadow: activeTab === 'usa'
                ? "0 4px 12px rgba(0, 40, 104, 0.3)"
                : activeTab === 'china'
                ? "0 4px 12px rgba(222, 41, 16, 0.3)"
                : "0 4px 12px rgba(252, 209, 22, 0.3)",
              zIndex: 1
            }}
            layout
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />

          {[
            { id: 'usa', code: 'US', name: 'Estados Unidos' },
            { id: 'china', code: 'CN', name: 'China' },
            { id: 'colombia', code: 'CO', name: 'Colombia' }
          ].map((tab) => {
            const on = activeTab === tab.id;
            const badgeBg = tab.id === 'usa'
              ? "linear-gradient(90deg, #002868 0%, #FFFFFF 50%, #BF0A30 100%)"
              : tab.id === 'china'
              ? "linear-gradient(90deg, #DE2910 0%, #FFDE00 100%)"
              : "linear-gradient(90deg, #FCD116 0%, #003893 50%, #CE1126 100%)";

            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "0.8rem 0",
                  width: "100%",
                  fontSize: "1rem",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "12px",
                  background: "transparent",
                  color: on ? "white" : "var(--dark-gray)",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.8rem",
                  transition: "color 0.2s ease"
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    lineHeight: 1.4,
                    padding: "2px 6px",
                    borderRadius: 5,
                    background: badgeBg,
                    border: on ? "1px solid rgba(255,255,255,0.8)" : "1px solid rgba(68, 68, 68, 0.15)",
                    color: "white",
                    textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                    transition: "border-color .18s, transform 0.2s",
                    transform: on ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {tab.code}
                </span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Directory Grid of Logos */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
              gap: "1.5rem",
              justifyContent: "center",
              perspective: "1000px"
            }}
          >
            {currentStores.map((store) => (
              <motion.a 
                key={store.name}
                variants={itemVariants}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  y: -5,
                  scale: 1.05,
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
                    objectFit: "contain",
                    ...store.style
                  }}
                />
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
