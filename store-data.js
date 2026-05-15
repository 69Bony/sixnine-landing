const SixNineStore = (() => {
  const keys = {
    products: "sixnine-store-products",
    categories: "sixnine-store-categories",
    orders: "sixnine-store-orders",
    customers: "sixnine-store-customers",
    cart: "sixnine-store-cart",
    settings: "sixnine-store-settings",
    landingSettings: "sixnine-landing-settings",
    landingServices: "sixnine-landing-services",
    landingPromos: "sixnine-landing-promos",
    landingLeads: "sixnine-landing-leads",
    landingOrders: "sixnine-landing-orders",
    landingCustomers: "sixnine-landing-customers",
    landingCampaigns: "sixnine-landing-campaigns",
    campaigns: "sixnine-store-campaigns",
    promos: "sixnine-store-promos",
  };

  const categories = [
    { id: "equipos", name: "Equipos armados" },
    { id: "notebooks", name: "Notebooks" },
    { id: "monitores", name: "Monitores" },
    { id: "componentes", name: "Componentes" },
    { id: "perifericos", name: "Periféricos" },
    { id: "accesorios", name: "Accesorios" },
  ];

  const products = [
    {
      id: "pc-ryzen-5600-rtx4060",
      slug: "pc-ryzen-5600-rtx4060",
      sku: "SN-PC-5600-4060",
      brand: "SixNine Store",
      name: "PC Gamer Ryzen 5 + RTX 4060",
      category: "equipos",
      price: 1190,
      compareAt: 1320,
      stock: 3,
      featured: true,
      active: true,
      image: "./assets/Equipos pc 1440x400.png",
      short: "Equipo armado para gaming y edición con gráfica RTX, SSD NVMe y 16 GB RAM.",
      description: "PC lista para usar con Ryzen 5, GeForce RTX 4060, 16 GB de RAM, SSD NVMe de 1 TB, gabinete con airflow y Windows instalado.",
      variants: ["16 GB RAM", "32 GB RAM", "Con monitor 24"],
      warranty: "12 meses",
      specs: ["Ryzen 5", "RTX 4060 8 GB", "16 GB DDR4", "SSD NVMe 1 TB"],
    },
    {
      id: "pc-intel-i5-rtx3050",
      slug: "pc-intel-i5-rtx3050",
      sku: "SN-PC-I5-3050",
      brand: "SixNine Store",
      name: "PC Intel i5 + RTX 3050",
      category: "equipos",
      price: 890,
      compareAt: 990,
      stock: 5,
      featured: true,
      active: true,
      image: "./assets/Equipos pc 1440x400.png",
      short: "PC balanceada para estudio, trabajo, streaming liviano y juegos competitivos.",
      description: "Equipo armado con Intel Core i5, RTX 3050, 16 GB de RAM y SSD de 500 GB. Ideal para quienes quieren rendimiento sin irse a una gama alta.",
      variants: ["SSD 500 GB", "SSD 1 TB", "Con WiFi"],
      warranty: "12 meses",
      specs: ["Intel Core i5", "RTX 3050", "16 GB RAM", "SSD 500 GB"],
    },
    {
      id: "notebook-ryzen-15",
      slug: "notebook-ryzen-15",
      sku: "SN-NB-R5-15",
      brand: "Lenovo",
      name: "Notebook Ryzen 5 15.6",
      category: "notebooks",
      price: 720,
      compareAt: 790,
      stock: 4,
      featured: true,
      active: true,
      image: "./assets/Equipos pc 1440x400.png",
      short: "Notebook para trabajo, estudio y uso diario con buen rendimiento general.",
      description: "Pantalla 15.6 pulgadas Full HD, Ryzen 5, 16 GB RAM y SSD de 512 GB. Buena opción para oficina, clases, diseño liviano y navegación exigente.",
      variants: ["8 GB RAM", "16 GB RAM", "Con mochila"],
      warranty: "12 meses",
      specs: ["Ryzen 5", "15.6 Full HD", "16 GB RAM", "SSD 512 GB"],
    },
    {
      id: "monitor-24-ips-165hz",
      slug: "monitor-24-ips-165hz",
      sku: "SN-MON-24-165",
      brand: "AOC",
      name: "Monitor 24 IPS 165 Hz",
      category: "monitores",
      price: 210,
      compareAt: 249,
      stock: 7,
      featured: false,
      active: true,
      image: "./assets/Equipos pc 1440x400.png",
      short: "Monitor Full HD fluido para gaming, trabajo y setup diario.",
      description: "Panel IPS de 24 pulgadas, tasa de refresco 165 Hz, bajo tiempo de respuesta y conectividad HDMI/DisplayPort.",
      variants: ["24 pulgadas", "Con brazo", "Pack dual"],
      warranty: "12 meses",
      specs: ["24 IPS", "Full HD", "165 Hz", "HDMI / DisplayPort"],
    },
    {
      id: "combo-teclado-mouse-rgb",
      slug: "combo-teclado-mouse-rgb",
      sku: "SN-PER-COMBO",
      brand: "Redragon",
      name: "Combo teclado y mouse RGB",
      category: "perifericos",
      price: 58,
      compareAt: 72,
      stock: 12,
      featured: false,
      active: true,
      image: "./assets/Equipos pc 1440x400.png",
      short: "Combo práctico para armar setup con teclado, mouse y buena respuesta.",
      description: "Teclado gamer retroiluminado, mouse óptico RGB y conexión USB. Una solución rápida para completar el escritorio.",
      variants: ["Español", "Inglés", "Con pad"],
      warranty: "6 meses",
      specs: ["USB", "RGB", "Mouse óptico", "Teclado gamer"],
    },
    {
      id: "ssd-nvme-1tb",
      slug: "ssd-nvme-1tb",
      sku: "SN-SSD-1TB",
      brand: "Kingston",
      name: "SSD NVMe 1 TB",
      category: "componentes",
      price: 92,
      compareAt: 115,
      stock: 10,
      featured: false,
      active: true,
      image: "./assets/Equipos pc 1440x400.png",
      short: "Almacenamiento rápido para mejorar arranque, programas y juegos.",
      description: "Unidad NVMe de 1 TB para notebooks y PCs compatibles. Ideal para actualizar equipos lentos o ampliar espacio.",
      variants: ["Solo producto", "Con instalación", "Pack 2 unidades"],
      warranty: "12 meses",
      specs: ["1 TB", "NVMe", "M.2", "Alta velocidad"],
    },
  ];

  const orders = [
    {
      id: "SN-1001",
      createdAt: "2026-05-08T15:20:00.000Z",
      status: "pagado",
      customer: { name: "Lucia Pereira", email: "lucia@demo.com", phone: "+598 92 000 111", address: "Montevideo" },
      items: [{ id: "pc-ryzen-5600-rtx4060", name: "PC Gamer Ryzen 5 + RTX 4060", price: 1190, quantity: 1, variant: "16 GB RAM" }],
      subtotal: 1190,
      shipping: 0,
      discount: 0,
      total: 1190,
      payment: "Transferencia",
    },
    {
      id: "SN-1002",
      createdAt: "2026-05-09T11:05:00.000Z",
      status: "pendiente",
      customer: { name: "Mateo Silva", email: "mateo@demo.com", phone: "+598 91 222 333", address: "Punta del Este" },
      items: [{ id: "monitor-24-ips-165hz", name: "Monitor 24 IPS 165 Hz", price: 210, quantity: 2, variant: "24 pulgadas" }],
      subtotal: 420,
      shipping: 0,
      discount: 0,
      total: 420,
      payment: "Mercado Pago pendiente",
    },
  ];

  const settings = {
    storeName: "SixNine Store",
    currency: "USD",
    shippingLabel: "Retiro en Montevideo o envío a coordinar",
    shippingCost: 0,
    whatsapp: "59892663598",
    email: "sixninesystems@gmail.com",
  };

  const landingSettings = {
    businessName: "SixNine Systems",
    mainOffer: "Sistemas web y automatización premium",
    services: "Desarrollo web, Ecommerce, Automatización, IA aplicada",
    whatsapp: "59892663598",
    email: "sixninesystems@gmail.com",
    instagram: "@sixnine.systems",
  };

  const landingServices = [
    {
      id: "service-web",
      title: "Desarrollo Web",
      description: "Sitios modernos, responsivos y optimizados para SEO que reflejan tu marca y convierten visitas en clientes.",
      tag: "Web premium",
      price: 490,
      image: "./assets/service-code-premium.jpg",
      active: true,
    },
    {
      id: "service-automation",
      title: "Automatizaciones Inteligentes",
      description: "Flujos de trabajo que eliminan tareas repetitivas y conectan formularios, CRM, WhatsApp y reportes.",
      tag: "n8n + procesos",
      price: 300,
      image: "./assets/portfolio-analytics.jpg",
      active: true,
    },
    {
      id: "service-ai",
      title: "IA aplicada",
      description: "Integraciones con ChatGPT, respuestas asistidas, clasificación de leads y sistemas de soporte.",
      tag: "IA para ventas",
      price: 350,
      image: "./assets/portfolio-crm-ai.jpg",
      active: true,
    },
  ];

  const landingPromos = [
    {
      id: "landing-hero-web",
      title: "Sistemas web y automatización premium",
      text: "Una landing clara para explicar servicios, generar confianza y llevar consultas a WhatsApp.",
      badge: "Landing principal",
      button: "Ver servicios",
      link: "#servicios",
      image: "./assets/portfolio-saas.jpg",
      active: true,
    },
    {
      id: "landing-hero-automation",
      title: "Automatizaciones para vender mejor",
      text: "WhatsApp, Instagram, formularios y datos conectados para operar con menos fricción.",
      badge: "Automatización",
      button: "Ver planes",
      link: "#planes",
      image: "./assets/portfolio-crm-ai.jpg",
      active: true,
    },
  ];

  const landingOrders = [
    {
      id: "SYS-2001",
      createdAt: "2026-05-06T14:10:00.000Z",
      status: "pagado",
      customer: { name: "Camila Rodriguez", email: "camila@demo.com", phone: "+598 94 111 222", address: "Montevideo" },
      items: [{ id: "service-web", name: "Desarrollo Web", price: 490, quantity: 1, variant: "Web premium" }],
      subtotal: 490,
      shipping: 0,
      discount: 0,
      total: 490,
      payment: "Transferencia",
    },
    {
      id: "SYS-2002",
      createdAt: "2026-05-09T17:30:00.000Z",
      status: "pendiente",
      customer: { name: "Bruno Alvarez", email: "bruno@demo.com", phone: "+598 95 333 444", address: "Canelones" },
      items: [{ id: "service-automation", name: "Automatizaciones Inteligentes", price: 300, quantity: 1, variant: "n8n + procesos" }],
      subtotal: 300,
      shipping: 0,
      discount: 0,
      total: 300,
      payment: "A coordinar",
    },
  ];

  const landingLeads = [
    {
      id: "LEAD-3001",
      createdAt: "2026-05-08T12:30:00.000Z",
      name: "Camila Rodriguez",
      email: "camila@demo.com",
      phone: "+598 94 111 222",
      service: "Desarrollo Web",
      message: "Quiero una landing para presentar servicios y recibir consultas por WhatsApp.",
      source: "Formulario landing",
      status: "cotizado",
      estimatedValue: 490,
    },
    {
      id: "LEAD-3002",
      createdAt: "2026-05-09T17:30:00.000Z",
      name: "Bruno Alvarez",
      email: "bruno@demo.com",
      phone: "+598 95 333 444",
      service: "Automatizaciones Inteligentes",
      message: "Necesito conectar formularios, WhatsApp y una planilla de seguimiento.",
      source: "Formulario landing",
      status: "nuevo",
      estimatedValue: 300,
    },
  ];

  const landingCampaigns = [
    {
      id: "landing-ads-meta-services",
      name: "Meta Ads - Servicios web",
      channel: "Meta Ads",
      objective: "Consultas por servicios",
      budget: 220,
      spend: 96,
      leads: 21,
      sales: 490,
      status: "activa",
      startDate: "2026-05-01",
      endDate: "2026-05-31",
    },
    {
      id: "landing-ads-google-automation",
      name: "Google Search - Automatizaciones",
      channel: "Google Ads",
      objective: "Leads calificados",
      budget: 180,
      spend: 64,
      leads: 12,
      sales: 300,
      status: "pausada",
      startDate: "2026-05-03",
      endDate: "2026-06-03",
    },
  ];

  const campaigns = [
    {
      id: "ads-meta-launch",
      name: "Meta Ads - Ofertas de hardware",
      channel: "Meta Ads",
      objective: "Ventas",
      budget: 320,
      spend: 184,
      leads: 34,
      sales: 1190,
      status: "activa",
      startDate: "2026-05-01",
      endDate: "2026-05-31",
    },
    {
      id: "ads-google-search",
      name: "Google Search - PCs y periféricos",
      channel: "Google Ads",
      objective: "Compras y consultas",
      budget: 260,
      spend: 92,
      leads: 18,
      sales: 420,
      status: "pausada",
      startDate: "2026-05-05",
      endDate: "2026-06-05",
    },
  ];

  const promos = [
    {
      id: "promo-pc-armadas",
      title: "Armá tu PC ideal con SixNine Store",
      text: "PC gamer, equipos de trabajo y upgrades con asesoramiento para elegir bien.",
      badge: "PC armadas",
      button: "Ver productos",
      link: "#catalogo",
      image: "./assets/Equipos pc 1440x400.png",
      active: true,
    },
    {
      id: "promo-perifericos",
      title: "Periféricos para completar tu setup",
      text: "Monitores, teclados, mouse, almacenamiento y accesorios con asesoramiento rápido por WhatsApp.",
      badge: "Periféricos",
      button: "Ver ofertas",
      link: "#catalogo",
      image: "./assets/Equipos pc 1440x400.png",
      active: true,
    },
    {
      id: "promo-upgrades",
      title: "Actualizá tu setup sin vueltas",
      text: "SSD, monitores, teclado, mouse y accesorios para mejorar tu equipo rápido.",
      badge: "Upgrades",
      button: "Ver catálogo",
      link: "#catalogo",
      image: "./assets/Equipos pc 1440x400.png",
      active: true,
    },
  ];

  const read = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const write = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  };

  const landingLeadFromOrder = (order) => {
    const statusMap = {
      pendiente: "nuevo",
      pagado: "cerrado",
      enviado: "contactado",
      completado: "cerrado",
      cancelado: "perdido",
    };
    const firstItem = order.items?.[0] || {};
    return {
      id: `LEAD-${order.id}`,
      createdAt: order.createdAt,
      name: order.customer?.name || "Lead sin nombre",
      email: order.customer?.email || "",
      phone: order.customer?.phone || "",
      service: firstItem.name || "Consulta de servicio",
      message: `Consulta demo importada desde ${order.id}.`,
      source: "Formulario landing",
      status: statusMap[order.status] || "nuevo",
      estimatedValue: Number(order.total || firstItem.price || 0),
    };
  };

  const seed = () => {
    if (!localStorage.getItem(keys.products)) write(keys.products, products);
    if (!localStorage.getItem(keys.categories)) write(keys.categories, categories);
    if (!localStorage.getItem(keys.orders)) write(keys.orders, orders);
    if (!localStorage.getItem(keys.customers)) {
      write(keys.customers, orders.map((order) => ({ ...order.customer, lastOrder: order.id, totalSpent: order.total })));
    }
    if (!localStorage.getItem(keys.settings)) write(keys.settings, settings);
    if (!localStorage.getItem(keys.landingSettings)) write(keys.landingSettings, landingSettings);
    if (!localStorage.getItem(keys.landingServices)) write(keys.landingServices, landingServices);
    if (!localStorage.getItem(keys.landingPromos)) write(keys.landingPromos, landingPromos);
    if (!localStorage.getItem(keys.landingLeads)) {
      const importedLeads = read(keys.landingOrders, []).map(landingLeadFromOrder);
      write(keys.landingLeads, importedLeads.length ? importedLeads : landingLeads);
    }
    if (!localStorage.getItem(keys.landingOrders)) write(keys.landingOrders, landingOrders);
    if (!localStorage.getItem(keys.landingCustomers)) {
      write(keys.landingCustomers, landingOrders.map((order) => ({ ...order.customer, lastOrder: order.id, totalSpent: order.total })));
    }
    if (!localStorage.getItem(keys.landingCampaigns)) write(keys.landingCampaigns, landingCampaigns);
    if (!localStorage.getItem(keys.campaigns)) write(keys.campaigns, campaigns);
    if (!localStorage.getItem(keys.promos)) write(keys.promos, promos);
    if (!localStorage.getItem(keys.cart)) write(keys.cart, []);
  };

  const migrate = () => {
    const currentCategories = read(keys.categories, categories);
    const hasServiceCategories = currentCategories.some((category) => ["web", "automation", "ai", "support"].includes(category.id));
    if (hasServiceCategories) write(keys.categories, categories);

    const savedProducts = read(keys.products, products);
    const hasServiceProducts = savedProducts.some((product) => ["landing-premium", "ecommerce-starter", "whatsapp-ai", "n8n-workflows", "dashboard-business", "monthly-care"].includes(product.id));
    const currentProducts = (hasServiceProducts ? products : savedProducts).map((product) => ({
      ...product,
      image: ["./assets/hero-dashboard-key.png", "./assets/portfolio-analytics.jpg", "./assets/portfolio-saas.jpg", "./assets/portfolio-crm-ai.jpg", "./assets/service-code-premium.jpg"].includes(product.image) && ["equipos", "notebooks", "monitores", "componentes", "perifericos", "accesorios"].includes(product.category)
        ? "./assets/Equipos pc 1440x400.png"
        : product.image,
      name: product.name === "Dashboard de negocio" ? "Panel de negocio" : product.name,
      short: product.short === "Tienda online con catálogo, carrito, checkout y panel de gestión."
        ? "Tienda online con catálogo, consultas por WhatsApp y panel de gestión."
        : product.short,
      sku: product.sku || product.id.toUpperCase(),
      brand: product.brand || "SixNine Store",
      warranty: product.warranty || "A coordinar",
      specs: Array.isArray(product.specs) ? product.specs : [],
    }));
    write(keys.products, currentProducts);

    const savedOrders = read(keys.orders, orders);
    const hasServiceOrders = savedOrders.some((order) => order.items?.some((item) => ["landing-premium", "ecommerce-starter", "whatsapp-ai", "n8n-workflows"].includes(item.id)));
    if (hasServiceOrders) {
      write(keys.orders, orders);
      write(keys.customers, orders.map((order) => ({ ...order.customer, lastOrder: order.id, totalSpent: order.total })));
    }

    const currentSettings = read(keys.settings, settings);
    if (currentSettings.shippingLabel === "Entrega digital") {
      write(keys.settings, { ...currentSettings, shippingLabel: settings.shippingLabel });
    }

    const currentCampaigns = read(keys.campaigns, campaigns).map((campaign) => ({
      ...campaign,
      name: ["Meta Ads - Lanzamiento tienda", "Meta Ads - Campaña de tienda", "Meta Ads - Campa\u00f1a de tienda"].includes(campaign.name) ? "Meta Ads - Ofertas de hardware" : campaign.name,
      objective: ["Leads calificados", "Consultas calificadas"].includes(campaign.objective) ? "Compras y consultas" : campaign.objective,
    }));
    write(keys.campaigns, currentCampaigns);
    if (!localStorage.getItem(keys.promos)) write(keys.promos, promos);
    const currentPromos = read(keys.promos, promos).map((promo) => ({
      ...promo,
      title: ["promo-web-premium", "promo-automation"].includes(promo.id) || ["Arm\u00e1 tu tienda online con SixNine", "Arma tu tienda online con SixNine", "Automatiza consultas y ventas", "PC AMD e Intel listas para elegir"].includes(promo.title) ? "Armá tu PC ideal con SixNine Store" : promo.title,
      text: ["promo-web-premium", "promo-automation"].includes(promo.id) || ["Dise\u00f1o, carrito y checkout listos para vender desde el mismo dominio.", "Dise\u00f1o, catálogo, consultas por WhatsApp y checkout listos para vender desde el mismo dominio.", "WhatsApp, formularios y seguimiento conectados para responder más rápido."].includes(promo.text)
        ? "PC gamer, equipos de trabajo y upgrades con asesoramiento para elegir bien."
        : promo.text,
      badge: ["promo-web-premium", "promo-automation"].includes(promo.id) || ["Automatizaci\u00f3n", "Automatización", "Automatizacion", "Promo principal", "Equipos destacados"].includes(promo.badge) ? "PC armadas" : promo.badge,
      button: ["Ver paquetes", "Ver soluciones"].includes(promo.button) ? "Ver productos" : promo.button,
      image: ["./assets/portfolio-ecommerce.jpg", "./assets/portfolio-crm-ai.jpg"].includes(promo.image) ? "./assets/Equipos pc 1440x400.png" : promo.image,
    }));
    write(keys.promos, currentPromos.some((promo) => promo.id === "promo-upgrades") ? currentPromos : [...currentPromos, promos.find((promo) => promo.id === "promo-upgrades")]);
    const currentLandingServices = read(keys.landingServices, landingServices).map((service) => ({
      ...service,
      price: Number(service.price || landingServices.find((item) => item.id === service.id)?.price || 0),
    }));
    write(keys.landingServices, currentLandingServices);
    if (!localStorage.getItem(keys.landingLeads)) {
      const importedLeads = read(keys.landingOrders, landingOrders).map(landingLeadFromOrder);
      write(keys.landingLeads, importedLeads.length ? importedLeads : landingLeads);
    }
    if (!localStorage.getItem(keys.landingPromos)) write(keys.landingPromos, landingPromos);
    if (!localStorage.getItem(keys.landingOrders)) write(keys.landingOrders, landingOrders);
    if (!localStorage.getItem(keys.landingCustomers)) {
      write(keys.landingCustomers, landingOrders.map((order) => ({ ...order.customer, lastOrder: order.id, totalSpent: order.total })));
    }
    if (!localStorage.getItem(keys.landingCampaigns)) write(keys.landingCampaigns, landingCampaigns);
  };

  const money = (value) => {
    const current = read(keys.settings, settings);
    return new Intl.NumberFormat("es-UY", { style: "currency", currency: current.currency }).format(Number(value || 0));
  };

  const uid = (prefix = "SN") => `${prefix}-${Date.now().toString().slice(-6)}`;

  seed();
  migrate();

  return {
    keys,
    money,
    uid,
    getProducts: () => read(keys.products, products),
    saveProducts: (value) => write(keys.products, value),
    getCategories: () => read(keys.categories, categories),
    saveCategories: (value) => write(keys.categories, value),
    getOrders: () => read(keys.orders, orders),
    saveOrders: (value) => write(keys.orders, value),
    getCustomers: () => read(keys.customers, []),
    saveCustomers: (value) => write(keys.customers, value),
    getCart: () => read(keys.cart, []),
    saveCart: (value) => write(keys.cart, value),
    getSettings: () => read(keys.settings, settings),
    saveSettings: (value) => write(keys.settings, value),
    getLandingSettings: () => read(keys.landingSettings, landingSettings),
    saveLandingSettings: (value) => write(keys.landingSettings, value),
    getLandingServices: () => read(keys.landingServices, landingServices),
    saveLandingServices: (value) => write(keys.landingServices, value),
    getLandingPromos: () => read(keys.landingPromos, landingPromos),
    saveLandingPromos: (value) => write(keys.landingPromos, value),
    getLandingLeads: () => read(keys.landingLeads, landingLeads),
    saveLandingLeads: (value) => write(keys.landingLeads, value),
    getLandingOrders: () => read(keys.landingOrders, landingOrders),
    saveLandingOrders: (value) => write(keys.landingOrders, value),
    getLandingCustomers: () => read(keys.landingCustomers, []),
    saveLandingCustomers: (value) => write(keys.landingCustomers, value),
    getLandingCampaigns: () => read(keys.landingCampaigns, landingCampaigns),
    saveLandingCampaigns: (value) => write(keys.landingCampaigns, value),
    getCampaigns: () => read(keys.campaigns, campaigns),
    saveCampaigns: (value) => write(keys.campaigns, value),
    getPromos: () => read(keys.promos, promos),
    savePromos: (value) => write(keys.promos, value),
  };
})();
