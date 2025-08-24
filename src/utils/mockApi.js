// Mock API pentru simularea backend-ului
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock users database
const mockUsers = [
  {
    id: 1,
    email: 'contact@pipesan.eu',
    password: 'Pipesan2022',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    phone: '+33123456789',
    country: 'FR',
    language: 'fr',
    twoFactorEnabled: false
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    firstName: 'John',
    lastName: 'Doe',
    deliveryCountry: 'DE',
    role: 'user',
    phone: '+33123456789',
    country: 'FR',
    language: 'fr',
    twoFactorEnabled: false
  }
];

// Mock services
const mockServices = [
  {
    id: 1,
    title: 'Ball Valves',
    description: 'Professional brass ball valves with full bore design',
    features: ['CW617N brass construction', 'Full bore design', 'Lever handle'],
    price: '€25.99',
    unit: 'per piece',
    category: 'valves'
  },
  {
    id: 2,
    title: 'Pipe Fittings',
    description: 'High-quality brass pipe fittings for professional installations',
    features: ['BSP/NPT threads', 'Pressure tested', 'CE certified'],
    price: '€12.50',
    unit: 'per piece',
    category: 'fittings'
  }
];

// Mock pricing
const mockPricing = [
  {
    id: 1,
    service: 'Ball Valves DN15',
    price: '€25.99',
    unit: 'per piece',
    category: 'valves'
  },
  {
    id: 2,
    service: 'Brass Fittings 1/2"',
    price: '€12.50',
    unit: 'per piece',
    category: 'fittings'
  },
  {
    id: 3,
    service: 'Pipe Elbows 90°',
    price: '€8.75',
    unit: 'per piece',
    category: 'elbows'
  }
];

// Mock content
const mockContent = {
  heroTitle: 'PipeSan - Professional Plumbing Parts',
  heroSubtitle: 'Valves, fittings, connectors and professional installation components. Fast EU delivery with complete technical specifications.',
  phone: '+40 264 123 456',
  email: 'contact@pipesan.eu',
  address: 'Strada Industriei 25, Craiova 200746, România'
};

// Mock addresses
let mockAddresses = [];

// Mock billing profiles
let mockBillingProfiles = [];

// Mock invoices
const mockInvoices = [
  {
    id: 1,
    number: 'PS-INV-2024-001',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    amount: 125.50,
    vatAmount: 25.10,
    status: 'paid',
    description: 'Brass Ball Valves & Fittings - January 2024'
  },
  {
    id: 2,
    number: 'PS-INV-2024-002',
    date: '2024-02-15',
    dueDate: '2024-03-15',
    amount: 210.75,
    vatAmount: 42.15,
    status: 'pending',
    description: 'Professional Installation Kit - February 2024'
  }
];

// Mock documents
let mockDocuments = [
  {
    id: 1,
    title: 'Complete Technical Catalog 2024',
    description: 'Full product specifications, dimensions and technical data',
    type: 'PDF',
    size: '15.2 MB',
    pages: 156,
    languages: ['EN', 'FR', 'DE', 'IT', 'ES'],
    downloadUrl: '#',
    category: 'technical'
  },
  {
    id: 2,
    title: 'Installation Guidelines',
    description: 'Professional installation procedures and best practices',
    type: 'PDF',
    size: '8.7 MB',
    pages: 89,
    languages: ['EN', 'FR', 'DE'],
    downloadUrl: '#',
    category: 'installation'
  },
  {
    id: 3,
    title: 'CE Certificates & Declarations',
    description: 'Complete certification documentation for all products',
    type: 'PDF',
    size: '12.4 MB',
    pages: 234,
    languages: ['EN', 'FR'],
    downloadUrl: '#',
    category: 'certification'
  },
  {
    id: 4,
    title: 'Material Safety Data Sheets',
    description: 'MSDS for all materials used in our products',
    type: 'PDF',
    size: '6.1 MB',
    pages: 67,
    languages: ['EN', 'FR', 'DE', 'IT', 'ES'],
    downloadUrl: '#',
    category: 'safety'
  }
];

// Mock products
const mockProducts = [
  {
    id: 1,
    name: 'Professional Pipe Fitting DN25',
    sku: 'PF-DN25-001',
    price: 45.99,
    salePrice: 39.99,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    rating: 4.5,
    reviewCount: 23,
    inStock: true,
    badge: 'Best Seller',
    category: 'Pipe Fittings',
    specifications: {
      nominalDiameter: 'DN25 (1")',
      material: 'CW617N Brass',
      pressureRating: 'PN16 (16 bar)',
      temperatureRange: '-20°C to +120°C',
      threadType: 'BSP (British Standard Pipe)',
      certification: 'CE, ACS, WRAS',
      weight: '0.45 kg',
      dimensions: '85 x 45 x 32 mm'
    },
    amazonLinks: {
      IT: 'https://amazon.it/dp/B08EXAMPLE1',
      FR: 'https://amazon.fr/dp/B08EXAMPLE2',
      DE: 'https://amazon.de/dp/B08EXAMPLE3',
      ES: 'https://amazon.es/dp/B08EXAMPLE4',
      NL: 'https://amazon.nl/dp/B08EXAMPLE5',
      BE: 'https://amazon.com.be/dp/B08EXAMPLE6',
      PL: 'https://amazon.pl/dp/B08EXAMPLE7',
      SE: 'https://amazon.se/dp/B08EXAMPLE8'
    },
    variants: [
      { id: 1, name: 'DN25 Brass', sku: 'PF-DN25-001', price: 39.99, inStock: true },
      { id: 2, name: 'DN25 Stainless Steel', sku: 'PF-DN25-002', price: 49.99, inStock: true }
    ]
  },
  {
    id: 2,
    name: 'Brass Ball Valve 1/2" BSP',
    sku: 'HPV-12-002',
    price: 89.99,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    rating: 4.8,
    reviewCount: 45,
    inStock: true,
    category: 'Valves',
    specifications: {
      nominalDiameter: 'DN15 (1/2")',
      material: 'CW617N Brass',
      pressureRating: 'PN25 (25 bar)',
      temperatureRange: '-10°C to +150°C',
      threadType: 'BSP Female',
      certification: 'CE, WRAS',
      weight: '0.28 kg',
      dimensions: '65 x 35 x 28 mm'
    },
    amazonLinks: {
      IT: 'https://amazon.it/dp/B08VALVE1',
      FR: 'https://amazon.fr/dp/B08VALVE2',
      DE: 'https://amazon.de/dp/B08VALVE3',
      ES: 'https://amazon.es/dp/B08VALVE4'
    }
  },
  {
    id: 3,
    name: 'Stainless Steel Elbow 90° DN20',
    sku: 'CPC-SET-003',
    price: 129.99,
    salePrice: 99.99,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.2,
    reviewCount: 18,
    inStock: false,
    category: 'Elbows',
    specifications: {
      nominalDiameter: 'DN20 (3/4")',
      material: '316L Stainless Steel',
      pressureRating: 'PN40 (40 bar)',
      temperatureRange: '-40°C to +200°C',
      threadType: 'BSP Male/Female',
      certification: 'CE, FDA',
      weight: '0.35 kg',
      dimensions: '45 x 45 x 32 mm'
    }
  },
  {
    id: 4,
    name: 'Brass Tee Fitting DN32',
    sku: 'BTF-32-004',
    price: 67.50,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',
    rating: 4.6,
    reviewCount: 31,
    inStock: true,
    category: 'Tees',
    specifications: {
      nominalDiameter: 'DN32 (1 1/4")',
      material: 'CW617N Brass',
      pressureRating: 'PN16 (16 bar)',
      temperatureRange: '-20°C to +120°C',
      threadType: 'BSP Female',
      certification: 'CE, ACS',
      weight: '0.68 kg',
      dimensions: '95 x 65 x 45 mm'
    }
  },
  {
    id: 5,
    name: 'Flexible Hose 1/2" x 500mm',
    sku: 'FH-12-500',
    price: 34.99,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.3,
    reviewCount: 28,
    inStock: true,
    category: 'Hoses',
    specifications: {
      nominalDiameter: 'DN15 (1/2")',
      material: 'EPDM + Stainless Steel Braid',
      pressureRating: 'PN10 (10 bar)',
      temperatureRange: '-30°C to +110°C',
      threadType: 'BSP Male/Female',
      certification: 'CE, ACS, KTW',
      weight: '0.25 kg',
      dimensions: '500mm length'
    }
  },
  {
    id: 6,
    name: 'Pipe Gasket Set NBR',
    sku: 'PGS-NBR-006',
    price: 15.99,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    rating: 4.4,
    reviewCount: 52,
    inStock: true,
    category: 'Gaskets',
    specifications: {
      nominalDiameter: 'DN15-DN50 Set',
      material: 'NBR (Nitrile Rubber)',
      pressureRating: 'PN16 (16 bar)',
      temperatureRange: '-30°C to +100°C',
      threadType: 'Universal',
      certification: 'CE, FDA',
      weight: '0.12 kg',
      dimensions: 'Various sizes included'
    }
  }
];

const mockApi = {
  // Users
  users: {
    getAll: async (filters = {}) => {
      await delay(500);
      let filteredUsers = [...mockUsers];

      if (filters.search) {
        filteredUsers = filteredUsers.filter(u =>
          u.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
          u.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
          u.email.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      if (filters.role && filters.role !== 'All Roles') {
        filteredUsers = filteredUsers.filter(u => u.role === filters.role);
      }

      return filteredUsers;
    },

    getById: async (id) => {
      await delay(300);
      const user = mockUsers.find(u => u.id === parseInt(id));
      if (!user) throw new Error('User not found');
      return user;
    },

    login: async (email, password) => {
      await delay(1000);
      
      // Simulează trimiterea email-ului de bun venit
      const welcomeEmail = {
        to: email,
        subject: 'Bun venit la PipeSan!',
        template: 'welcome',
        data: {
          firstName: mockUsers.find(u => u.email === email)?.firstName || 'User',
          accountType: 'standard'
        }
      };
      console.log('Welcome email would be sent:', welcomeEmail);
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (!user) throw new Error('Invalid credentials');
      return { token: 'mock-jwt-token', user };
    }
  },

  // Services
  services: {
    getAll: async (filters = {}) => {
      await delay(600);
      let filteredServices = [...mockServices];

      if (filters.category && filters.category !== 'All Categories') {
        filteredServices = filteredServices.filter(s => s.category === filters.category);
      }

      return filteredServices;
    },

    getById: async (id) => {
      await delay(400);
      const service = mockServices.find(s => s.id === parseInt(id));
      if (!service) throw new Error('Service not found');
      return service;
    }
  },

  // Pricing
  pricing: {
    getAll: async (filters = {}) => {
      await delay(400);
      let filteredPricing = [...mockPricing];

      if (filters.category && filters.category !== 'All Categories') {
        filteredPricing = filteredPricing.filter(p => p.category === filters.category);
      }

      return filteredPricing;
    }
  },

  // Content
  content: {
    get: async () => {
      await delay(200);
      return mockContent;
    }
  },

  // Addresses
  addresses: {
    getAll: async (userId) => {
      await delay(400);
      return mockAddresses;
    },
    add: async (address) => {
      await delay(500);
      const newAddress = { ...address, id: mockAddresses.length + 1 };
      mockAddresses.push(newAddress);
      return newAddress;
    },
    update: async (id, updatedAddress) => {
      await delay(500);
      const index = mockAddresses.findIndex(a => a.id === id);
      if (index === -1) throw new Error('Address not found');
      mockAddresses[index] = { ...mockAddresses[index], ...updatedAddress };
      return mockAddresses[index];
    },
    remove: async (id) => {
      await delay(500);
      const initialLength = mockAddresses.length;
      mockAddresses = mockAddresses.filter(a => a.id !== id);
      if (mockAddresses.length === initialLength) throw new Error('Address not found');
      return true;
    }
  },

  // Billing Profiles
  billingProfiles: {
    getAll: async (userId) => {
      await delay(400);
      return mockBillingProfiles;
    },
    add: async (profile) => {
      await delay(500);
      const newProfile = { ...profile, id: mockBillingProfiles.length + 1 };
      mockBillingProfiles.push(newProfile);
      return newProfile;
    },
    update: async (id, updatedProfile) => {
      await delay(500);
      const index = mockBillingProfiles.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Billing profile not found');
      mockBillingProfiles[index] = { ...mockBillingProfiles[index], ...updatedProfile };
      return mockBillingProfiles[index];
    },
    remove: async (id) => {
      await delay(500);
      const initialLength = mockBillingProfiles.length;
      mockBillingProfiles = mockBillingProfiles.filter(p => p.id !== id);
      if (mockBillingProfiles.length === initialLength) throw new Error('Billing profile not found');
      return true;
    }
  },

  // Invoices
  invoices: {
    getAll: async (filters = {}) => {
      await delay(700);
      let filteredInvoices = [...mockInvoices];

      if (filters.status && filters.status !== 'All') {
        filteredInvoices = filteredInvoices.filter(inv => inv.status === filters.status);
      }

      return filteredInvoices;
    },

    getById: async (id) => {
      await delay(500);
      const invoice = mockInvoices.find(inv => inv.id === parseInt(id));
      if (!invoice) throw new Error('Invoice not found');
      return invoice;
    }
  },

  // Products
  products: {
    getAll: async (filters = {}) => {
      await delay(800);
      let filteredProducts = [...mockProducts];
      
      if (filters.search) {
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.sku.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.category && filters.category !== 'All Categories') {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      
      return filteredProducts;
    },

    getById: async (id) => {
      await delay(500);
      const product = mockProducts.find(p => p.id === parseInt(id));
      if (!product) throw new Error('Product not found');
      return product;
    }
  },

  // Documents
  documents: {
    getAll: async (filters = {}) => {
      await delay(600);
      let filteredDocuments = [...mockDocuments];

      if (filters.category && filters.category !== 'All Categories') {
        filteredDocuments = filteredDocuments.filter(d => d.category === filters.category);
      }

      return filteredDocuments;
    },

    add: async (document) => {
      await delay(500);
      const newDocument = { ...document, id: mockDocuments.length + 1 };
      mockDocuments.push(newDocument);
      return newDocument;
    },

    update: async (id, updatedDocument) => {
      await delay(500);
      const index = mockDocuments.findIndex(d => d.id === id);
      if (index === -1) throw new Error('Document not found');
      mockDocuments[index] = { ...mockDocuments[index], ...updatedDocument };
      return mockDocuments[index];
    },

    remove: async (id) => {
      await delay(500);
      const initialLength = mockDocuments.length;
      mockDocuments = mockDocuments.filter(d => d.id !== id);
      if (mockDocuments.length === initialLength) throw new Error('Document not found');
      return true;
    }
  }
};

export default mockApi;