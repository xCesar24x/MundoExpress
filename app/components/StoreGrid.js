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
  { name: "Carter's", url: "https://www.carters.com", img: "/assets/carters.png", style: { transform: "scale(1.35)" } },
  { name: "Fashion Nova", url: "https://www.fashionnova.com", img: "/assets/Fashion-Nova-Logo.png" },
  { name: "Sears", url: "https://www.sears.com", img: "/assets/sears-logo.png" },
  { name: "MAC Cosmetics", url: "https://www.maccosmetics.com", img: "/assets/mac-cosmetics-logo.png" },
  { name: "New Balance", url: "https://www.newbalance.com", img: "/assets/new-balance-logo.png" },
  { name: "The North Face", url: "https://www.thenorthface.com", img: "/assets/north-face-logo.png" }
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

// ─── Marquee helpers ──────────────────────────────────────────────────────────

function MarqueeTrack({ items, direction, speed }) {
  const doubled = [...items, ...items];
  const animFrom = direction === "left" ? "0%" : "-50%";
  const animTo   = direction === "left" ? "-50%" : "0%";

  return (
    <div style={{ overflowX: "clip", overflowY: "visible", width: "100%", position: "relative", paddingTop: "8px", paddingBottom: "8px" }}>
      {/* Left fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "80px", height: "100%",
        background: "linear-gradient(to right, #ffffff, transparent)",
        zIndex: 2, pointerEvents: "none"
      }} />
      {/* Right fade */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "80px", height: "100%",
        background: "linear-gradient(to left, #ffffff, transparent)",
        zIndex: 2, pointerEvents: "none"
      }} />

      <motion.div
        style={{ display: "flex", gap: "1.5rem", width: "max-content" }}
        animate={{ x: [animFrom, animTo] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((store, i) => (
          <a
            key={`${store.name}-${i}`}
            href={store.url}
            className="storegrid-marquee-item"
            target="_blank"
            rel="noopener noreferrer"
            title={store.name}
            style={{
              border: "1px solid rgba(68, 68, 68, 0.08)",
              borderRadius: "16px",
              padding: "1.2rem 1.8rem",
              background: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "200px",
              height: "110px",
              flexShrink: 0,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.transform = "translateY(-4px) scale(1.04)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
              e.currentTarget.style.borderColor = "rgba(68, 68, 68, 0.08)";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            <img
              src={store.img}
              alt={store.name}
              style={{ width: "100%", height: "100%", objectFit: "contain", ...(store.style || {}) }}
            />
          </a>
        ))}
      </motion.div>
    </div>
  );
}

function MarqueeRows({ stores }) {
  const third = Math.ceil(stores.length / 3);
  const row1 = stores.slice(0, third);
  const row2 = stores.slice(third, third * 2);
  const row3 = stores.slice(third * 2);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", overflow: "hidden" }}>
      <MarqueeTrack items={row1} direction="left"  speed={33} />
      <MarqueeTrack items={row2} direction="right" speed={38} />
      <MarqueeTrack items={row3} direction="left"  speed={35} />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StoreGrid() {
  const [activeTab, setActiveTab] = useState('usa');
  const currentStores = activeTab === 'usa' ? usaStores : activeTab === 'china' ? chinaStores : colombiaStores;

  return (
    <section style={{ padding: "8rem 2rem", background: "#FFFFFF", color: "var(--bg-dark)", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

        {/* Mascot */}
        <motion.img 
          src="/assets/mascota/POSE 1.png"
          alt="Mascota Mundo Express"
          className="storegrid-mascot"
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -6, rotate: 2, transition: { duration: 0.2 } }}
        />

        {/* Title */}
        <span style={{ color: "var(--primary)", border: "1px solid var(--primary)", padding: "0.5rem 2rem", borderRadius: "50px", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px", fontWeight: 600 }}>
          Directorio
        </span>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", marginTop: "2rem", letterSpacing: "-1px", color: "var(--primary)" }}>
          ¿DÓNDE COMPRAR?
        </h2>
        <p style={{ color: "var(--dark-gray)", fontSize: "1.1rem", marginTop: "1rem", marginBottom: "4rem", maxWidth: "600px", marginInline: "auto" }}>
          Explore las principales tiendas recomendadas en Estados Unidos, China y Colombia para realizar sus compras de forma segura.
        </p>

        {/* Country Switcher */}
        <div className="storegrid-tabs" style={{
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
          {/* Sliding pill */}
          <motion.div
            style={{
              position: "absolute",
              top: "6px",
              left: activeTab === 'usa' ? "6px" : activeTab === 'china' ? "calc(33.33% + 2px)" : "calc(66.66% - 2px)",
              width: "calc(33.33% - 4px)",
              height: "calc(100% - 12px)",
              background: activeTab === 'usa'
                ? "linear-gradient(135deg, #002868 0%, #bf0a30 100%)"
                : activeTab === 'china'
                ? "linear-gradient(135deg, #de2910 0%, #de2910 75%, #ffde00 100%)"
                : "linear-gradient(135deg, #fcd116 0%, #003893 50%, #ce1126 100%)",
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
            { id: 'usa',      name: 'Estados Unidos', flag: '/assets/flag-usa.avif' },
            { id: 'china',    name: 'China',          flag: '/assets/flag-china.avif' },
            { id: 'colombia', name: 'Colombia',       flag: '/assets/flag-colombia.jpg' }
          ].map((tab) => {
            const on = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className="storegrid-tab-btn"
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
                <div style={{
                  width: "28px", height: "18px", borderRadius: "4px", overflow: "hidden",
                  border: on ? "1px solid rgba(255,255,255,0.8)" : "1px solid rgba(68,68,68,0.15)",
                  transition: "transform 0.2s, border-color 0.18s",
                  transform: on ? "scale(1.1)" : "scale(1)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
                }}>
                  <img src={tab.flag} alt={tab.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Three-Row Infinite Marquee */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <MarqueeRows stores={currentStores} />
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
