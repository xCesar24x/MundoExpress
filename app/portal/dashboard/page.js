"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc,
  setDoc
} from 'firebase/firestore';

export default function PortalDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tablero");
  const [addrTab, setAddrTab] = useState("usa");
  const [copiedField, setCopiedField] = useState("");
  
  // Real database states
  const [profile, setProfile] = useState({
    name: "",
    lastName: "",
    email: "",
    idCard: "",
    phone: "",
    exactAddress: "",
    lockerId: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [packages, setPackages] = useState([]);
  const [unknownPackages, setUnknownPackages] = useState([]);
  const [invoices, setInvoices] = useState([]);
  
  // Claim Package Modal State
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedClaimPackage, setSelectedClaimPackage] = useState(null);
  const [claimInvoiceFile, setClaimInvoiceFile] = useState(null);
  const [claimDescription, setClaimDescription] = useState("");

  // Edit Account State
  const [editName, setEditName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        localStorage.removeItem("userLoggedIn");
        router.push("/portal/login");
        return;
      }
      
      setCurrentUser(user);
      
      // 1. Fetch user profile document
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setProfile(data);
        setEditName(data.name || "");
        setEditLastName(data.lastName || "");
        setEditPhone(data.phone || "");
        setEditAddress(data.exactAddress || data.address || "");
      } else {
        // Fallback profile if user was created without doc
        const fallbackProfile = {
          name: "Cliente",
          lastName: "Nuevo",
          email: user.email || "",
          idCard: "100000000",
          phone: "80000000",
          exactAddress: "Heredia Centro",
          lockerId: "ME" + String(Math.floor(100000 + Math.random() * 900000))
        };
        await setDoc(userDocRef, fallbackProfile);
        setProfile(fallbackProfile);
        setEditName(fallbackProfile.name);
        setEditLastName(fallbackProfile.lastName);
        setEditPhone(fallbackProfile.phone);
        setEditAddress(fallbackProfile.exactAddress);
      }

      // 2. Real-time packages snapshot
      const pkgsUnsubscribe = onSnapshot(collection(db, `users/${user.uid}/packages`), (snapshot) => {
        const pkgsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPackages(pkgsList);
      });

      // 3. Real-time invoices snapshot
      const invsUnsubscribe = onSnapshot(collection(db, `users/${user.uid}/invoices`), (snapshot) => {
        const invsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInvoices(invsList);
      });

      // 4. Real-time unknown packages snapshot
      const unknownPkgsUnsubscribe = onSnapshot(collection(db, "unknown_packages"), async (snapshot) => {
        const unknownList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Seed if empty
        if (unknownList.length === 0) {
          const defaultUnknowns = [
            { trackingNumber: "TRK88273619P", weight: "1.5 lbs", date: new Date().toLocaleDateString('es-CR') },
            { trackingNumber: "TRK66251829D", weight: "4.2 lbs", date: new Date().toLocaleDateString('es-CR') },
            { trackingNumber: "TRK11029388Q", weight: "0.5 lbs", date: new Date().toLocaleDateString('es-CR') }
          ];
          for (const item of defaultUnknowns) {
            await addDoc(collection(db, "unknown_packages"), item);
          }
        } else {
          setUnknownPackages(unknownList);
        }
      });

      setLoading(false);

      return () => {
        pkgsUnsubscribe();
        invsUnsubscribe();
        unknownPkgsUnsubscribe();
      };
    });

    return () => unsubscribe();
  }, [router]);

  const getAddresses = () => {
    const fullName = `${profile.name || ""} ${profile.lastName || ""}`;
    return {
      usa: [
        { label: "Nombre / Consignatario", value: `Mundo Express / ${fullName}`, id: "usa_name" },
        { label: "Dirección / Address Line 1", value: "11350 NW 25th St", id: "usa_addr" },
        { label: "Dirección 2 / Address Line 2 (Suite - Apartment)", value: "Ste 100", id: "usa_suite" },
        { label: "Casillero / Referencia", value: profile.lockerId || "", id: "usa_ref" },
        { label: "Ciudad / City", value: "Doral", id: "usa_city" },
        { label: "Estado / State", value: "Florida", id: "usa_state" },
        { label: "Código Postal / Zip Code", value: "33172", id: "usa_zip" },
        { label: "País / Country", value: "Estados Unidos", id: "usa_country" },
        { label: "Teléfono / Phone", value: "+1 (305) 477-5508", id: "usa_phone" }
      ],
      china: [
        { label: "Nombre / Consignatario", value: `Mundo Express / ${fullName}`, id: "c_name" },
        { label: "Dirección (Chino)", value: "广东省佛山市南海区横二路6号 聚润创意园", id: "c_addr_cn" },
        { label: "Dirección (Inglés)", value: "No.6, Heng Er Road, Nanhai District, Foshan City, Guangdong Province", id: "c_addr_en" },
        { label: "Casillero / Referencia", value: profile.lockerId || "", id: "c_ref" },
        { label: "Ciudad", value: "Foshan", id: "c_city" },
        { label: "Provincia", value: "Guangdong", id: "c_prov" },
        { label: "Código Postal", value: "528244", id: "c_zip" },
        { label: "País", value: "China", id: "c_country" },
        { label: "Teléfono", value: "+86 138 0013 8000", id: "c_phone" }
      ],
      colombia: [
        { label: "Nombre / Name", value: "Mundo", id: "co_name" },
        { label: "Apellido / Last Name", value: `Express / ${fullName}`, id: "co_lastname" },
        { label: "Dirección / Address Line 1", value: "CRA 46D #75 sur - 47, Aguas Claras 2 apto 214", id: "co_addr" },
        { label: "Dirección 2 / Suite / Lock Number", value: profile.lockerId || "", id: "co_suite" },
        { label: "Estado / Departamento", value: "Antioquia", id: "co_state" },
        { label: "Ciudad / City", value: "Sabaneta", id: "co_city" },
        { label: "Código Postal / Zip Code", value: "055450", id: "co_zip" },
        { label: "País / Country", value: "Colombia", id: "co_country" },
        { label: "Teléfono / Phone", value: "+57 315-148-5719", id: "co_phone" }
      ]
    };
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userLoggedIn");
    router.push("/portal/login");
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        name: editName,
        lastName: editLastName,
        phone: editPhone,
        exactAddress: editAddress
      });
      setProfile(prev => ({
        ...prev,
        name: editName,
        lastName: editLastName,
        phone: editPhone,
        exactAddress: editAddress
      }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Error al guardar perfil.");
    }
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClaimPackage || !currentUser) return;
    
    try {
      const newPackage = {
        trackingNumber: selectedClaimPackage.trackingNumber,
        store: claimDescription || "Tienda Desconocida",
        content: "Paquete Reclamado (En Proceso)",
        weight: selectedClaimPackage.weight,
        status: "En Aduanas",
        date: new Date().toLocaleDateString('es-CR'),
        price: 0
      };
      // Add package to users list in Firestore
      await addDoc(collection(db, `users/${currentUser.uid}/packages`), newPackage);
      
      // Delete package from global unknown_packages list in Firestore
      await deleteDoc(doc(db, "unknown_packages", selectedClaimPackage.id));
      
      setIsClaimModalOpen(false);
      setSelectedClaimPackage(null);
      setClaimDescription("");
      setClaimInvoiceFile(null);
      
      alert("¡Paquete reclamado con éxito! Se ha añadido a tu lista de trackings y nuestro equipo de aduanas lo está procesando.");
    } catch (err) {
      console.error(err);
      alert("Error al reclamar paquete.");
    }
  };

  // Filter packages based on search query
  const filteredPackages = packages.filter(p => 
    (p.trackingNumber || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.store || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.content || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get active packets count
  const activePackagesCount = packages.filter(p => p.status !== "Entregado").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "En Tránsito a CR": return "#f59e0b"; // Yellow/Orange
      case "En Aduanas": return "#ef4444"; // Red
      case "Listo para Entrega": return "#10b981"; // Green
      case "Entregado": return "#6b7280"; // Gray
      default: return "var(--primary)";
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#080808",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-sans, system-ui, sans-serif)"
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "4px solid rgba(20, 177, 189, 0.1)",
            borderTopColor: "var(--primary)"
          }}
        />
        <p style={{ marginTop: "1rem", color: "var(--text-light)", fontSize: "0.9rem" }}>Cargando panel de casillero...</p>
      </div>
    );
  }

  const getInitials = () => {
    const f = profile.name ? profile.name.charAt(0).toUpperCase() : "";
    const l = profile.lastName ? profile.lastName.charAt(0).toUpperCase() : "";
    return `${f}${l}` || "U";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      color: "#ffffff",
      fontFamily: "var(--font-sans, system-ui, sans-serif)",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Top Navbar */}
      <header style={{
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src="/assets/Logo.png" alt="Mundo Express" style={{ height: "35px" }} />
          <span style={{ 
            fontSize: "0.8rem", 
            background: "rgba(20, 177, 189, 0.1)", 
            color: "var(--primary)", 
            padding: "0.25rem 0.75rem", 
            borderRadius: "50px", 
            fontWeight: "700",
            border: "1px solid rgba(20, 177, 189, 0.2)"
          }}>
            PORTAL CLIENTES
          </span>
        </div>

        {/* User Info & Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ textAlign: "right", display: "none", md: "block" }}>
            <div style={{ fontWeight: "700", fontSize: "0.95rem" }}>{profile.name} {profile.lastName}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "600" }}>Casillero: {profile.lockerId}</div>
          </div>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--primary) 0%, #108d98 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            color: "white",
            fontSize: "1rem",
            boxShadow: "0 0 12px rgba(20, 177, 189, 0.3)"
          }}>
            {getInitials()}
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        position: "relative"
      }} className="portal-layout">
        
        {/* Navigation Sidebar */}
        <aside style={{
          width: "260px",
          background: "rgba(10, 10, 10, 0.5)",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "2rem 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }} className="portal-sidebar">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { id: "tablero", label: "🏠 Tablero" },
              { id: "paquetes", label: "📦 Mis Paquetes" },
              { id: "direccion", label: "📍 Direcciones de Envío" },
              { id: "desconocidos", label: "❓ Reclamar Paquetes" },
              { id: "facturas", label: "💵 Mis Facturas" },
              { id: "cuenta", label: "👤 Mi Cuenta" }
            ].map((tab) => {
              const on = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "0.9rem 1.2rem",
                    textAlign: "left",
                    background: on ? "rgba(20, 177, 189, 0.08)" : "transparent",
                    color: on ? "var(--primary)" : "var(--text-light)",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: on ? "700" : "500",
                    transition: "all 0.25s",
                    borderLeft: on ? "3px solid var(--primary)" : "3px solid transparent"
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "0.9rem 1.2rem",
              textAlign: "left",
              background: "transparent",
              color: "#ef4444",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: "600",
              marginTop: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            🚪 Salir de Sesión
          </button>
        </aside>

        {/* Content Panel */}
        <main style={{
          flex: 1,
          padding: "3rem",
          maxWidth: "1140px",
          margin: "0 auto",
          width: "100%",
          overflowY: "auto"
        }} className="portal-main">
          
          <AnimatePresence mode="wait">
            
            {/* Tab: TABLERO */}
            {activeTab === "tablero" && (
              <motion.div
                key="tablero"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: "2.5rem" }}>
                  <h1 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-1px" }}>Mi Casillero</h1>
                  <p style={{ color: "var(--text-light)", marginTop: "0.25rem" }}>Rastrea y gestiona tus paquetes fácilmente.</p>
                </div>

                {/* Dashboard Metrics Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-light)", fontWeight: "600", textTransform: "uppercase" }}>MIS PAQUETES</div>
                      <div style={{ fontSize: "2rem", fontWeight: "800", marginTop: "0.5rem" }}>{packages.length}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--primary)", marginTop: "0.25rem", cursor: "pointer", fontWeight: "600" }} onClick={() => setActiveTab("paquetes")}>Ver historial →</div>
                    </div>
                    <div style={{ fontSize: "2.5rem" }}>📦</div>
                  </div>

                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderLeft: "4px solid var(--orange)"
                  }}>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-light)", fontWeight: "600", textTransform: "uppercase" }}>LISTOS PARA RETIRAR</div>
                      <div style={{ fontSize: "2rem", fontWeight: "800", marginTop: "0.5rem" }}>
                        {packages.filter(p => p.status === "Listo para Entrega").length}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "0.25rem" }}>¡Ponte en contacto!</div>
                    </div>
                    <div style={{ fontSize: "2.5rem" }}>🏪</div>
                  </div>

                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-light)", fontWeight: "600", textTransform: "uppercase" }}>PAQUETES SIN IDENTIFICAR</div>
                      <div style={{ fontSize: "2rem", fontWeight: "800", marginTop: "0.5rem" }}>{unknownPackages.length}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--primary)", marginTop: "0.25rem", cursor: "pointer", fontWeight: "600" }} onClick={() => setActiveTab("desconocidos")}>Reclamar ahora →</div>
                    </div>
                    <div style={{ fontSize: "2.5rem" }}>❓</div>
                  </div>

                  <a 
                    href="https://wa.me/50670511239" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "16px",
                      padding: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textDecoration: "none",
                      color: "white",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(20, 177, 189, 0.05)";
                      e.currentTarget.style.borderColor = "rgba(20, 177, 189, 0.2)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-light)", fontWeight: "600", textTransform: "uppercase" }}>SOPORTE</div>
                      <div style={{ fontSize: "2rem", fontWeight: "800", marginTop: "0.5rem", color: "#25D366" }}>WhatsApp</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "0.25rem" }}>Contactar asesor</div>
                    </div>
                    <div style={{ fontSize: "2.5rem" }}>💬</div>
                  </a>
                </div>

                {/* Quick Locker Card */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(20, 177, 189, 0.05) 0%, rgba(20, 177, 189, 0) 100%)",
                  border: "1px solid rgba(20, 177, 189, 0.15)",
                  borderRadius: "20px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  marginBottom: "2rem"
                }}>
                  <div>
                    <h2 style={{ fontSize: "1.35rem", fontWeight: "800" }}>🔐 Tu Casillero Asignado</h2>
                    <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginTop: "0.25rem" }}>Usa esta información para tus compras en tiendas online.</p>
                  </div>

                  <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                    <div>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>ID CASILLERO</span>
                      <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--primary)", marginTop: "0.25rem" }}>{profile.lockerId}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>DIRECCIÓN DE ENTREGA (MIAMI)</span>
                      <div style={{ fontSize: "1rem", fontWeight: "700", marginTop: "0.25rem" }}>11350 NW 25th ST, Suite 100, {profile.lockerId}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("direccion")}
                    style={{
                      alignSelf: "flex-start",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                      padding: "0.6rem 1.2rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  >
                    Ver Direcciones de Envío →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Tab: MIS PAQUETES */}
            {activeTab === "paquetes" && (
              <motion.div
                key="paquetes"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: "2.5rem" }}>
                  <h1 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-1px" }}>Mis Paquetes</h1>
                  <p style={{ color: "var(--text-light)", marginTop: "0.25rem" }}>Lista completa y estado de tus importaciones activas e históricas.</p>
                </div>

                {/* Search box */}
                <div style={{ marginBottom: "2rem" }}>
                  <input
                    type="text"
                    placeholder="Buscar por tracking, tienda o contenido..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      maxWidth: "480px",
                      padding: "0.8rem 1.2rem",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      fontSize: "0.95rem",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Packages Table / Grid */}
                {filteredPackages.length > 0 ? (
                  <div style={{
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "16px",
                    overflow: "hidden"
                  }}>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                          <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>CONTENIDO</th>
                            <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>TRACKING</th>
                            <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>TIENDA</th>
                            <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>PESO</th>
                            <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>ESTADO</th>
                            <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>FECHA</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPackages.map((pkg) => (
                            <tr key={pkg.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                              <td style={{ padding: "1.2rem 1.5rem", fontWeight: "700" }}>{pkg.content}</td>
                              <td style={{ padding: "1.2rem 1.5rem", fontFamily: "monospace", color: "var(--text-light)", fontSize: "0.9rem" }}>{pkg.trackingNumber}</td>
                              <td style={{ padding: "1.2rem 1.5rem" }}>{pkg.store}</td>
                              <td style={{ padding: "1.2rem 1.5rem" }}>{pkg.weight}</td>
                              <td style={{ padding: "1.2rem 1.5rem" }}>
                                <span style={{
                                  background: `${getStatusColor(pkg.status)}15`,
                                  color: getStatusColor(pkg.status),
                                  border: `1px solid ${getStatusColor(pkg.status)}30`,
                                  padding: "0.25rem 0.75rem",
                                  borderRadius: "50px",
                                  fontSize: "0.8rem",
                                  fontWeight: "700"
                                }}>
                                  {pkg.status}
                                </span>
                              </td>
                              <td style={{ padding: "1.2rem 1.5rem", color: "var(--text-light)", fontSize: "0.9rem" }}>{pkg.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "4rem 2rem", background: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "16px" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>No se encontraron paquetes</h3>
                    <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginTop: "0.25rem" }}>Prueba modificando tus términos de búsqueda.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab: DIRECCIÓN DE ENVÍO */}
            {activeTab === "direccion" && (
              <motion.div
                key="direccion"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: "2.5rem" }}>
                  <h1 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-1px" }}>Direcciones de Envío</h1>
                  <p style={{ color: "var(--text-light)", marginTop: "0.25rem" }}>Completa los datos de envío en tus tiendas online usando tus direcciones autorizadas.</p>
                </div>

                {/* Country selector tabs inside shipping section */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  padding: "4px",
                  background: "rgba(255, 255, 255, 0.02)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  position: "relative",
                  marginBottom: "2rem",
                  width: "100%",
                  maxWidth: "480px"
                }}>
                  {[
                    { id: 'usa', name: 'Estados Unidos', flag: '/assets/flag-usa.avif' },
                    { id: 'china', name: 'China', flag: '/assets/flag-china.avif' },
                    { id: 'colombia', name: 'Colombia', flag: '/assets/flag-colombia.jpg' }
                  ].map((tab) => {
                    const on = addrTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setAddrTab(tab.id)}
                        style={{
                          padding: "0.6rem 0",
                          fontSize: "0.9rem",
                          fontWeight: "700",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "8px",
                          background: on ? "var(--primary)" : "transparent",
                          color: on ? "white" : "var(--text-light)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          transition: "all 0.2s ease"
                        }}
                      >
                        <img src={tab.flag} alt={tab.name} style={{ width: "20px", height: "13px", objectFit: "cover", borderRadius: "2px" }} />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", md: "1.5fr 1fr", gap: "2rem" }}>
                  
                  {/* Address List Fields */}
                  <div style={{
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "20px",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem"
                  }}>
                    {getAddresses()[addrTab].map((field) => (
                      <div key={field.id} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "1.2rem",
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                        gap: "1rem"
                      }}>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-light)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>{field.label}</span>
                          <div style={{ fontSize: "1rem", fontWeight: "700", marginTop: "0.25rem", color: "#ffffff" }}>{field.value}</div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(field.value, field.id)}
                          style={{
                            background: copiedField === field.id ? "var(--primary)" : "rgba(255,255,255,0.04)",
                            color: copiedField === field.id ? "white" : "var(--primary)",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "8px",
                            fontSize: "0.8rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          {copiedField === field.id ? "✓ Copiado" : "📋 Copiar"}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Informational Sidebar */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{
                      background: "rgba(245, 158, 11, 0.03)",
                      border: "1px solid rgba(245, 158, 11, 0.15)",
                      borderRadius: "16px",
                      padding: "1.5rem"
                    }}>
                      <h4 style={{ color: "var(--orange)", fontWeight: "800", fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>⚠️ IMPORTANTE</h4>
                      <p style={{ fontSize: "0.85rem", lineHeight: "1.5", color: "var(--text-light)", marginTop: "0.5rem" }}>
                        Es absolutamente vital que ingreses tu ID de casillero <strong>({profile.lockerId})</strong> en la sección de referencias o como parte de tu apellido/dirección línea 2 al comprar. Si no lo haces, el paquete podría registrarse como "desconocido".
                      </p>
                    </div>

                    <div style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "16px",
                      padding: "1.5rem"
                    }}>
                      <h4 style={{ fontWeight: "700", fontSize: "1rem" }}>📦 ¿Cómo funciona?</h4>
                      <ol style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "var(--text-light)", paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                        <li style={{ marginBottom: "0.5rem" }}>Compras en tu tienda favorita y pones nuestra dirección de Miami, China o Colombia.</li>
                        <li style={{ marginBottom: "0.5rem" }}>El paquete llega a nuestra bodega y lo identificamos con tu casillero.</li>
                        <li style={{ marginBottom: "0.5rem" }}>Viaja a Costa Rica y te notificamos cuando pase aduanas y esté listo.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: RECLAMAR PAQUETES (DESCONOCIDOS) */}
            {activeTab === "desconocidos" && (
              <motion.div
                key="desconocidos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: "2.5rem" }}>
                  <h1 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-1px" }}>Reclamar Paquetes Desconocidos</h1>
                  <p style={{ color: "var(--text-light)", marginTop: "0.25rem" }}>¿Hiciste una compra y no incluiste tu casillero? Reclama tu tracking adjuntando tu factura.</p>
                </div>

                {unknownPackages.length > 0 ? (
                  <div style={{
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    overflow: "hidden"
                  }}>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                          <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>NÚMERO DE SEGUIMIENTO (TRACKING)</th>
                            <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>PESO</th>
                            <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>FECHA DE LLEGADA</th>
                            <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)", textAlign: "right" }}>ACCIONES</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unknownPackages.map((pkg) => (
                            <tr key={pkg.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "1.2rem 1.5rem", fontFamily: "monospace", fontWeight: "700" }}>{pkg.trackingNumber}</td>
                              <td style={{ padding: "1.2rem 1.5rem" }}>{pkg.weight}</td>
                              <td style={{ padding: "1.2rem 1.5rem", color: "var(--text-light)" }}>{pkg.date}</td>
                              <td style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>
                                <button
                                  onClick={() => {
                                    setSelectedClaimPackage(pkg);
                                    setIsClaimModalOpen(true);
                                  }}
                                  style={{
                                    background: "linear-gradient(135deg, var(--orange) 0%, #d97706 100%)",
                                    color: "white",
                                    border: "none",
                                    padding: "0.5rem 1.2rem",
                                    borderRadius: "8px",
                                    fontWeight: "700",
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.2)",
                                    transition: "transform 0.2s"
                                  }}
                                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                >
                                  Reclamar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "4rem 2rem", background: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "16px" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>No hay paquetes desconocidos</h3>
                    <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginTop: "0.25rem" }}>¡Excelente! Todos los paquetes en bodega están identificados.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab: MIS FACTURAS */}
            {activeTab === "facturas" && (
              <motion.div
                key="facturas"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: "2.5rem" }}>
                  <h1 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-1px" }}>Mis Facturas</h1>
                  <p style={{ color: "var(--text-light)", marginTop: "0.25rem" }}>Revisa tu historial de cobros por fletes e impuestos de aduana.</p>
                </div>

                <div style={{
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  overflow: "hidden"
                }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                      <thead>
                        <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>Nº FACTURA</th>
                          <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>CONCEPTO</th>
                          <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>PRECIO</th>
                          <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>ESTADO</th>
                          <th style={{ padding: "1.2rem 1.5rem", fontSize: "0.8rem", color: "var(--text-light)" }}>FECHA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((inv) => (
                          <tr key={inv.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td style={{ padding: "1.2rem 1.5rem", fontWeight: "700" }}>{inv.id}</td>
                            <td style={{ padding: "1.2rem 1.5rem" }}>{inv.concept}</td>
                            <td style={{ padding: "1.2rem 1.5rem", fontWeight: "700", color: "var(--primary)" }}>${inv.price.toFixed(2)}</td>
                            <td style={{ padding: "1.2rem 1.5rem" }}>
                              <span style={{
                                background: inv.status === "Pagado" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                                color: inv.status === "Pagado" ? "#10b981" : "#ef4444",
                                border: inv.status === "Pagado" ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "50px",
                                fontSize: "0.8rem",
                                fontWeight: "700"
                              }}>
                                {inv.status}
                              </span>
                            </td>
                            <td style={{ padding: "1.2rem 1.5rem", color: "var(--text-light)", fontSize: "0.9rem" }}>{inv.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: MI CUENTA */}
            {activeTab === "cuenta" && (
              <motion.div
                key="cuenta"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: "2.5rem" }}>
                  <h1 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-1px" }}>Mi Cuenta</h1>
                  <p style={{ color: "var(--text-light)", marginTop: "0.25rem" }}>Gestiona tus datos personales y credenciales de seguridad.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", md: "1.2fr 2fr", gap: "2rem", alignItems: "start" }}>
                  
                  {/* Account Summary Card */}
                  <div style={{
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "20px",
                    padding: "2rem",
                    textAlign: "center"
                  }}>
                    <div style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--primary) 0%, #108d98 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      color: "white",
                      fontSize: "2rem",
                      margin: "0 auto 1.5rem auto",
                      boxShadow: "0 0 20px rgba(20, 177, 189, 0.3)"
                    }}>
                      {getInitials()}
                    </div>

                    <h3 style={{ fontSize: "1.25rem", fontWeight: "800" }}>{profile.name} {profile.lastName}</h3>
                    <p style={{ color: "var(--text-light)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{profile.email}</p>
                    
                    <div style={{
                      marginTop: "1.5rem",
                      padding: "0.6rem 1.2rem",
                      background: "rgba(20, 177, 189, 0.08)",
                      border: "1px solid rgba(20, 177, 189, 0.15)",
                      borderRadius: "10px",
                      color: "var(--primary)",
                      fontWeight: "700",
                      fontSize: "0.9rem",
                      display: "inline-block"
                    }}>
                      Casillero: {profile.lockerId}
                    </div>

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "2rem", paddingTop: "1.5rem", textAlign: "left", fontSize: "0.85rem", color: "var(--text-light)" }}>
                      <div style={{ marginBottom: "0.5rem" }}>📱 WhatsApp: <strong>{profile.phone}</strong></div>
                      <div>📅 Cédula: <strong>{profile.idCard}</strong></div>
                    </div>
                  </div>

                  {/* Account Edit Form */}
                  <div style={{
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "20px",
                    padding: "2.5rem 2rem"
                  }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>📝 Datos Personales</h3>
                    
                    <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "0.5rem", fontWeight: "600" }}>Nombre</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            style={{
                              width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", background: "rgba(0,0,0,0.3)",
                              border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none"
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "0.5rem", fontWeight: "600" }}>Apellidos</label>
                          <input
                            type="text"
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                            style={{
                              width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", background: "rgba(0,0,0,0.3)",
                              border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none"
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "0.5rem", fontWeight: "600" }}>Cédula / ID</label>
                          <input
                            type="text"
                            value={profile.idCard}
                            disabled
                            style={{
                              width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", background: "rgba(255,255,255,0.02)",
                              border: "1px solid rgba(255,255,255,0.05)", color: "var(--text-light)", outline: "none", cursor: "not-allowed"
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "0.5rem", fontWeight: "600" }}>Teléfono Principal</label>
                          <input
                            type="text"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            style={{
                              width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", background: "rgba(0,0,0,0.3)",
                              border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none"
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "0.5rem", fontWeight: "600" }}>Dirección Exacta para Entregas</label>
                        <textarea
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                          rows="2"
                          style={{
                            width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", background: "rgba(0,0,0,0.3)",
                            border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none", resize: "none", fontFamily: "inherit"
                          }}
                        />
                      </div>

                      {saveSuccess && (
                        <div style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: "600" }}>
                          ✓ ¡Datos actualizados exitosamente!
                        </div>
                      )}

                      <button
                        type="submit"
                        style={{
                          background: "var(--primary)",
                          color: "white",
                          border: "none",
                          padding: "0.8rem 1.5rem",
                          borderRadius: "10px",
                          fontWeight: "700",
                          cursor: "pointer",
                          alignSelf: "flex-end",
                          boxShadow: "0 4px 12px rgba(20, 177, 189, 0.2)"
                        }}
                      >
                        Guardar Cambios
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Claim Package Modal Popup */}
      <AnimatePresence>
        {isClaimModalOpen && selectedClaimPackage && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 100
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: "rgba(20, 20, 20, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "500px",
                padding: "2.5rem 2rem",
                boxShadow: "0 25px 50px rgba(0,0,0,0.8)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "800" }}>📥 Reclamar Paquete</h3>
                <button 
                  onClick={() => setIsClaimModalOpen(false)}
                  style={{ background: "none", border: "none", color: "var(--text-light)", fontSize: "1.5rem", cursor: "pointer" }}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleClaimSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>NÚMERO DE SEGUIMIENTO</span>
                  <div style={{ fontSize: "1rem", fontFamily: "monospace", fontWeight: "700", color: "var(--primary)", marginTop: "0.25rem" }}>
                    {selectedClaimPackage.trackingNumber}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "0.5rem", fontWeight: "600" }}>Tienda o Contenido (Descripción)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Amazon - Zapatos Nike"
                    value={claimDescription}
                    onChange={(e) => setClaimDescription(e.target.value)}
                    style={{
                      width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.08)", color: "white", outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "0.5rem", fontWeight: "600" }}>Subir Factura de Compra (PDF o Imagen)</label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => setClaimInvoiceFile(e.target.files[0])}
                    style={{
                      width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.08)", color: "var(--text-light)", outline: "none"
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                  <button
                    type="button"
                    onClick={() => setIsClaimModalOpen(false)}
                    style={{
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "white", padding: "0.7rem 1.2rem", borderRadius: "10px", cursor: "pointer", fontWeight: "600"
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: "linear-gradient(135deg, var(--orange) 0%, #d97706 100%)",
                      color: "white", border: "none", padding: "0.7rem 1.5rem", borderRadius: "10px", cursor: "pointer", fontWeight: "700"
                    }}
                  >
                    Confirmar Reclamo
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Mobile styles injections for responsive adjustments */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .portal-layout {
            flex-direction: column !important;
          }
          .portal-sidebar {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
            padding: 1rem !important;
          }
          .portal-sidebar div {
            flex-direction: row !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
            padding-bottom: 0.5rem !important;
          }
          .portal-sidebar button {
            padding: 0.6rem 1rem !important;
            font-size: 0.85rem !important;
            border-left: none !important;
            border-bottom: 2px solid transparent !important;
          }
          .portal-sidebar button[style*="border-left"] {
            border-bottom: 2px solid var(--primary) !important;
          }
          .portal-sidebar button:last-child {
            display: none !important; /* Hide logout from main row */
          }
          .portal-main {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
