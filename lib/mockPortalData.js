export const mockClientProfile = {
  name: "Cesar",
  lastName: "Madrigal Rodriguez",
  email: "cesarmadrod241997@gmail.com",
  idCard: "116680724",
  phone: "84349442",
  address: "50 ESTE DE ENDEREZADO SYS SAN PABLO HEREDIA",
  lockerId: "ME000776"
};

export const miamiAddress = {
  name: "Mundo Express / Cesar Madrigal",
  addressLine1: "11350 NW 25th ST",
  addressLine2: "Suite 100",
  reference: "ME000776",
  city: "Doral (Sweetwater)",
  state: "Florida",
  zipCode: "33172-9118",
  country: "USA",
  phone: "305-477-5508"
};

export const mockPackages = [
  {
    id: "TRK-984218392",
    trackingNumber: "1Z999AA10123456784",
    store: "Amazon",
    content: "Zapatos Nike Pegasus 40",
    weight: "1.2 kg",
    status: "En Tránsito a CR",
    date: "30/06/2026",
    price: 45
  },
  {
    id: "TRK-582049182",
    trackingNumber: "UPS-89240182402",
    store: "eBay",
    content: "Repuestos para Carro (Frenos)",
    weight: "3.5 kg",
    status: "En Aduanas",
    date: "28/06/2026",
    price: 95
  },
  {
    id: "TRK-204819482",
    trackingNumber: "USPS-940011189956",
    store: "Walmart",
    content: "Audífonos Bluetooth Pro",
    weight: "0.4 kg",
    status: "Listo para Entrega",
    date: "29/06/2026",
    price: 15
  },
  {
    id: "TRK-109482018",
    trackingNumber: "DHL-9842109420",
    store: "Apple Store",
    content: "iPhone 15 Pro Max 256GB",
    weight: "0.6 kg",
    status: "Entregado",
    date: "20/06/2026",
    price: 1200
  }
];

export const mockUnknownPackages = [
  {
    id: "UNK-100201",
    trackingNumber: "SPXMIA01367260617000746",
    weight: "0.86 kg",
    date: "29/06/2026"
  },
  {
    id: "UNK-100202",
    trackingNumber: "1195268813470003317200873454613358",
    weight: "0.16 kg",
    date: "29/06/2026"
  },
  {
    id: "UNK-100203",
    trackingNumber: "1195268813470003317200873444307927",
    weight: "0.16 kg",
    date: "29/06/2026"
  },
  {
    id: "UNK-100204",
    trackingNumber: "1195268813470003317200873454620040",
    weight: "0.16 kg",
    date: "29/06/2026"
  }
];

export const mockInvoices = [
  {
    id: "FAC-88902",
    date: "29/06/2026",
    concept: "Envío Casillero TRK-204819482 (Audífonos)",
    price: 15.00,
    status: "Pagado"
  },
  {
    id: "FAC-88741",
    date: "28/06/2026",
    concept: "Envío Casillero TRK-582049182 (Repuestos)",
    price: 95.00,
    status: "Pendiente"
  },
  {
    id: "FAC-88501",
    date: "20/06/2026",
    concept: "Envío Casillero TRK-109482018 (iPhone)",
    price: 45.00,
    status: "Pagado"
  }
];
