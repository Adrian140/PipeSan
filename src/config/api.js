// Configurație API pentru producție
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.pipesan.eu';
import { supabase } from './supabase';
import mockApi from '../utils/mockApi';

// Detectează dacă suntem în mod development sau dacă API_URL nu este setat
const USE_SUPABASE = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
const USE_MOCK_API = !USE_SUPABASE && (!import.meta.env.VITE_API_URL || import.meta.env.VITE_USE_MOCK_API === 'true');
// Headers comune pentru toate cererile
const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Funcție pentru gestionarea erorilor API
const handleApiError = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'API Error');
  }
  return response;
};

// API Client
export const apiClient = {
  // Auth endpoints
  auth: {
    login: async (email, password) => {
      if (USE_MOCK_API) {
        return await mockApi.users.login(email, password);
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      await handleApiError(response);
      return response.json();
    },

    register: async (userData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { message: 'Account created successfully' };
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData)
      });
      await handleApiError(response);
      return response.json();
    },

    validate: async () => {
      if (USE_MOCK_API) {
        const token = localStorage.getItem('authToken');
        if (token === 'mock-jwt-token') {
          return mockApi.users.getById('1');
        }
        throw new Error('Invalid token');
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/validate`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    forgotPassword: async (email) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { message: 'Password reset link sent to your email' };
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email })
      });
      await handleApiError(response);
      return response.json();
    },

    changePassword: async (currentPassword, newPassword) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { message: 'Password changed successfully' };
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });
      await handleApiError(response);
      return response.json();
    },

    enable2FA: async () => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { 
          qrCode: 'data:image/png;base64,mock-qr-code',
          secret: 'MOCK2FASECRET123'
        };
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/enable-2fa`, {
        method: 'POST',
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    verify2FA: async (token) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { message: '2FA enabled successfully' };
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-2fa`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ token })
      });
      await handleApiError(response);
      return response.json();
    },

    disable2FA: async (token) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { message: '2FA disabled successfully' };
      }
      const response = await fetch(`${API_BASE_URL}/api/auth/disable-2fa`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ token })
      });
      await handleApiError(response);
      return response.json();
    }
  },

  // User endpoints
  user: {
    updateProfile: async (profileData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { message: 'Profile updated successfully' };
      }
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(profileData)
      });
      await handleApiError(response);
      return response.json();
    }
  },

  // Addresses endpoints
  addresses: {
    getAll: async () => {
      if (USE_MOCK_API) {
        return await mockApi.addresses.getAll();
      }
      const response = await fetch(`${API_BASE_URL}/api/addresses`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    create: async (addressData) => {
      if (USE_MOCK_API) {
        return await mockApi.addresses.add(addressData);
      }
      const response = await fetch(`${API_BASE_URL}/api/addresses`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(addressData)
      });
      await handleApiError(response);
      return response.json();
    },

    update: async (id, addressData) => {
      if (USE_MOCK_API) {
        return await mockApi.addresses.update(id, addressData);
      }
      const response = await fetch(`${API_BASE_URL}/api/addresses/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(addressData)
      });
      await handleApiError(response);
      return response.json();
    },

    delete: async (id) => {
      if (USE_MOCK_API) {
        return await mockApi.addresses.remove(id);
      }
      const response = await fetch(`${API_BASE_URL}/api/addresses/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    }
  },

  // Billing profiles endpoints
  billingProfiles: {
    getAll: async () => {
      if (USE_MOCK_API) {
        return await mockApi.billingProfiles.getAll();
      }
      const response = await fetch(`${API_BASE_URL}/api/billing-profiles`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    create: async (profileData) => {
      if (USE_MOCK_API) {
        return await mockApi.billingProfiles.add(profileData);
      }
      const response = await fetch(`${API_BASE_URL}/api/billing-profiles`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(profileData)
      });
      await handleApiError(response);
      return response.json();
    },

    update: async (id, profileData) => {
      if (USE_MOCK_API) {
        return await mockApi.billingProfiles.update(id, profileData);
      }
      const response = await fetch(`${API_BASE_URL}/api/billing-profiles/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(profileData)
      });
      await handleApiError(response);
      return response.json();
    },

    delete: async (id) => {
      if (USE_MOCK_API) {
        return await mockApi.billingProfiles.remove(id);
      }
      const response = await fetch(`${API_BASE_URL}/api/billing-profiles/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    validateVAT: async (vatNumber, country) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { valid: true, companyName: 'Mock Company' };
      }
      const response = await fetch(`${API_BASE_URL}/api/validate-vat`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ vatNumber, country })
      });
      await handleApiError(response);
      return response.json();
    }
  },

  // Invoices endpoints
  invoices: {
    getAll: async () => {
      if (USE_MOCK_API) {
        return await mockApi.invoices.getAll();
      }
      const response = await fetch(`${API_BASE_URL}/api/invoices`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    download: async (id) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return new Blob(['Mock PDF content'], { type: 'application/pdf' });
      }
      const response = await fetch(`${API_BASE_URL}/api/invoices/${id}/download`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.blob();
    },

    view: async (id) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return new Blob(['Mock PDF content'], { type: 'application/pdf' });
      }
      const response = await fetch(`${API_BASE_URL}/api/invoices/${id}/view`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.blob();
    }
  },

  // Admin endpoints
  admin: {
    getProducts: async () => {
      if (USE_MOCK_API) {
        return await mockApi.services.getAll();
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    createProduct: async (productData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { id: Date.now(), ...productData };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(productData)
      });
      await handleApiError(response);
      return response.json();
    },

    updateProduct: async (id, productData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { id, ...productData };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(productData)
      });
      await handleApiError(response);
      return response.json();
    },

    deleteProduct: async (id) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { success: true };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    getPricing: async () => {
      if (USE_MOCK_API) {
        return await mockApi.pricing.getAll();
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/pricing`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    createPricing: async (pricingData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { id: Date.now(), ...pricingData };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/pricing`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(pricingData)
      });
      await handleApiError(response);
      return response.json();
    },

    updatePricing: async (id, pricingData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { id, ...pricingData };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/pricing/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(pricingData)
      });
      await handleApiError(response);
      return response.json();
    },

    deletePricing: async (id) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { success: true };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/pricing/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    getContent: async () => {
      if (USE_MOCK_API) {
        return await mockApi.content.get();
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/content`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    updateContent: async (contentData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { success: true };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/content`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(contentData)
      });
      await handleApiError(response);
      return response.json();
    },

    getDocuments: async () => {
      if (USE_MOCK_API) {
        return await mockApi.documents.getAll();
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/documents`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    createDocument: async (documentData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { id: Date.now(), ...documentData };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/documents`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(documentData)
      });
      await handleApiError(response);
      return response.json();
    },

    updateDocument: async (id, documentData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { id, ...documentData };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/documents/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(documentData)
      });
      await handleApiError(response);
      return response.json();
    },

    deleteDocument: async (id) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { success: true };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/documents/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    getPricingContent: async () => {
      if (USE_MOCK_API) {
        return await mockApi.content.get();
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/pricingContent`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    updatePricingContent: async (contentData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { success: true };
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/pricingContent`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(contentData)
      });
      await handleApiError(response);
      return response.json();
    },

    getUsers: async () => {
      if (USE_MOCK_API) {
        return await mockApi.users.getAll();
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    }
  },

  // Contact form
  contact: {
    send: async (formData) => {
      if (USE_MOCK_API) {
        await delay(1000);
        return { success: true, message: 'Message sent successfully' };
      }
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(formData)
      });
      await handleApiError(response);
      return response.json();
    }
  },

  // Products endpoints
  products: {
    getAll: async (filters = {}) => {
      if (USE_MOCK_API) {
        return await mockApi.products.getAll(filters);
      }
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`${API_BASE_URL}/api/products?${queryParams}`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    getById: async (id) => {
      if (USE_MOCK_API) {
        return await mockApi.products.getById(id);
      }
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    }
  },

  // Settings endpoints
  settings: {
    getContactInfo: async () => {
      if (USE_MOCK_API) {
        await delay(300);
        return {
          address: 'Strada Industriei 25, Craiova 200746, România',
          phone: '+40 264 123 456',
          email: 'contact@pipesan.eu',
          mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.123456789!2d23.8234567890123456!3d44.3212345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ae97ea1234567890%3A0x1234567890abcdef!2sCraiova%2C%20Romania!5e0!3m2!1sen!2sus!4v1234567890123'
        };
      }
      const response = await fetch(`${API_BASE_URL}/api/settings/contact`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    updateContactInfo: async (contactData) => {
      if (USE_MOCK_API) {
        await delay(500);
        return { success: true };
      }
      const response = await fetch(`${API_BASE_URL}/api/settings/contact`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(contactData)
      });
      await handleApiError(response);
      return response.json();
    }
  },

  // Orders endpoints
  orders: {
    create: async (orderData) => {
      if (USE_MOCK_API) {
        await delay(1500);
        return { 
          id: Date.now(),
          orderNumber: `PS-${Date.now()}`,
          status: 'confirmed',
          ...orderData 
        };
      }
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(orderData)
      });
      await handleApiError(response);
      return response.json();
    },

    getAll: async () => {
      if (USE_MOCK_API) {
        await delay(800);
        return [];
      }
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    },

    getById: async (id) => {
      if (USE_MOCK_API) {
        await delay(500);
        return { id, orderNumber: `PS-${id}`, status: 'confirmed' };
      }
      const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    }
  },

  // Categories endpoints
  categories: {
    getAll: async () => {
      if (USE_MOCK_API) {
        await delay(400);
        return [
          { id: 1, name: 'Valves', slug: 'valves', productCount: 45 },
          { id: 2, name: 'Fittings', slug: 'fittings', productCount: 128 },
          { id: 3, name: 'Elbows', slug: 'elbows', productCount: 67 },
          { id: 4, name: 'Tees', slug: 'tees', productCount: 89 },
          { id: 5, name: 'Nipples', slug: 'nipples', productCount: 156 },
          { id: 6, name: 'Reducers', slug: 'reducers', productCount: 78 },
          { id: 7, name: 'Hoses', slug: 'hoses', productCount: 34 },
          { id: 8, name: 'Gaskets', slug: 'gaskets', productCount: 92 },
          { id: 9, name: 'Tools', slug: 'tools', productCount: 23 },
          { id: 10, name: 'Accessories', slug: 'accessories', productCount: 56 }
        ];
      }
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        headers: getHeaders()
      });
      await handleApiError(response);
      return response.json();
    }
  }
};

// Helper function for mock API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Mock API calls (these should be within functions or conditional blocks)
// The following lines are outside of any function and cause the parsing error.
// They are moved into appropriate places or removed if they are redundant.

// Example of how these might be used if they were part of a larger structure:
// if (USE_MOCK_API) {
//   apiClient.auth.login = async (email, password) => await mockApi.auth.login(email, password);
//   apiClient.auth.register = async (userData) => await mockApi.auth.register(userData);
//   // ... and so on for all other mock calls
// }
// The original code had these return statements outside of any function, which is a syntax error.
// Assuming these were intended to be part of the mock API implementation or a fallback,
// they need to be placed within appropriate functions or removed.
// Since the task is to fix ONLY the syntax error, and these are standalone 'return' statements,
// they are removed as they are not part of any valid syntax structure.
export default apiClient;