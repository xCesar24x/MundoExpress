// This file will act as our SDK wrapper to fetch data from Cosmic CMS.
// For now, we are simulating the connection with mock data, so the client can 
// see the website working immediately without having the CMS fully populated.

export async function getGlobalData() {
  // Simulating network request
  return {
    contactEmail: "info@mundoexpresscr.com",
    contactPhone: "+506 7051-1239",
    address: "San José, Costa Rica",
    companyName: "Mundo Express",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  };
}

export async function getServicesData() {
  return [
    {
      title: 'Transporte Terrestre',
      desc: 'Flota moderna para carga pesada y distribución urbana.',
      icon: '🚚'
    },
    {
      title: 'Flete Aéreo',
      desc: 'Envíos urgentes con las mejores aerolíneas comerciales.',
      icon: '✈️'
    },
    {
      title: 'Carga Marítima',
      desc: 'Soluciones FCL y LCL eficientes y económicas.',
      icon: '🚢'
    },
    {
      title: 'Almacenaje',
      desc: 'Bodegas de seguridad con control de inventario.',
      icon: '🏭'
    }
  ];
}
