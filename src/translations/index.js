import { useLanguage } from '../contexts/LanguageContext';

export const translations = {
  fr: {
    flag: '🇫',
    // Navigation
    home: 'Accueil',
    categories: 'Catégories',
    technical: 'Spécifications',
    b2b: 'Solutions B2B',
    contact: 'Contact',
    support: 'Support Technique',
    login: 'Connexion',
    register: 'Inscription',
    dashboard: 'Tableau de Bord',
    logout: 'Déconnexion',
    admin: 'Admin',
    
    // Common
    requestCatalog: 'Demander Catalogue',
    addToCart: 'Ajouter au Panier',
    viewCart: 'Voir Panier',
    checkout: 'Commander',
    readMore: 'Lire Plus',
    learnMore: 'En Savoir Plus',
    name: 'Nom',
    email: 'Email',
    company: 'Entreprise',
    message: 'Message',
    sendMessage: 'Envoyer le Message',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    postalCode: 'Code Postal',
    country: 'Pays',
    currency: 'Devise',
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    add: 'Ajouter',
    
    // Product Categories
    valves: 'Robinets',
    fittings: 'Raccords',
    elbows: 'Coudes',
    tees: 'Tés',
    nipples: 'Mamelons',
    reducers: 'Réductions',
    hoses: 'Tuyaux',
    gaskets: 'Joints',
    tools: 'Outils',
    accessories: 'Accessoires',
    
    // Technical Specs
    nominalDiameter: 'Diamètre Nominal',
    material: 'Matériau',
    pressureRating: 'Pression Nominale',
    temperatureRange: 'Plage de Température',
    threadType: 'Type de Filetage',
    certification: 'Certification',
    weight: 'Poids',
    dimensions: 'Dimensions',
    
    // Admin Panel
    adminPanel: 'Panneau d\'Administration',
    manageProducts: 'Gérer les Produits',
    managePricing: 'Gérer les Prix',
    manageContent: 'Gérer le Contenu',
    manageUsers: 'Gérer les Utilisateurs',
    manageOrders: 'Gérer les Commandes',
    manageInventory: 'Gérer le Stock',
    settings: 'Paramètres',
    addProduct: 'Ajouter un Produit',
    editProduct: 'Modifier le Produit',
    deleteProduct: 'Supprimer le Produit',
    productName: 'Nom du Produit',
    productDescription: 'Description du Produit',
    productSpecs: 'Spécifications',
    productPrice: 'Prix',
    productStock: 'Stock',
    saveChanges: 'Enregistrer les Modifications',
    uploadLogo: 'Télécharger le Logo',
    companyName: 'Nom de l\'Entreprise',
    defaultLanguage: 'Langue par Défaut',
    currency: 'Devise',
    maintenanceMode: 'Mode Maintenance',
    
    // Hero Section
    heroTitle: 'PipeSan - Pièces d\'Installation Professionnelles',
    heroSubtitle: 'Robinets, raccords, vannes et composants de qualité professionnelle. Livraison rapide en Europe avec spécifications techniques complètes.',
    
    // Services
    qualityGuarantee: 'Garantie Qualité',
    technicalSupport: 'Support Technique',
    fastDelivery: 'Livraison Rapide',
    certifiedProducts: 'Produits Certifiés',
    
    // Contact
    contactTitle: 'Contactez-nous',
    contactSubtitle: 'Besoin d\'aide pour vos projets d\'installation ? Notre équipe technique est là pour vous conseiller.',
    
    // Footer
    quickLinks: 'Liens Rapides',
    contactInfo: 'Contact',
    businessHours: 'Heures d\'Ouverture',
    
    // About
    aboutTitle: 'Fournisseur Européen de Pièces d\'Installation Professionnelles',
    aboutSubtitle: 'Spécialiste en robinetterie et raccords depuis 2020. Qualité professionnelle, certifications CE et livraison rapide.',
    
    // Pricing
    pricingTitle: 'Produits et Prix',
    pricingSubtitle: 'Gamme complète de pièces d\'installation avec prix compétitifs pour professionnels.',
    
    // Blog
    blogTitle: 'Guide Technique',
    blogSubtitle: 'Guides d\'installation, spécifications techniques et conseils d\'experts pour professionnels.',
    
    // Auth
    loginTitle: 'Connexion',
    registerTitle: 'Créer un Compte',
    password: 'Mot de Passe',
    confirmPassword: 'Confirmer le Mot de Passe',
    forgotPassword: 'Mot de Passe Oublié?',
    
    // Dashboard
    personalData: 'Données Personnelles',
    addresses: 'Adresses',
    billingProfiles: 'Profils de Facturation',
    invoices: 'Mes Factures',
    orders: 'Mes Commandes',
    returns: 'Retours/RMA',
    security: 'Sécurité'
  },
  
  en: {
    // Navigation
    home: 'Home',
    categories: 'Categories',
    technical: 'Technical Specs',
    b2b: 'B2B Solutions',
    contact: 'Contact',
    support: 'Technical Support',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    logout: 'Logout',
    admin: 'Admin',
    
    // Common
    requestCatalog: 'Request Catalog',
    addToCart: 'Add to Cart',
    viewCart: 'View Cart',
    checkout: 'Checkout',
    readMore: 'Read More',
    learnMore: 'Learn More',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    message: 'Message',
    sendMessage: 'Send Message',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    postalCode: 'Postal Code',
    country: 'Country',
    currency: 'Currency',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    
    // Product Categories
    valves: 'Valves',
    fittings: 'Fittings',
    elbows: 'Elbows',
    tees: 'Tees',
    nipples: 'Nipples',
    reducers: 'Reducers',
    hoses: 'Hoses',
    gaskets: 'Gaskets',
    tools: 'Tools',
    accessories: 'Accessories',
    
    // Technical Specs
    nominalDiameter: 'Nominal Diameter',
    material: 'Material',
    pressureRating: 'Pressure Rating',
    temperatureRange: 'Temperature Range',
    threadType: 'Thread Type',
    certification: 'Certification',
    weight: 'Weight',
    dimensions: 'Dimensions',
    
    // Admin Panel
    adminPanel: 'Admin Panel',
    manageProducts: 'Manage Products',
    managePricing: 'Manage Pricing',
    manageContent: 'Manage Content',
    manageUsers: 'Manage Users',
    manageOrders: 'Manage Orders',
    manageInventory: 'Manage Inventory',
    settings: 'Settings',
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    deleteProduct: 'Delete Product',
    productName: 'Product Name',
    productDescription: 'Product Description',
    productSpecs: 'Specifications',
    productPrice: 'Price',
    productStock: 'Stock',
    saveChanges: 'Save Changes',
    uploadLogo: 'Upload Logo',
    companyName: 'Company Name',
    defaultLanguage: 'Default Language',
    currency: 'Currency',
    maintenanceMode: 'Maintenance Mode',
    
    // Hero Section
    heroTitle: 'PipeSan - Professional Plumbing Parts',
    heroSubtitle: 'Valves, fittings, connectors and professional installation components. Fast EU delivery with complete technical specifications.',
    
    // Services
    qualityGuarantee: 'Quality Guarantee',
    technicalSupport: 'Technical Support',
    fastDelivery: 'Fast Delivery',
    certifiedProducts: 'Certified Products',
    
    // Contact
    contactTitle: 'Get In Touch',
    contactSubtitle: 'Need help with your installation projects? Our technical team is here to advise you.',
    
    // Footer
    quickLinks: 'Quick Links',
    contactInfo: 'Contact',
    businessHours: 'Business Hours',
    
    // About
    aboutTitle: 'European Professional Installation Parts Supplier',
    aboutSubtitle: 'Specialist in valves and fittings since 2020. Professional quality, CE certifications and fast delivery.',
    
    // Pricing
    pricingTitle: 'Products & Pricing',
    pricingSubtitle: 'Complete range of installation parts with competitive pricing for professionals.',
    
    // Blog
    blogTitle: 'Technical Guide',
    blogSubtitle: 'Installation guides, technical specifications and expert advice for professionals.',
    
    // Auth
    loginTitle: 'Login',
    registerTitle: 'Create Account',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    
    // Dashboard
    personalData: 'Personal Data',
    addresses: 'Addresses',
    billingProfiles: 'Billing Profiles',
    invoices: 'My Invoices',
    orders: 'My Orders',
    returns: 'Returns/RMA',
    security: 'Security'
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    categories: 'Kategorien',
    technical: 'Technische Daten',
    b2b: 'B2B Lösungen',
    contact: 'Kontakt',
    support: 'Technischer Support',
    login: 'Anmelden',
    register: 'Registrieren',
    dashboard: 'Dashboard',
    logout: 'Abmelden',
    admin: 'Admin',
    
    // Common
    requestCatalog: 'Katalog Anfordern',
    addToCart: 'In den Warenkorb',
    viewCart: 'Warenkorb Anzeigen',
    checkout: 'Zur Kasse',
    readMore: 'Mehr Lesen',
    learnMore: 'Mehr Erfahren',
    name: 'Name',
    email: 'E-Mail',
    company: 'Unternehmen',
    message: 'Nachricht',
    sendMessage: 'Nachricht Senden',
    phone: 'Telefon',
    address: 'Adresse',
    city: 'Stadt',
    postalCode: 'Postleitzahl',
    country: 'Land',
    currency: 'Währung',
    save: 'Speichern',
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    add: 'Hinzufügen',
    
    // Product Categories
    valves: 'Ventile',
    fittings: 'Fittings',
    elbows: 'Bögen',
    tees: 'T-Stücke',
    nipples: 'Nippel',
    reducers: 'Reduzierstücke',
    hoses: 'Schläuche',
    gaskets: 'Dichtungen',
    tools: 'Werkzeuge',
    accessories: 'Zubehör',
    
    // Technical Specs
    nominalDiameter: 'Nenndurchmesser',
    material: 'Material',
    pressureRating: 'Druckstufe',
    temperatureRange: 'Temperaturbereich',
    threadType: 'Gewindeart',
    certification: 'Zertifizierung',
    weight: 'Gewicht',
    dimensions: 'Abmessungen',
    
    // Admin Panel
    adminPanel: 'Admin-Panel',
    manageProducts: 'Produkte Verwalten',
    managePricing: 'Preise Verwalten',
    manageContent: 'Inhalte Verwalten',
    manageUsers: 'Benutzer Verwalten',
    manageOrders: 'Bestellungen Verwalten',
    manageInventory: 'Lager Verwalten',
    settings: 'Einstellungen',
    addProduct: 'Produkt Hinzufügen',
    editProduct: 'Produkt Bearbeiten',
    deleteProduct: 'Produkt Löschen',
    productName: 'Produktname',
    productDescription: 'Produktbeschreibung',
    productSpecs: 'Spezifikationen',
    productPrice: 'Preis',
    productStock: 'Lagerbestand',
    saveChanges: 'Änderungen Speichern',
    uploadLogo: 'Logo Hochladen',
    companyName: 'Firmenname',
    defaultLanguage: 'Standardsprache',
    currency: 'Währung',
    maintenanceMode: 'Wartungsmodus',
    
    // Hero Section
    heroTitle: 'PipeSan - Professionelle Installationsteile',
    heroSubtitle: 'Ventile, Fittings, Anschlüsse und professionelle Installationskomponenten. Schnelle EU-Lieferung mit vollständigen technischen Spezifikationen.',
    
    // Services
    qualityGuarantee: 'Qualitätsgarantie',
    technicalSupport: 'Technischer Support',
    fastDelivery: 'Schnelle Lieferung',
    certifiedProducts: 'Zertifizierte Produkte',
    
    // Contact
    contactTitle: 'Kontakt Aufnehmen',
    contactSubtitle: 'Benötigen Sie Hilfe bei Ihren Installationsprojekten? Unser technisches Team berät Sie gerne.',
    
    // Footer
    quickLinks: 'Schnelllinks',
    contactInfo: 'Kontakt',
    businessHours: 'Geschäftszeiten',
    
    // About
    aboutTitle: 'Europäischer Anbieter für professionelle Installationsteile',
    aboutSubtitle: 'Spezialist für Armaturen und Fittings seit 2020. Professionelle Qualität, CE-Zertifizierungen und schnelle Lieferung.',
    
    // Pricing
    pricingTitle: 'Produkte & Preise',
    pricingSubtitle: 'Komplettes Sortiment an Installationsteilen mit wettbewerbsfähigen Preisen für Profis.',
    
    // Blog
    blogTitle: 'Technischer Leitfaden',
    blogSubtitle: 'Installationsanleitungen, technische Spezifikationen und Expertenrat für Profis.',
    
    // Auth
    loginTitle: 'Anmelden',
    registerTitle: 'Konto Erstellen',
    password: 'Passwort',
    confirmPassword: 'Passwort Bestätigen',
    forgotPassword: 'Passwort Vergessen?',
    
    // Dashboard
    personalData: 'Persönliche Daten',
    addresses: 'Adressen',
    billingProfiles: 'Rechnungsprofile',
    invoices: 'Meine Rechnungen',
    orders: 'Meine Bestellungen',
    returns: 'Rücksendungen/RMA',
    security: 'Sicherheit'
  },
  
  nl: {
    // Navigation
    home: 'Home',
    categories: 'Categorieën',
    technical: 'Technische Specs',
    b2b: 'B2B Oplossingen',
    contact: 'Contact',
    support: 'Technische Ondersteuning',
    login: 'Inloggen',
    register: 'Registreren',
    dashboard: 'Dashboard',
    logout: 'Uitloggen',
    admin: 'Admin',
    
    // Common
    requestCatalog: 'Catalogus Aanvragen',
    addToCart: 'Toevoegen aan Winkelwagen',
    viewCart: 'Winkelwagen Bekijken',
    checkout: 'Afrekenen',
    readMore: 'Lees Meer',
    learnMore: 'Meer Weten',
    name: 'Naam',
    email: 'E-mail',
    company: 'Bedrijf',
    message: 'Bericht',
    sendMessage: 'Bericht Versturen',
    phone: 'Telefoon',
    address: 'Adres',
    city: 'Stad',
    postalCode: 'Postcode',
    country: 'Land',
    currency: 'Valuta',
    save: 'Opslaan',
    cancel: 'Annuleren',
    edit: 'Bewerken',
    delete: 'Verwijderen',
    add: 'Toevoegen',
    
    // Product Categories
    valves: 'Kranen',
    fittings: 'Koppelingen',
    elbows: 'Bochten',
    tees: 'T-stukken',
    nipples: 'Nippels',
    reducers: 'Reducties',
    hoses: 'Slangen',
    gaskets: 'Pakkingen',
    tools: 'Gereedschap',
    accessories: 'Accessoires',
    
    // Technical Specs
    nominalDiameter: 'Nominale Diameter',
    material: 'Materiaal',
    pressureRating: 'Drukklasse',
    temperatureRange: 'Temperatuurbereik',
    threadType: 'Schroefdraadtype',
    certification: 'Certificering',
    weight: 'Gewicht',
    dimensions: 'Afmetingen',
    
    // Admin Panel
    adminPanel: 'Beheerpaneel',
    manageProducts: 'Producten Beheren',
    managePricing: 'Prijzen Beheren',
    manageContent: 'Inhoud Beheren',
    manageUsers: 'Gebruikers Beheren',
    manageOrders: 'Bestellingen Beheren',
    manageInventory: 'Voorraad Beheren',
    settings: 'Instellingen',
    addProduct: 'Product Toevoegen',
    editProduct: 'Product Bewerken',
    deleteProduct: 'Product Verwijderen',
    productName: 'Productnaam',
    productDescription: 'Productbeschrijving',
    productSpecs: 'Specificaties',
    productPrice: 'Prijs',
    productStock: 'Voorraad',
    saveChanges: 'Wijzigingen Opslaan',
    uploadLogo: 'Logo Uploaden',
    companyName: 'Bedrijfsnaam',
    defaultLanguage: 'Standaardtaal',
    currency: 'Valuta',
    maintenanceMode: 'Onderhoudsmodus',
    
    // Hero Section
    heroTitle: 'PipeSan - Professionele Installatieonderdelen',
    heroSubtitle: 'Kranen, koppelingen, aansluitingen en professionele installatiecomponenten. Snelle EU-levering met volledige technische specificaties.',
    
    // Services
    qualityGuarantee: 'Kwaliteitsgarantie',
    technicalSupport: 'Technische Ondersteuning',
    fastDelivery: 'Snelle Levering',
    certifiedProducts: 'Gecertificeerde Producten',
    
    // Contact
    contactTitle: 'Contact Opnemen',
    contactSubtitle: 'Hulp nodig bij uw installatieprojecten? Ons technische team adviseert u graag.',
    
    // Footer
    quickLinks: 'Snelle Links',
    contactInfo: 'Contact',
    businessHours: 'Openingstijden',
    
    // About
    aboutTitle: 'Europese Leverancier van Professionele Installatieonderdelen',
    aboutSubtitle: 'Specialist in kranen en koppelingen sinds 2020. Professionele kwaliteit, CE-certificeringen en snelle levering.',
    
    // Pricing
    pricingTitle: 'Producten & Prijzen',
    pricingSubtitle: 'Compleet assortiment installatieonderdelen met concurrerende prijzen voor professionals.',
    
    // Blog
    blogTitle: 'Technische Gids',
    blogSubtitle: 'Installatiegidsen, technische specificaties en deskundig advies voor professionals.',
    
    // Auth
    loginTitle: 'Inloggen',
    registerTitle: 'Account Aanmaken',
    password: 'Wachtwoord',
    confirmPassword: 'Wachtwoord Bevestigen',
    forgotPassword: 'Wachtwoord Vergeten?',
    
    // Dashboard
    personalData: 'Persoonlijke Gegevens',
    addresses: 'Adressen',
    billingProfiles: 'Facturatieprofielen',
    invoices: 'Mijn Facturen',
    orders: 'Mijn Bestellingen',
    returns: 'Retouren/RMA',
    security: 'Beveiliging'
  },
  
  es: {
    flag: '🇮',
    // Navigation
    home: 'Home',
    categories: 'Categorías',
    technical: 'Especificaciones',
    b2b: 'Soluciones B2B',
    contact: 'Contacto',
    support: 'Soporte Técnico',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    dashboard: 'Panel',
    logout: 'Cerrar Sesión',
    admin: 'Admin',
    
    // Common
    requestCatalog: 'Solicitar Catálogo',
    addToCart: 'Añadir al Carrito',
    viewCart: 'Ver Carrito',
    checkout: 'Finalizar Compra',
    readMore: 'Leer Más',
    learnMore: 'Saber Más',
    name: 'Nombre',
    email: 'Email',
    company: 'Empresa',
    message: 'Mensaje',
    sendMessage: 'Enviar Mensaje',
    phone: 'Teléfono',
    address: 'Dirección',
    city: 'Ciudad',
    postalCode: 'Código Postal',
    country: 'País',
    currency: 'Moneda',
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    add: 'Añadir',
    
    // Product Categories
    valves: 'Válvulas',
    fittings: 'Racores',
    elbows: 'Codos',
    tees: 'Tes',
    nipples: 'Niples',
    reducers: 'Reducciones',
    hoses: 'Mangueras',
    gaskets: 'Juntas',
    tools: 'Herramientas',
    accessories: 'Accesorios',
    
    // Technical Specs
    nominalDiameter: 'Diámetro Nominal',
    material: 'Material',
    pressureRating: 'Presión Nominal',
    temperatureRange: 'Rango de Temperatura',
    threadType: 'Tipo de Rosca',
    certification: 'Certificación',
    weight: 'Peso',
    dimensions: 'Dimensiones',
    
    // Admin Panel
    adminPanel: 'Panel de Administración',
    manageProducts: 'Gestionar Productos',
    managePricing: 'Gestionar Precios',
    manageContent: 'Gestionar Contenido',
    manageUsers: 'Gestionar Usuarios',
    manageOrders: 'Gestionar Pedidos',
    manageInventory: 'Gestionar Inventario',
    settings: 'Configuración',
    addProduct: 'Añadir Producto',
    editProduct: 'Editar Producto',
    deleteProduct: 'Eliminar Producto',
    productName: 'Nombre del Producto',
    productDescription: 'Descripción del Producto',
    productSpecs: 'Especificaciones',
    productPrice: 'Precio',
    productStock: 'Stock',
    saveChanges: 'Guardar Cambios',
    uploadLogo: 'Subir Logo',
    companyName: 'Nombre de la Empresa',
    defaultLanguage: 'Idioma Predeterminado',
    currency: 'Moneda',
    maintenanceMode: 'Modo Mantenimiento',
    
    // Hero Section
    heroTitle: 'PipeSan - Piezas de Instalación Profesionales',
    heroSubtitle: 'Válvulas, racores, conectores y componentes de instalación profesionales. Entrega rápida en la UE con especificaciones técnicas completas.',
    
    // Services
    qualityGuarantee: 'Garantía de Calidad',
    technicalSupport: 'Soporte Técnico',
    fastDelivery: 'Entrega Rápida',
    certifiedProducts: 'Productos Certificados',
    
    // Contact
    contactTitle: 'Ponerse en Contacto',
    contactSubtitle: '¿Necesita ayuda con sus proyectos de instalación? Nuestro equipo técnico está aquí para asesorarle.',
    
    // Footer
    quickLinks: 'Enlaces Rápidos',
    contactInfo: 'Contacto',
    businessHours: 'Horario Comercial',
    
    // About
    aboutTitle: 'Proveedor Europeo de Piezas de Instalación Profesionales',
    aboutSubtitle: 'Especialista en grifería y racores desde 2020. Calidad profesional, certificaciones CE y entrega rápida.',
    
    // Pricing
    pricingTitle: 'Productos y Precios',
    pricingSubtitle: 'Gama completa de piezas de instalación con precios competitivos para profesionales.',
    
    // Blog
    blogTitle: 'Guía Técnica',
    blogSubtitle: 'Guías de instalación, especificaciones técnicas y consejos de expertos para profesionales.',
    
    // Auth
    loginTitle: 'Iniciar Sesión',
    registerTitle: 'Crear Cuenta',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    forgotPassword: '¿Olvidaste la Contraseña?',
    
    // Dashboard
    personalData: 'Datos Personales',
    addresses: 'Direcciones',
    billingProfiles: 'Perfiles de Facturación',
    invoices: 'Mis Facturas',
    orders: 'Mis Pedidos',
    returns: 'Devoluciones/RMA',
    security: 'Seguridad'
  },
  
  it: {
    // Navigation
    home: 'Home',
    categories: 'Categorie',
    technical: 'Specifiche Tecniche',
    b2b: 'Soluzioni B2B',
    contact: 'Contatto',
    support: 'Supporto Tecnico',
    login: 'Accedi',
    register: 'Registrati',
    dashboard: 'Dashboard',
    logout: 'Esci',
    admin: 'Admin',
    
    // Common
    requestCatalog: 'Richiedi Catalogo',
    addToCart: 'Aggiungi al Carrello',
    viewCart: 'Visualizza Carrello',
    checkout: 'Procedi all\'Ordine',
    readMore: 'Leggi di Più',
    learnMore: 'Scopri di Più',
    name: 'Nome',
    email: 'Email',
    company: 'Azienda',
    message: 'Messaggio',
    sendMessage: 'Invia Messaggio',
    phone: 'Telefono',
    address: 'Indirizzo',
    city: 'Città',
    postalCode: 'Codice Postale',
    country: 'Paese',
    currency: 'Valuta',
    save: 'Salva',
    cancel: 'Annulla',
    edit: 'Modifica',
    delete: 'Elimina',
    add: 'Aggiungi',
    
    // Product Categories
    valves: 'Valvole',
    fittings: 'Raccordi',
    elbows: 'Gomiti',
    tees: 'Tè',
    nipples: 'Nippli',
    reducers: 'Riduzioni',
    hoses: 'Tubi',
    gaskets: 'Guarnizioni',
    tools: 'Strumenti',
    accessories: 'Accessori',
    
    // Technical Specs
    nominalDiameter: 'Diametro Nominale',
    material: 'Materiale',
    pressureRating: 'Pressione Nominale',
    temperatureRange: 'Range di Temperatura',
    threadType: 'Tipo di Filettatura',
    certification: 'Certificazione',
    weight: 'Peso',
    dimensions: 'Dimensioni',
    
    // Admin Panel
    adminPanel: 'Pannello di Amministrazione',
    manageProducts: 'Gestisci Prodotti',
    managePricing: 'Gestisci Prezzi',
    manageContent: 'Gestisci Contenuti',
    manageUsers: 'Gestisci Utenti',
    manageOrders: 'Gestisci Ordini',
    manageInventory: 'Gestisci Inventario',
    settings: 'Impostazioni',
    addProduct: 'Aggiungi Prodotto',
    editProduct: 'Modifica Prodotto',
    deleteProduct: 'Elimina Prodotto',
    productName: 'Nome Prodotto',
    productDescription: 'Descrizione Prodotto',
    productSpecs: 'Specifiche',
    productPrice: 'Prezzo',
    productStock: 'Scorte',
    saveChanges: 'Salva Modifiche',
    uploadLogo: 'Carica Logo',
    companyName: 'Nome Azienda',
    defaultLanguage: 'Lingua Predefinita',
    currency: 'Valuta',
    maintenanceMode: 'Modalità Manutenzione',
    
    // Hero Section
    heroTitle: 'PipeSan - Componenti di Installazione Professionali',
    heroSubtitle: 'Valvole, raccordi, connettori e componenti di installazione professionali. Consegna rapida UE con specifiche tecniche complete.',
    
    // Services
    qualityGuarantee: 'Garanzia di Qualità',
    technicalSupport: 'Supporto Tecnico',
    fastDelivery: 'Consegna Rapida',
    certifiedProducts: 'Prodotti Certificati',
    
    // Contact
    contactTitle: 'Mettiti in Contatto',
    contactSubtitle: 'Hai bisogno di aiuto per i tuoi progetti di installazione? Il nostro team tecnico è qui per consigliarti.',
    
    // Footer
    quickLinks: 'Link Rapidi',
    contactInfo: 'Contatto',
    businessHours: 'Orari di Lavoro',
    
    // About
    aboutTitle: 'Fornitore Europeo di Componenti di Installazione Professionali',
    aboutSubtitle: 'Specialista in rubinetteria e raccordi dal 2020. Qualità professionale, certificazioni CE e consegna rapida.',
    
    // Pricing
    pricingTitle: 'Prodotti e Prezzi',
    pricingSubtitle: 'Gamma completa di componenti di installazione con prezzi competitivi per professionisti.',
    
    // Blog
    blogTitle: 'Guida Tecnica',
    blogSubtitle: 'Guide di installazione, specifiche tecniche e consigli di esperti per professionisti.',
    
    // Auth
    loginTitle: 'Accedi',
    registerTitle: 'Crea Account',
    password: 'Password',
    confirmPassword: 'Conferma Password',
    forgotPassword: 'Password Dimenticata?',
    
    // Dashboard
    personalData: 'Dati Personali',
    addresses: 'Indirizzi',
    billingProfiles: 'Profili di Fatturazione',
    invoices: 'Le Mie Fatture',
    orders: 'I Miei Ordini',
    returns: 'Resi/RMA',
    security: 'Sicurezza'
  },
  
  pl: {
    // Navigation
    home: 'Strona Główna',
    categories: 'Kategorie',
    technical: 'Specyfikacje',
    b2b: 'Rozwiązania B2B',
    contact: 'Kontakt',
    support: 'Wsparcie Techniczne',
    login: 'Zaloguj',
    register: 'Zarejestruj',
    dashboard: 'Panel',
    logout: 'Wyloguj',
    admin: 'Admin',
    
    // Common
    requestCatalog: 'Zamów Katalog',
    addToCart: 'Dodaj do Koszyka',
    viewCart: 'Zobacz Koszyk',
    checkout: 'Złóż Zamówienie',
    readMore: 'Czytaj Więcej',
    learnMore: 'Dowiedz Się Więcej',
    name: 'Imię',
    email: 'Email',
    company: 'Firma',
    message: 'Wiadomość',
    sendMessage: 'Wyślij Wiadomość',
    phone: 'Telefon',
    address: 'Adres',
    city: 'Miasto',
    postalCode: 'Kod Pocztowy',
    country: 'Kraj',
    currency: 'Waluta',
    save: 'Zapisz',
    cancel: 'Anuluj',
    edit: 'Edytuj',
    delete: 'Usuń',
    add: 'Dodaj',
    
    // Product Categories
    valves: 'Zawory',
    fittings: 'Złączki',
    elbows: 'Kolanka',
    tees: 'Trójniki',
    nipples: 'Niple',
    reducers: 'Redukcje',
    hoses: 'Węże',
    gaskets: 'Uszczelki',
    tools: 'Narzędzia',
    accessories: 'Akcesoria',
    
    // Technical Specs
    nominalDiameter: 'Średnica Nominalna',
    material: 'Materiał',
    pressureRating: 'Ciśnienie Nominalne',
    temperatureRange: 'Zakres Temperatur',
    threadType: 'Typ Gwintu',
    certification: 'Certyfikacja',
    weight: 'Waga',
    dimensions: 'Wymiary',
    
    // Admin Panel
    adminPanel: 'Panel Administratora',
    manageProducts: 'Zarządzaj Produktami',
    managePricing: 'Zarządzaj Cenami',
    manageContent: 'Zarządzaj Treścią',
    manageUsers: 'Zarządzaj Użytkownikami',
    manageOrders: 'Zarządzaj Zamówieniami',
    manageInventory: 'Zarządzaj Magazynem',
    settings: 'Ustawienia',
    addProduct: 'Dodaj Produkt',
    editProduct: 'Edytuj Produkt',
    deleteProduct: 'Usuń Produkt',
    productName: 'Nazwa Produktu',
    productDescription: 'Opis Produktu',
    productSpecs: 'Specyfikacje',
    productPrice: 'Cena',
    productStock: 'Stan Magazynowy',
    saveChanges: 'Zapisz Zmiany',
    uploadLogo: 'Prześlij Logo',
    companyName: 'Nazwa Firmy',
    defaultLanguage: 'Język Domyślny',
    currency: 'Waluta',
    maintenanceMode: 'Tryb Konserwacji',
    
    // Hero Section
    heroTitle: 'PipeSan - Profesjonalne Części Instalacyjne',
    heroSubtitle: 'Zawory, złączki, łączniki i profesjonalne komponenty instalacyjne. Szybka dostawa UE z kompletnymi specyfikacjami technicznymi.',
    
    // Services
    qualityGuarantee: 'Gwarancja Jakości',
    technicalSupport: 'Wsparcie Techniczne',
    fastDelivery: 'Szybka Dostawa',
    certifiedProducts: 'Certyfikowane Produkty',
    
    // Contact
    contactTitle: 'Skontaktuj Się',
    contactSubtitle: 'Potrzebujesz pomocy z projektami instalacyjnymi? Nasz zespół techniczny jest tutaj, aby Ci doradzić.',
    
    // Footer
    quickLinks: 'Szybkie Linki',
    contactInfo: 'Kontakt',
    businessHours: 'Godziny Pracy',
    
    // About
    aboutTitle: 'Europejski Dostawca Profesjonalnych Części Instalacyjnych',
    aboutSubtitle: 'Specjalista w dziedzinie armatury i złączek od 2020 roku. Profesjonalna jakość, certyfikaty CE i szybka dostawa.',
    
    // Pricing
    pricingTitle: 'Produkty i Ceny',
    pricingSubtitle: 'Kompletny asortyment części instalacyjnych w konkurencyjnych cenach dla profesjonalistów.',
    
    // Blog
    blogTitle: 'Przewodnik Techniczny',
    blogSubtitle: 'Przewodniki instalacyjne, specyfikacje techniczne i porady ekspertów dla profesjonalistów.',
    
    // Auth
    loginTitle: 'Zaloguj Się',
    registerTitle: 'Utwórz Konto',
    password: 'Hasło',
    confirmPassword: 'Potwierdź Hasło',
    forgotPassword: 'Zapomniałeś Hasła?',
    
    // Dashboard
    personalData: 'Dane Osobowe',
    addresses: 'Adresy',
    billingProfiles: 'Profile Rozliczeniowe',
    invoices: 'Moje Faktury',
    orders: 'Moje Zamówienia',
    returns: 'Zwroty/RMA',
    security: 'Bezpieczeństwo'
  },
  
  ro: {
    // Navigation
    home: 'Acasă',
    categories: 'Categorii',
    technical: 'Specificații Tehnice',
    b2b: 'Soluții B2B',
    contact: 'Contact',
    support: 'Suport Tehnic',
    login: 'Autentificare',
    register: 'Înregistrare',
    dashboard: 'Contul Meu',
    logout: 'Deconectare',
    admin: 'Admin',
    
    // Common
    requestCatalog: 'Solicită Catalog',
    addToCart: 'Adaugă în Coș',
    viewCart: 'Vezi Coșul',
    checkout: 'Finalizează Comanda',
    readMore: 'Citește Mai Mult',
    learnMore: 'Află Mai Mult',
    name: 'Nume',
    email: 'Email',
    company: 'Companie',
    message: 'Mesaj',
    sendMessage: 'Trimite Mesajul',
    phone: 'Telefon',
    address: 'Adresă',
    city: 'Oraș',
    postalCode: 'Cod Poștal',
    country: 'Țară',
    currency: 'Monedă',
    save: 'Salvează',
    cancel: 'Anulează',
    edit: 'Editează',
    delete: 'Șterge',
    add: 'Adaugă',
    
    // Product Categories
    valves: 'Robinete',
    fittings: 'Racorduri',
    elbows: 'Coturi',
    tees: 'Teuri',
    nipples: 'Niple',
    reducers: 'Reducții',
    hoses: 'Furtunuri',
    gaskets: 'Garnituri',
    tools: 'Unelte',
    accessories: 'Accesorii',
    
    // Technical Specs
    nominalDiameter: 'Diametru Nominal',
    material: 'Material',
    pressureRating: 'Presiune Nominală',
    temperatureRange: 'Interval Temperatură',
    threadType: 'Tip Filet',
    certification: 'Certificare',
    weight: 'Greutate',
    dimensions: 'Dimensiuni',
    
    // Admin Panel
    adminPanel: 'Panou de Administrare',
    manageProducts: 'Gestionează Produsele',
    managePricing: 'Gestionează Prețurile',
    manageContent: 'Gestionează Conținutul',
    manageUsers: 'Gestionează Utilizatorii',
    manageOrders: 'Gestionează Comenzile',
    manageInventory: 'Gestionează Stocul',
    settings: 'Setări',
    addProduct: 'Adaugă Produs',
    editProduct: 'Editează Produsul',
    deleteProduct: 'Șterge Produsul',
    productName: 'Numele Produsului',
    productDescription: 'Descrierea Produsului',
    productSpecs: 'Specificații',
    productPrice: 'Preț',
    productStock: 'Stoc',
    saveChanges: 'Salvează Modificările',
    uploadLogo: 'Încarcă Logo',
    companyName: 'Numele Companiei',
    defaultLanguage: 'Limba Implicită',
    currency: 'Monedă',
    maintenanceMode: 'Modul de Întreținere',
    
    // Hero Section
    heroTitle: 'PipeSan - Piese de Instalații Profesionale',
    heroSubtitle: 'Robinete, racorduri, conectori și componente de instalații profesionale. Livrare rapidă UE cu specificații tehnice complete.',
    
    // Services
    qualityGuarantee: 'Garanție Calitate',
    technicalSupport: 'Suport Tehnic',
    fastDelivery: 'Livrare Rapidă',
    certifiedProducts: 'Produse Certificate',
    
    // Contact
    contactTitle: 'Ia Legătura',
    contactSubtitle: 'Ai nevoie de ajutor cu proiectele de instalații? Echipa noastră tehnică este aici să te consilieze.',
    
    // Footer
    quickLinks: 'Link-uri Rapide',
    contactInfo: 'Contact',
    businessHours: 'Program de Lucru',
    
    // About
    aboutTitle: 'Furnizor European de Piese de Instalații Profesionale',
    aboutSubtitle: 'Specialist în robinete și racorduri din 2020. Calitate profesională, certificări CE și livrare rapidă.',
    
    // Pricing
    pricingTitle: 'Produse și Prețuri',
    pricingSubtitle: 'Gamă completă de piese de instalații cu prețuri competitive pentru profesioniști.',
    
    // Blog
    blogTitle: 'Ghid Tehnic',
    blogSubtitle: 'Ghiduri de instalare, specificații tehnice și sfaturi de experți pentru profesioniști.',
    
    // Auth
    loginTitle: 'Autentificare',
    registerTitle: 'Creează Cont',
    password: 'Parolă',
    confirmPassword: 'Confirmă Parola',
    forgotPassword: 'Ai Uitat Parola?',
    
    // Dashboard
    personalData: 'Date Personale',
    addresses: 'Adrese',
    billingProfiles: 'Profile de Facturare',
    invoices: 'Facturile Mele',
    orders: 'Comenzile Mele',
    returns: 'Returnări/RMA',
    security: 'Securitate'
  }
};

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();
  
  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.fr[key] || key;
  };
  
  return { t };
};