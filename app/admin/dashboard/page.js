"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { db } from '../../../lib/firebase';
import { collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Firestore Real-time Collections State
  const [users, setUsers] = useState([]);
  const [unknownPackages, setUnknownPackages] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterTipo, setFilterTipo] = useState("Todos");

  // Active view and selection state
  const [activeTab, setActiveTab] = useState("clientes"); // "clientes" | "desconocidos"
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPackages, setUserPackages] = useState([]);
  const [userInvoices, setUserInvoices] = useState([]);

  // Filter/Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Modals visibility state
  const [showAddPkgModal, setShowAddPkgModal] = useState(false);
  const [showAddInvModal, setShowAddInvModal] = useState(false);
  const [showAddUnkModal, setShowAddUnkModal] = useState(false);
  const [viewReceiptUrl, setViewReceiptUrl] = useState(null);

  // Form inputs state
  const [newPkgTracking, setNewPkgTracking] = useState("");
  const [newPkgStore, setNewPkgStore] = useState("");
  const [newPkgWeight, setNewPkgWeight] = useState("");
  const [newPkgContent, setNewPkgContent] = useState("");

  const [newInvConcept, setNewInvConcept] = useState("");
  const [newInvPrice, setNewInvPrice] = useState("");

  const [newUnkTracking, setNewUnkTracking] = useState("");
  const [newUnkWeight, setNewUnkWeight] = useState("");

  // 1. Session Authorization Guard
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // 2. Real-time Users listener
  useEffect(() => {
    if (!authorized) return;
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      setUsers(list);
    });
    return () => unsubscribe();
  }, [authorized]);

  // 3. Real-time Unknown Packages listener
  useEffect(() => {
    if (!authorized) return;
    const unsubscribe = onSnapshot(collection(db, "unknown_packages"), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUnknownPackages(list);
    });
    return () => unsubscribe();
  }, [authorized]);

  // 3b. Real-time Feedbacks listener
  useEffect(() => {
    if (!authorized) return;
    const unsubscribe = onSnapshot(collection(db, "feedbacks"), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(list);
    });
    return () => unsubscribe();
  }, [authorized]);

  // Toggle Feedback status
  const toggleFeedbackStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pendiente" ? "Atendido" : "Pendiente";
    try {
      await updateDoc(doc(db, "feedbacks", id), {
        status: newStatus,
        resolvedAt: newStatus === "Atendido" ? new Date().toISOString() : null
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 4. Real-time subcollections listener when client is selected
  useEffect(() => {
    if (!authorized || !selectedUser) {
      setUserPackages([]);
      setUserInvoices([]);
      return;
    }

    const pkgsUnsubscribe = onSnapshot(collection(db, `users/${selectedUser.uid}/packages`), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserPackages(list);
    });

    const invsUnsubscribe = onSnapshot(collection(db, `users/${selectedUser.uid}/invoices`), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
      setUserInvoices(list);
    });

    return () => {
      pkgsUnsubscribe();
      invsUnsubscribe();
    };
  }, [authorized, selectedUser]);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  // Filter clients
  const filteredUsers = users.filter(u => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (u.name || "").toLowerCase().includes(searchLower) ||
      (u.lastName || "").toLowerCase().includes(searchLower) ||
      (u.lockerId || "").toLowerCase().includes(searchLower) ||
      (u.email || "").toLowerCase().includes(searchLower) ||
      (u.cedula || "").toLowerCase().includes(searchLower)
    );
  });

  // Filter feedbacks
  const filteredFeedbacks = feedbacks.filter(fb => {
    if (filterTipo === "Todos") return true;
    return fb.tipo === filterTipo;
  });

  // Calculate quick metrics
  const totalClients = users.length;
  const totalUnknowns = unknownPackages.length;
  
  // Package logistics status updating
  const handleUpdatePkgStatus = async (pkgId, newStatus) => {
    try {
      const docRef = doc(db, `users/${selectedUser.uid}/packages`, pkgId);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.error(err);
      alert("Error al actualizar estado del paquete.");
    }
  };

  // Invoice payment status updating
  const handleUpdateInvStatus = async (invDocId, newStatus) => {
    try {
      const docRef = doc(db, `users/${selectedUser.uid}/invoices`, invDocId);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.error(err);
      alert("Error al actualizar estado de la factura.");
    }
  };

  // Add package to active user
  const handleAddPackage = async (e) => {
    e.preventDefault();
    if (!newPkgTracking || !newPkgStore || !newPkgWeight) return;

    try {
      await addDoc(collection(db, `users/${selectedUser.uid}/packages`), {
        trackingNumber: newPkgTracking,
        store: newPkgStore,
        weight: newPkgWeight,
        content: newPkgContent || "Paquete Courier",
        status: "Recibido en Miami",
        date: new Date().toLocaleDateString('es-CR')
      });
      setNewPkgTracking("");
      setNewPkgStore("");
      setNewPkgWeight("");
      setNewPkgContent("");
      setShowAddPkgModal(false);
    } catch (err) {
      console.error(err);
      alert("Error al crear el paquete.");
    }
  };

  // Add invoice to active user
  const handleAddInvoice = async (e) => {
    e.preventDefault();
    if (!newInvConcept || !newInvPrice) return;

    try {
      await addDoc(collection(db, `users/${selectedUser.uid}/invoices`), {
        id: "FAC-" + String(Math.floor(10000 + Math.random() * 90000)),
        concept: newInvConcept,
        price: parseFloat(newInvPrice),
        status: "Pendiente",
        date: new Date().toLocaleDateString('es-CR')
      });
      setNewInvConcept("");
      setNewInvPrice("");
      setShowAddInvModal(false);
    } catch (err) {
      console.error(err);
      alert("Error al crear la factura.");
    }
  };

  // Add global unknown package
  const handleAddUnknown = async (e) => {
    e.preventDefault();
    if (!newUnkTracking || !newUnkWeight) return;

    try {
      await addDoc(collection(db, "unknown_packages"), {
        trackingNumber: newUnkTracking,
        weight: newUnkWeight,
        date: new Date().toLocaleDateString('es-CR')
      });
      setNewUnkTracking("");
      setNewUnkWeight("");
      setShowAddUnkModal(false);
    } catch (err) {
      console.error(err);
      alert("Error al crear el paquete sin identificar.");
    }
  };

  // Delete global unknown package
  const handleDeleteUnknown = async (id) => {
    if (!confirm("¿Deseas eliminar este paquete de la lista de paquetes desconocidos?")) return;

    try {
      await deleteDoc(doc(db, "unknown_packages", id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el paquete.");
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "Listo para Entrega": return "rgba(16, 185, 129, 0.15)";
      case "En Tránsito a CR": return "rgba(245, 158, 11, 0.15)";
      case "En Aduanas": return "rgba(239, 68, 68, 0.15)";
      case "Entregado": return "rgba(107, 114, 128, 0.15)";
      default: return "rgba(20, 177, 189, 0.15)";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Listo para Entrega": return "#10b981";
      case "En Tránsito a CR": return "#f59e0b";
      case "En Aduanas": return "#ef4444";
      case "Entregado": return "#9ca3af";
      default: return "var(--primary)";
    }
  };

  const getInvStatusColor = (status) => {
    switch (status) {
      case "Pagado": return "#10b981";
      case "Pago en Revisión": return "#f59e0b";
      case "Pendiente": return "#ef4444";
      default: return "white";
    }
  };

  if (!authorized) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: "40px",
          height: "40px",
          border: "4px solid rgba(255,255,255,0.1)",
          borderTopColor: "var(--primary)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { to { transform: rotate(360deg); } }
        `}} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-dark)", padding: "2rem", color: "white" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 900, margin: 0, letterSpacing: "-1px" }}>Panel de Control Logístico</h1>
            <p style={{ color: "var(--text-light)", marginTop: "0.5rem" }}>Administra casilleros, paquetes y facturación. Bienvenido, Wilson Owner.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link href="/">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Ir a Web
              </motion.button>
            </Link>
            <motion.button 
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#ef4444",
                padding: "0.8rem 1.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Cerrar Sesión
            </motion.button>
          </div>
        </div>

        {/* Operational Metrics Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ color: "var(--text-light)", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: "600" }}>CLIENTES REGISTRADOS</div>
            <div style={{ fontSize: "2.5rem", fontWeight: "900", marginTop: "0.5rem", color: "var(--primary)" }}>{totalClients}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ color: "var(--text-light)", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: "600" }}>PAQUETES HUÉRFANOS (SIN DUEÑO)</div>
            <div style={{ fontSize: "2.5rem", fontWeight: "900", marginTop: "0.5rem", color: "var(--orange)" }}>{totalUnknowns}</div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "2rem" }}>
          <button 
            onClick={() => { setActiveTab("clientes"); setSelectedUser(null); }}
            style={{
              padding: "1rem 2rem",
              background: "none",
              border: "none",
              color: activeTab === "clientes" ? "var(--primary)" : "var(--text-light)",
              borderBottom: activeTab === "clientes" ? "2px solid var(--primary)" : "none",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            👥 Gestión de Clientes
          </button>
          <button 
            onClick={() => { setActiveTab("desconocidos"); setSelectedUser(null); }}
            style={{
              padding: "1rem 2rem",
              background: "none",
              border: "none",
              color: activeTab === "desconocidos" ? "var(--primary)" : "var(--text-light)",
              borderBottom: activeTab === "desconocidos" ? "2px solid var(--primary)" : "none",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            📦 Paquetes sin Identificar
          </button>
          <button 
            onClick={() => { setActiveTab("sugerencias"); setSelectedUser(null); }}
            style={{
              padding: "1rem 2rem",
              background: "none",
              border: "none",
              color: activeTab === "sugerencias" ? "var(--primary)" : "var(--text-light)",
              borderBottom: activeTab === "sugerencias" ? "2px solid var(--primary)" : "none",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            📋 Sugerencias ({feedbacks.filter(f => f.status === "Pendiente").length})
          </button>
        </div>

        {/* Tab 1: CLIENTES */}
        {activeTab === "clientes" && !selectedUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            {/* Search client input */}
            <div style={{ marginBottom: "2rem" }}>
              <input 
                type="text" 
                placeholder="Buscar cliente por Casillero (MExxxxxx), Nombre, Cédula o Correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "1rem 1.2rem",
                  borderRadius: "12px",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none"
                }}
              />
            </div>

            {/* Clients Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {filteredUsers.map((u) => (
                <div 
                  key={u.uid}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "rgba(20, 177, 189, 0.1)",
                        border: "1px solid rgba(20, 177, 189, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        fontWeight: "800",
                        color: "var(--primary)"
                      }}>
                        {(u.name || "?").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0 }}>{u.name} {u.lastName}</h3>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>ID: {u.lockerId || "Sin Asignar"}</span>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", color: "var(--text-light)" }}>
                      <div>📧 {u.email}</div>
                      <div>📞 {u.phone || "No especificado"}</div>
                      <div>🪪 Cédula: {u.cedula || "No especificada"}</div>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setSelectedUser(u)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: "var(--primary)",
                      color: "white",
                      border: "none",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "700",
                      width: "100%",
                      marginTop: "1.5rem"
                    }}
                  >
                    ⚙️ Gestionar Casillero
                  </motion.button>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem", color: "var(--text-light)" }}>
                  No se encontraron clientes registrados que coincidan con la búsqueda.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Client Detail View */}
        {activeTab === "clientes" && selectedUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            {/* Header Client Name */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button 
                  onClick={() => setSelectedUser(null)}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "none",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.9rem"
                  }}
                >
                  ← Volver a Clientes
                </button>
                <div>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: "800", margin: 0 }}>
                    {selectedUser.name} {selectedUser.lastName} ({selectedUser.lockerId})
                  </h2>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-light)" }}>UID: {selectedUser.uid}</p>
                </div>
              </div>
            </div>

            {/* Delivery address details */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "1.5rem", marginBottom: "2rem" }}>
              <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>📍 Preferencias de Entrega (Costa Rica)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-light)", textTransform: "uppercase" }}>Ubicación</span>
                  <div style={{ fontWeight: "700", marginTop: "0.25rem" }}>
                    {selectedUser.provincia}, {selectedUser.canton}, {selectedUser.distrito}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-light)", textTransform: "uppercase" }}>Zona de Cobertura</span>
                  <div style={{ fontWeight: "700", marginTop: "0.25rem" }}>{selectedUser.zonaDelivery || "GAM (Por defecto)"}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-light)", textTransform: "uppercase" }}>Método de Envío</span>
                  <div style={{ fontWeight: "700", marginTop: "0.25rem" }}>{selectedUser.tipoDelivery || "Sucursal"}</div>
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-light)", textTransform: "uppercase" }}>Dirección Exacta</span>
                  <div style={{ marginTop: "0.25rem", background: "rgba(0,0,0,0.2)", padding: "0.75rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    {selectedUser.direccionExacta || "No especificada"}
                  </div>
                </div>
              </div>
            </div>

            {/* Packages Section */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>📦 Paquetes en Casillero ({userPackages.length})</h3>
                <motion.button
                  onClick={() => setShowAddPkgModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "var(--primary)",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    fontWeight: "700",
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  + Agregar Paquete
                </motion.button>
              </div>

              {userPackages.length === 0 ? (
                <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-light)" }}>
                  No hay paquetes registrados para este usuario.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "rgba(0,0,0,0.2)", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.8rem", color: "var(--text-light)" }}>
                        <th style={{ padding: "0.8rem 1rem" }}>TRACKING NUMBER</th>
                        <th style={{ padding: "0.8rem 1rem" }}>TIENDA</th>
                        <th style={{ padding: "0.8rem 1rem" }}>CONTENIDO</th>
                        <th style={{ padding: "0.8rem 1rem" }}>PESO</th>
                        <th style={{ padding: "0.8rem 1rem" }}>FECHA</th>
                        <th style={{ padding: "0.8rem 1rem" }}>ESTADO LOGÍSTICO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPackages.map((pkg) => (
                        <tr key={pkg.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                          <td style={{ padding: "0.8rem 1rem", fontWeight: "700" }}>{pkg.trackingNumber}</td>
                          <td style={{ padding: "0.8rem 1rem" }}>{pkg.store}</td>
                          <td style={{ padding: "0.8rem 1rem" }}>{pkg.content}</td>
                          <td style={{ padding: "0.8rem 1rem", fontWeight: "700" }}>{pkg.weight}</td>
                          <td style={{ padding: "0.8rem 1rem", color: "var(--text-light)", fontSize: "0.85rem" }}>{pkg.date}</td>
                          <td style={{ padding: "0.8rem 1rem" }}>
                            <select
                              value={pkg.status}
                              onChange={(e) => handleUpdatePkgStatus(pkg.id, e.target.value)}
                              style={{
                                background: getStatusBg(pkg.status),
                                color: getStatusColor(pkg.status),
                                border: `1px solid ${getStatusColor(pkg.status)}50`,
                                padding: "0.3rem 0.6rem",
                                borderRadius: "8px",
                                outline: "none",
                                fontWeight: "700",
                                cursor: "pointer",
                                fontSize: "0.8rem"
                              }}
                            >
                              <option value="Comprado" style={{ background: "var(--bg-dark)", color: "white" }}>Comprado</option>
                              <option value="Recibido en Miami" style={{ background: "var(--bg-dark)", color: "white" }}>Recibido en Miami</option>
                              <option value="En Tránsito a CR" style={{ background: "var(--bg-dark)", color: "white" }}>En Tránsito a CR</option>
                              <option value="En Aduanas" style={{ background: "var(--bg-dark)", color: "white" }}>En Aduanas</option>
                              <option value="Listo para Entrega" style={{ background: "var(--bg-dark)", color: "white" }}>Listo para Entrega</option>
                              <option value="Entregado" style={{ background: "var(--bg-dark)", color: "white" }}>Entregado</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Invoices Section */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>💳 Facturas y Cobros ({userInvoices.length})</h3>
                <motion.button
                  onClick={() => setShowAddInvModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "var(--primary)",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    fontWeight: "700",
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  + Crear Factura
                </motion.button>
              </div>

              {userInvoices.length === 0 ? (
                <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-light)" }}>
                  No hay facturas registradas para este usuario.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "rgba(0,0,0,0.2)", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.8rem", color: "var(--text-light)" }}>
                        <th style={{ padding: "0.8rem 1rem" }}>FACTURA ID</th>
                        <th style={{ padding: "0.8rem 1rem" }}>CONCEPTO</th>
                        <th style={{ padding: "0.8rem 1rem" }}>PRECIO</th>
                        <th style={{ padding: "0.8rem 1rem" }}>FECHA</th>
                        <th style={{ padding: "0.8rem 1rem" }}>ESTADO FACTURACIÓN</th>
                        <th style={{ padding: "0.8rem 1rem", textAlign: "right" }}>ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userInvoices.map((inv) => (
                        <tr key={inv.docId} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                          <td style={{ padding: "0.8rem 1rem", fontWeight: "700" }}>{inv.id}</td>
                          <td style={{ padding: "0.8rem 1rem" }}>{inv.concept}</td>
                          <td style={{ padding: "0.8rem 1rem", fontWeight: "700", color: "var(--primary)" }}>${inv.price.toFixed(2)}</td>
                          <td style={{ padding: "0.8rem 1rem", color: "var(--text-light)", fontSize: "0.85rem" }}>{inv.date}</td>
                          <td style={{ padding: "0.8rem 1rem" }}>
                            <select
                              value={inv.status}
                              onChange={(e) => handleUpdateInvStatus(inv.docId, e.target.value)}
                              style={{
                                background: "rgba(255,255,255,0.02)",
                                color: getInvStatusColor(inv.status),
                                border: `1px solid ${getInvStatusColor(inv.status)}50`,
                                padding: "0.3rem 0.6rem",
                                borderRadius: "8px",
                                outline: "none",
                                fontWeight: "700",
                                cursor: "pointer",
                                fontSize: "0.8rem"
                              }}
                            >
                              <option value="Pendiente" style={{ background: "var(--bg-dark)", color: "white" }}>Pendiente</option>
                              <option value="Pago en Revisión" style={{ background: "var(--bg-dark)", color: "white" }}>Pago en Revisión</option>
                              <option value="Pagado" style={{ background: "var(--bg-dark)", color: "white" }}>Pagado</option>
                            </select>
                          </td>
                          <td style={{ padding: "0.8rem 1rem", textAlign: "right" }}>
                            {inv.paymentReceiptUrl ? (
                              <button 
                                onClick={() => setViewReceiptUrl(inv.paymentReceiptUrl)}
                                style={{
                                  background: "rgba(20, 177, 189, 0.15)",
                                  border: "1px solid rgba(20, 177, 189, 0.3)",
                                  color: "var(--primary)",
                                  padding: "0.3rem 0.75rem",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  fontWeight: "600",
                                  fontSize: "0.8rem"
                                }}
                              >
                                👁️ Ver Comprobante
                              </button>
                            ) : (
                              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>Sin comprobante</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 2: UNKNOWN PACKAGES */}
        {activeTab === "desconocidos" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "800", margin: 0 }}>Paquetes sin Identificar (Huéspedes)</h2>
                <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Paquetes que llegaron a Miami sin número de casillero.</p>
              </div>
              <motion.button
                onClick={() => setShowAddUnkModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                + Registrar Paquete sin Dueño
              </motion.button>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "1.5rem" }}>
              {unknownPackages.length === 0 ? (
                <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-light)" }}>
                  No hay paquetes sin identificar en este momento.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "rgba(0,0,0,0.2)", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.85rem", color: "var(--text-light)" }}>
                        <th style={{ padding: "1rem 1.5rem" }}>TRACKING NUMBER</th>
                        <th style={{ padding: "1rem 1.5rem" }}>PESO</th>
                        <th style={{ padding: "1rem 1.5rem" }}>FECHA DE REGISTRO</th>
                        <th style={{ padding: "1rem 1.5rem", textAlign: "right" }}>ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unknownPackages.map((unk) => (
                        <tr key={unk.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                          <td style={{ padding: "1rem 1.5rem", fontWeight: "700", color: "var(--primary)" }}>{unk.trackingNumber}</td>
                          <td style={{ padding: "1rem 1.5rem", fontWeight: "700" }}>{unk.weight}</td>
                          <td style={{ padding: "1rem 1.5rem", color: "var(--text-light)" }}>{unk.date}</td>
                          <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                            <button
                              onClick={() => handleDeleteUnknown(unk.id)}
                              style={{
                                background: "rgba(239, 68, 68, 0.15)",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                color: "#ef4444",
                                padding: "0.4rem 0.8rem",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "0.8rem",
                                fontWeight: "600"
                              }}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 3: FEEDBACK / SUGERENCIAS */}
        {activeTab === "sugerencias" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "800", margin: 0 }}>Sugerencias y Opiniones de Clientes</h2>
                <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Mensajes enviados desde el botón flotante de sugerencias de la web principal.</p>
              </div>
              <div>
                <select 
                  value={filterTipo} 
                  onChange={(e) => setFilterTipo(e.target.value)}
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "8px",
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                    cursor: "pointer",
                    outline: "none"
                  }}
                >
                  <option value="Todos">Todos los Asuntos</option>
                  <option value="sugerencia">💡 Sugerencias</option>
                  <option value="error">⚠️ Reportes de Error</option>
                  <option value="felicitacion">🎉 Felicitaciones</option>
                  <option value="otro">💬 Otros</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filteredFeedbacks.length === 0 ? (
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "4rem", textAlign: "center", color: "var(--text-light)" }}>
                  No hay sugerencias para mostrar con el filtro seleccionado.
                </div>
              ) : (
                filteredFeedbacks.map((fb) => (
                  <div key={fb.id} style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                      <div>
                        <span style={{
                          background: fb.tipo === "error" ? "rgba(239, 68, 68, 0.15)" : fb.tipo === "felicitacion" ? "rgba(16, 185, 129, 0.15)" : "rgba(20, 177, 189, 0.15)",
                          color: fb.tipo === "error" ? "#ef4444" : fb.tipo === "felicitacion" ? "#10b981" : "var(--primary)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          textTransform: "uppercase"
                        }}>
                          {fb.tipo === "sugerencia" ? "💡 Sugerencia" : fb.tipo === "error" ? "⚠️ Error" : fb.tipo === "felicitacion" ? "🎉 Felicitación" : "💬 Otro"}
                        </span>
                        <div style={{ marginTop: "0.4rem", fontSize: "0.85rem", color: "var(--text-light)" }}>
                          📧 {fb.email}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                          📅 {fb.createdAt?.seconds ? new Date(fb.createdAt.seconds * 1000).toLocaleDateString('es-CR') : new Date().toLocaleDateString('es-CR')}
                        </span>
                        <button
                          onClick={() => toggleFeedbackStatus(fb.id, fb.status)}
                          style={{
                            background: fb.status === "Atendido" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                            border: `1px solid ${fb.status === "Atendido" ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
                            color: fb.status === "Atendido" ? "#10b981" : "#f59e0b",
                            padding: "0.4rem 0.8rem",
                            borderRadius: "50px",
                            fontSize: "0.8rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          {fb.status === "Atendido" ? "✅ Atendido" : "⏳ Pendiente"}
                        </button>
                      </div>
                    </div>
                    <div style={{
                      background: "rgba(0,0,0,0.2)",
                      padding: "1rem",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                      color: "rgba(255,255,255,0.9)",
                      whiteSpace: "pre-wrap",
                      border: "1px solid rgba(255,255,255,0.03)"
                    }}>
                      {fb.mensaje}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

      </div>

      {/* ================= MODALS SECTION ================= */}

      {/* Modal 1: ADD PACKAGE */}
      <AnimatePresence>
        {showAddPkgModal && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "1.5rem"
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: "#0c0c0c",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "2rem",
                width: "100%",
                maxWidth: "480px"
              }}
            >
              <h3 style={{ fontSize: "1.25rem", margin: "0 0 1.5rem 0" }}>📦 Registrar Nuevo Paquete</h3>
              <form onSubmit={handleAddPackage} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-light)", display: "block", marginBottom: "0.4rem" }}>Tracking Number</label>
                  <input 
                    type="text" 
                    value={newPkgTracking}
                    onChange={(e) => setNewPkgTracking(e.target.value)}
                    required
                    placeholder="Ej. 1Z999999999999"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-light)", display: "block", marginBottom: "0.4rem" }}>Tienda</label>
                  <input 
                    type="text" 
                    value={newPkgStore}
                    onChange={(e) => setNewPkgStore(e.target.value)}
                    required
                    placeholder="Ej. Amazon, eBay, Shein"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-light)", display: "block", marginBottom: "0.4rem" }}>Peso (lbs / kg)</label>
                  <input 
                    type="text" 
                    value={newPkgWeight}
                    onChange={(e) => setNewPkgWeight(e.target.value)}
                    required
                    placeholder="Ej. 2.4 lbs"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-light)", display: "block", marginBottom: "0.4rem" }}>Contenido del Paquete</label>
                  <input 
                    type="text" 
                    value={newPkgContent}
                    onChange={(e) => setNewPkgContent(e.target.value)}
                    placeholder="Ej. Ropa, Celular, Zapatos"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <button 
                    type="button" 
                    onClick={() => setShowAddPkgModal(false)}
                    style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "none", color: "white", cursor: "pointer" }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", background: "var(--primary)", border: "none", color: "white", fontWeight: "700", cursor: "pointer" }}
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 2: CREATE INVOICE */}
      <AnimatePresence>
        {showAddInvModal && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "1.5rem"
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: "#0c0c0c",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "2rem",
                width: "100%",
                maxWidth: "480px"
              }}
            >
              <h3 style={{ fontSize: "1.25rem", margin: "0 0 1.5rem 0" }}>💳 Crear Nueva Factura</h3>
              <form onSubmit={handleAddInvoice} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-light)", display: "block", marginBottom: "0.4rem" }}>Concepto de Cobro</label>
                  <input 
                    type="text" 
                    value={newInvConcept}
                    onChange={(e) => setNewInvConcept(e.target.value)}
                    required
                    placeholder="Ej. Servicio Flete Courier USA-CR"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-light)", display: "block", marginBottom: "0.4rem" }}>Monto ($ USD)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={newInvPrice}
                    onChange={(e) => setNewInvPrice(e.target.value)}
                    required
                    placeholder="Ej. 18.50"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <button 
                    type="button" 
                    onClick={() => setShowAddInvModal(false)}
                    style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "none", color: "white", cursor: "pointer" }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", background: "var(--primary)", border: "none", color: "white", fontWeight: "700", cursor: "pointer" }}
                  >
                    Guardar Factura
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 3: REGISTER UNKNOWN PACKAGE */}
      <AnimatePresence>
        {showAddUnkModal && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "1.5rem"
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: "#0c0c0c",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "2rem",
                width: "100%",
                maxWidth: "480px"
              }}
            >
              <h3 style={{ fontSize: "1.25rem", margin: "0 0 1.5rem 0" }}>📦 Paquete sin Identificar</h3>
              <form onSubmit={handleAddUnknown} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-light)", display: "block", marginBottom: "0.4rem" }}>Tracking Number</label>
                  <input 
                    type="text" 
                    value={newUnkTracking}
                    onChange={(e) => setNewUnkTracking(e.target.value)}
                    required
                    placeholder="Ej. 1Z88273619..."
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-light)", display: "block", marginBottom: "0.4rem" }}>Peso estimado</label>
                  <input 
                    type="text" 
                    value={newUnkWeight}
                    onChange={(e) => setNewUnkWeight(e.target.value)}
                    required
                    placeholder="Ej. 3.0 lbs"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <button 
                    type="button" 
                    onClick={() => setShowAddUnkModal(false)}
                    style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "none", color: "white", cursor: "pointer" }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", background: "var(--primary)", border: "none", color: "white", fontWeight: "700", cursor: "pointer" }}
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 4: VIEW RECEIPT (LIGHTBOX) */}
      <AnimatePresence>
        {viewReceiptUrl && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "2rem"
          }}>
            {/* Close handler */}
            <div style={{ width: "100%", maxWidth: "800px", display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
              <button 
                onClick={() => setViewReceiptUrl(null)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "700",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                ✕ Cerrar
              </button>
            </div>
            
            <div style={{ 
              background: "white",
              borderRadius: "16px",
              padding: "1rem",
              maxWidth: "800px",
              maxHeight: "75vh",
              overflow: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              {viewReceiptUrl.startsWith("data:application/pdf") ? (
                <iframe 
                  src={viewReceiptUrl} 
                  title="Comprobante PDF"
                  style={{ width: "70vw", height: "70vh", border: "none" }}
                />
              ) : (
                <img 
                  src={viewReceiptUrl} 
                  alt="Comprobante de Pago" 
                  style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: "8px", objectFit: "contain" }} 
                />
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
