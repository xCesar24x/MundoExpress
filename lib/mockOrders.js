export const mockOrders = [
  {
    id: "TBA84920183419",
    client: "Carlos Rojas",
    content: "MacBook Pro M3 Max",
    origin: "Estados Unidos (Apple Store)",
    price: 3499.00,
    weight: "4.5 lbs",
    status: "En Aduanas",
    timeline: [
      { date: "2026-06-20 14:30", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-22 09:15", action: "Recibido en bodega Miami" },
      { date: "2026-06-23 18:00", action: "En Tránsito a Costa Rica" },
      { date: "2026-06-25 08:30", action: "En Aduanas CR (Procesando impuestos)" }
    ]
  },
  {
    id: "TBA10934857122",
    client: "María Fernández",
    content: "Repuestos Honda Civic",
    origin: "Japón (Amazon JP)",
    price: 450.50,
    weight: "12 lbs",
    status: "Listo para Entrega",
    timeline: [
      { date: "2026-06-15 10:20", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-20 11:45", action: "Recibido en bodega Miami" },
      { date: "2026-06-22 17:30", action: "En Tránsito a Costa Rica" },
      { date: "2026-06-24 14:10", action: "En Aduanas CR (Liberado)" },
      { date: "2026-06-26 09:00", action: "Listo para Entrega en Sede San José" }
    ]
  },
  {
    id: "TBA98471203491",
    client: "Jorge Valverde",
    content: "Lote de Ropa Shein",
    origin: "China (Shein)",
    price: 185.00,
    weight: "8.2 lbs",
    status: "En Tránsito a CR",
    timeline: [
      { date: "2026-06-18 20:00", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-24 13:25", action: "Recibido en bodega Miami" },
      { date: "2026-06-25 19:40", action: "En Tránsito a Costa Rica" }
    ]
  },
  {
    id: "TBA55719284710",
    client: "Ana López",
    content: "Zapatillas Nike Air Max",
    origin: "Estados Unidos (Nike)",
    price: 150.00,
    weight: "2.5 lbs",
    status: "Entregado",
    timeline: [
      { date: "2026-06-10 08:00", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-13 14:20", action: "Recibido en bodega Miami" },
      { date: "2026-06-15 18:30", action: "En Tránsito a Costa Rica" },
      { date: "2026-06-17 10:00", action: "En Aduanas CR (Liberado)" },
      { date: "2026-06-18 11:30", action: "Entregado a cliente final" }
    ]
  },
  {
    id: "TBA12039485721",
    client: "Roberto Jiménez",
    content: "Cámara Sony A7IV",
    origin: "Estados Unidos (B&H)",
    price: 2498.00,
    weight: "3.2 lbs",
    status: "Recibido en Miami",
    timeline: [
      { date: "2026-06-23 09:45", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-26 10:15", action: "Recibido en bodega Miami (Procesando consolidación)" }
    ]
  },
  {
    id: "TBA99283746510",
    client: "Distribuidora del Sur",
    content: "Lote Maquinaria Industrial",
    origin: "Alemania (Directo)",
    price: 15400.00,
    weight: "850 lbs",
    status: "En Aduanas",
    timeline: [
      { date: "2026-06-05 11:00", action: "Orden generada en origen" },
      { date: "2026-06-15 15:30", action: "Carga consolidada marítima enviada" },
      { date: "2026-06-23 08:00", action: "Llegada a Puerto Caldera" },
      { date: "2026-06-25 10:00", action: "En Aduanas CR (Inspección física)" }
    ]
  },
  {
    id: "TBA48571920384",
    client: "Luis Mora",
    content: "Perfumes y Cosméticos",
    origin: "Francia (Sephora)",
    price: 320.00,
    weight: "1.5 lbs",
    status: "Comprado",
    timeline: [
      { date: "2026-06-25 16:20", action: "Orden generada en la tienda de origen" }
    ]
  },
  {
    id: "TBA57192847592",
    client: "Carolina Castro",
    content: "Suplementos Deportivos",
    origin: "Estados Unidos (Bodybuilding)",
    price: 85.50,
    weight: "4.0 lbs",
    status: "En Tránsito a CR",
    timeline: [
      { date: "2026-06-21 14:00", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-24 09:30", action: "Recibido en bodega Miami" },
      { date: "2026-06-25 17:00", action: "En Tránsito a Costa Rica" }
    ]
  },
  {
    id: "TBA84759201834",
    client: "TecnoStore CR",
    content: "20x Laptops Dell Latitude",
    origin: "Estados Unidos (Dell)",
    price: 12500.00,
    weight: "115 lbs",
    status: "Listo para Entrega",
    timeline: [
      { date: "2026-06-12 08:45", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-16 11:00", action: "Recibido en bodega Miami" },
      { date: "2026-06-18 19:30", action: "En Tránsito a Costa Rica" },
      { date: "2026-06-21 15:20", action: "En Aduanas CR (Nacionalización)" },
      { date: "2026-06-24 10:00", action: "Listo para Entrega (En ruta de mensajería)" }
    ]
  },
  {
    id: "TBA39485710293",
    client: "Pedro Solís",
    content: "Reloj Garmin Fenix 7",
    origin: "Estados Unidos (Amazon)",
    price: 699.99,
    weight: "0.8 lbs",
    status: "Recibido en Miami",
    timeline: [
      { date: "2026-06-24 19:15", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-26 12:45", action: "Recibido en bodega Miami" }
    ]
  },
  {
    id: "TBA10293847561",
    client: "Sofía Alvarado",
    content: "Vestido de Novia",
    origin: "España (Pronovias)",
    price: 1200.00,
    weight: "6.5 lbs",
    status: "En Aduanas",
    timeline: [
      { date: "2026-06-15 13:20", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-20 15:30", action: "Recibido en bodega Madrid, en tránsito a Miami" },
      { date: "2026-06-22 09:00", action: "Recibido en bodega Miami" },
      { date: "2026-06-23 18:30", action: "En Tránsito a Costa Rica" },
      { date: "2026-06-25 11:15", action: "En Aduanas CR" }
    ]
  },
  {
    id: "TBA93847561029",
    client: "Boutique Elegance",
    content: "Accesorios y Carteras",
    origin: "China (Alibaba)",
    price: 450.00,
    weight: "22 lbs",
    status: "Entregado",
    timeline: [
      { date: "2026-05-28 07:00", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-10 14:00", action: "Recibido en bodega Miami" },
      { date: "2026-06-12 19:00", action: "En Tránsito a Costa Rica" },
      { date: "2026-06-15 09:30", action: "En Aduanas CR (Nacionalización)" },
      { date: "2026-06-17 14:00", action: "Entregado a cliente final" }
    ]
  },
  {
    id: "TBA47561029384",
    client: "Ricardo Ramírez",
    content: "Consola PS5 Slim",
    origin: "Estados Unidos (BestBuy)",
    price: 499.99,
    weight: "10 lbs",
    status: "En Tránsito a CR",
    timeline: [
      { date: "2026-06-21 16:40", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-24 11:20", action: "Recibido en bodega Miami" },
      { date: "2026-06-25 18:15", action: "En Tránsito a Costa Rica" }
    ]
  },
  {
    id: "TBA56102938475",
    client: "Taller Hermanos",
    content: "Herramientas de Diagnóstico",
    origin: "Estados Unidos (eBay)",
    price: 850.00,
    weight: "18 lbs",
    status: "Listo para Entrega",
    timeline: [
      { date: "2026-06-16 09:10", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-20 10:30", action: "Recibido en bodega Miami" },
      { date: "2026-06-22 17:45", action: "En Tránsito a Costa Rica" },
      { date: "2026-06-24 14:20", action: "En Aduanas CR (Nacionalizado)" },
      { date: "2026-06-25 15:30", action: "Listo para Entrega en Sede Principal" }
    ]
  },
  {
    id: "TBA19283746501",
    client: "Daniela Castillo",
    content: "Kindle Paperwhite",
    origin: "Estados Unidos (Amazon)",
    price: 139.99,
    weight: "1.2 lbs",
    status: "Recibido en Miami",
    timeline: [
      { date: "2026-06-24 08:30", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-26 13:10", action: "Recibido en bodega Miami" }
    ]
  },
  {
    id: "TBA92837465019",
    client: "Farmacia La Salud",
    content: "Lote Equipos Médicos",
    origin: "Alemania (Siemens)",
    price: 8500.00,
    weight: "65 lbs",
    status: "En Aduanas",
    timeline: [
      { date: "2026-06-18 10:00", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-21 16:30", action: "Recibido en bodega Miami" },
      { date: "2026-06-23 19:00", action: "En Tránsito a Costa Rica" },
      { date: "2026-06-25 09:45", action: "En Aduanas CR (Permisos de Salud requeridos)" }
    ]
  },
  {
    id: "TBA83746501928",
    client: "Eduardo Fallas",
    content: "Guitarra Eléctrica Fender",
    origin: "Estados Unidos (Sweetwater)",
    price: 1800.00,
    weight: "25 lbs",
    status: "Comprado",
    timeline: [
      { date: "2026-06-26 10:15", action: "Orden generada en la tienda de origen" }
    ]
  },
  {
    id: "TBA74650192837",
    client: "Estudio Creativo",
    content: "Impresora 3D Bambu Lab",
    origin: "China (AliExpress)",
    price: 1449.00,
    weight: "35 lbs",
    status: "Entregado",
    timeline: [
      { date: "2026-06-01 08:00", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-10 13:20", action: "Recibido en bodega Miami" },
      { date: "2026-06-12 18:30", action: "En Tránsito a Costa Rica" },
      { date: "2026-06-14 10:15", action: "En Aduanas CR (Liberado)" },
      { date: "2026-06-16 11:00", action: "Entregado a cliente final" }
    ]
  },
  {
    id: "TBA65019283746",
    client: "Andrea Cerdas",
    content: "Juguetes Lego",
    origin: "Estados Unidos (Target)",
    price: 120.00,
    weight: "4.5 lbs",
    status: "En Tránsito a CR",
    timeline: [
      { date: "2026-06-22 14:30", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-24 10:45", action: "Recibido en bodega Miami" },
      { date: "2026-06-25 18:00", action: "En Tránsito a Costa Rica" }
    ]
  },
  {
    id: "TBA50192837465",
    client: "Gimnasio FitnessLife",
    content: "Pesas y Barras Olímpicas",
    origin: "Estados Unidos (Rogue)",
    price: 2150.00,
    weight: "320 lbs",
    status: "En Aduanas",
    timeline: [
      { date: "2026-06-15 11:00", action: "Orden generada en la tienda de origen" },
      { date: "2026-06-20 16:20", action: "Recibido en bodega Miami (Carga Consolidada)" },
      { date: "2026-06-23 09:30", action: "En Tránsito a Costa Rica (Marítimo)" },
      { date: "2026-06-25 14:00", action: "En Aduanas CR (Puerto Limón)" }
    ]
  }
];
