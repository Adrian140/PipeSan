// Simulează trimiterea email-ului
      const emailData = {
        to: 'contact@prep-center.eu',
        from: '',
        subject: `New Contact Form Submission from `,
        body: `
          Name: 
          Email: 
          Company:  || 'N/A'}
          Message: 
        `
      };
      
      console.log('Email would be sent:', emailData);
      // return { 
      //   success: true, 
      //   message: 'Mesajul a fost trimis cu succes! Vă vom contacta în curând.',
      //   emailSent: true 
      // };
// Mock API pentru simularea backend-ului
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock users database
const mockUsers = [
  {
    id: 1,
    email: 'admin@prep-center.eu',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    phone: '+33675116218',
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
    title: 'FNSKU Labeling',
    description: 'Professional FNSKU labeling with polybagging included',
    features: ['FNSKU application', 'Polybagging', 'Quality control'],
    price: '€0.50',
    unit: 'per unit',
    category: 'fba'
  },
  {
    id: 2,
    title: 'Quality Control',
    description: 'Visual inspection and quality verification',
    features: ['Visual inspection', 'Damage check', 'Compliance verification'],
    price: '€0.30',
    unit: 'per unit',
    category: 'fba'
  }
];

// Mock pricing
const mockPricing = [
  {
    id: 1,
    service: 'FNSKU Labeling',
    price: '€0.50',
    unit: 'per unit',
    category: 'fba'
  },
  {
    id: 2,
    service: 'Polybagging',
    price: '€0.25',
    unit: 'per unit',
    category: 'fba'
  },
  {
    id: 3,
    service: 'Storage',
    price: '€15',
    unit: 'per pallet/month',
    category: 'storage'
  }
];

// Mock content
const mockContent = {
  heroTitle: 'Prep Center France – 24h Turnaround to Amazon FBA',
  heroSubtitle: 'Reception, QC, FNSKU labeling, polybagging & fast shipping to EU Amazon FCs.',
  phone: '+33 6 75 11 62 18',
  email: 'contact@prep-center.eu',
  address: '35350 La Gouesnière, France'
};

// Mock addresses
let mockAddresses = [];

// Mock billing profiles
let mockBillingProfiles = [];

// Mock invoices
const mockInvoices = [
  {
    id: 1,
    number: 'INV-2024-001',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    amount: 125.50,
    vatAmount: 25.10,
    status: 'paid',
    description: 'FNSKU Labeling Services - January 2024'
  },
  {
    id: 2,
    number: 'INV-2024-002',
    date: '2024-02-15',
    dueDate: '2024-03-15',
    amount: 210.75,
    vatAmount: 42.15,
    status: 'pending',
    description: 'FNSKU Labeling & Storage Services - February 2024'
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
    variants: [
      { id: 1, name: 'DN25 Brass', sku: 'PF-DN25-001', price: 39.99, inStock: true },
      { id: 2, name: 'DN25 Stainless Steel', sku: 'PF-DN25-002', price: 49.99, inStock: true }
    ]
  },
  {
    id: 2,
    name: 'High Pressure Valve 1/2"',
    sku: 'HPV-12-002',
    price: 89.99,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    rating: 4.8,
    reviewCount: 45,
    inStock: true,
    category: 'Valves'
  },
  {
    id: 3,
    name: 'Copper Pipe Connector Set',
    sku: 'CPC-SET-003',
    price: 129.99,
    salePrice: 99.99,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.2,
    reviewCount: 18,
    inStock: false,
    category: 'Connectors'
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
        subject: 'Bun venit la Prep Center France!',
        template: 'welcome',
        data: {
          firstName: mockUsers.find(u => u.email === email).firstName,
          accountType: mockUsers.find(u => u.email === email).accountType
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
      // In a real app, you'd fetch addresses for a specific user
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
      // In a real app, you'd fetch billing profiles for a specific user
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
  }
};
      
export default mockApi;
      // Simulează trimiterea email-ului de resetare parolă
      const resetEmail = {
        to: email,
        subject: 'Resetare parolă - Prep Center France',
        template: 'password-reset',
        data: {
          resetLink: `https://prep-center.eu/reset-password?token=mock-reset-token`,
          expiresIn: '24 hours'
        }
      };
      console.log('Password reset email would be sent:', resetEmail);