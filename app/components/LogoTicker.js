"use client";

import React, { useEffect, useState } from 'react';

const logos = [
  { name: "DHL", img: "/assets/DHL.png" },
  { name: "SF Express", img: "/assets/SFexpress.png", style: { transform: "scale(1.25)" } },
  { name: "FedEx", img: "/assets/FedEx-Logo.png" },
  { name: "Cainiao Network", img: "/assets/Cainiao.png" },
  { name: "UPS", img: "/assets/UPS-logo.png" },
  { name: "ZTO Express", img: "/assets/ZTO.png" },
  { name: "Maersk", img: "/assets/Maersk_Group_Logo.svg.png" },
  { name: "YTO Express", img: "/assets/YTOEXPRESS.png" },
  { name: "CMA CGM", img: "/assets/cma.png" },
  { name: "J&T Express", img: "/assets/JT-Express-Logo.png" },
  { name: "Hapag-Lloyd", img: "/assets/hapag-lloyd.png" },
  { name: "COSCO Shipping", img: "/assets/COSCO.png" },
  { name: "MSC", img: "/assets/msc-logo.png" },
  { name: "OOCL", img: "/assets/OOCL.png", style: { transform: "scale(1.25)" } },
  { name: "China Merchants Shipping", img: "/assets/China_Merchants_Group.png" },
  { name: "Veho", img: "/assets/veho.png" },
  { name: "USPS", img: "/assets/USPS.webp" },
  { name: "YunExpress", img: "/assets/yunexpress.png" },
  { name: "GOFO Express", img: "/assets/gofo.png", style: { transform: "scale(1.25)" } }
];


export default function LogoTicker() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Duplicate logos list for a seamless continuous scrolling effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="logo-ticker-section" style={{ padding: "4rem 0", backgroundColor: "white", borderTop: "1px solid rgba(68, 68, 68, 0.08)", borderBottom: "1px solid rgba(68, 68, 68, 0.08)", overflow: "hidden" }}>
      <div className="ticker-container" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <p style={{ textAlign: "center", color: "var(--dark-gray)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "3rem", fontSize: "0.85rem" }}>
          Confían en nuestra red logística
        </p>
        
        <div className="marquee-container">
          <div className="marquee-track">
            {duplicatedLogos.map((logo, idx) => (
              <div className="marquee-item" key={idx} style={{ minWidth: "260px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img 
                  src={logo.img} 
                  alt={logo.name} 
                  style={{
                    height: "65px",
                    width: "auto",
                    maxWidth: "220px",
                    objectFit: "contain",
                    ...logo.style
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

