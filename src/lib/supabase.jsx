import { createClient } from '@supabase/supabase-js';

// Environment variables with fallbacks for demo mode
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl && 
                           supabaseAnonKey && 
                           supabaseUrl.startsWith('https://') && 
                           supabaseUrl.includes('supabase.co') && 
                           supabaseAnonKey.length > 50;

// Initialize Supabase client only if we have valid credentials
let supabase = null;

if (hasValidCredentials) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Supabase client:', error);
    supabase = null;
  }
} else {
  console.log('🔧 Demo mode: Supabase client not initialized');
  console.log('Environment check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlFormat: supabaseUrl ? (supabaseUrl.startsWith('https://') ? 'Valid' : 'Invalid') : 'Missing',
    keyLength: supabaseAnonKey ? supabaseAnonKey.length : 0
  });
}

// Auth helper functions
export const auth = {
  getCurrentUser: async () => {
    if (!supabase) return null;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  signIn: async (email, password) => {
    if (!supabase) throw new Error('Supabase not initialized');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  signUp: async (email, password, metadata = {}) => {
    if (!supabase) throw new Error('Supabase not initialized');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
  }
};

// Database helper functions
export const db = {
  // Products
  getProducts: async (filters = {}) => {
    if (!supabase) {
      return mockProducts.filter(product => 
        !filters.active || product.active === filters.active
      );
    }
    
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `);
    
    if (filters.active !== undefined) {
      query = query.eq('active', filters.active);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  createProduct: async (productData) => {
    if (!supabase) {
      const newProduct = {
        ...productData,
        id: 'demo-' + Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockProducts.push(newProduct);
      return newProduct;
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  updateProduct: async (id, productData) => {
    if (!supabase) {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], ...productData };
        return mockProducts[index];
      }
      throw new Error('Product not found');
    }
    
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  deleteProduct: async (id) => {
    if (!supabase) {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
        return true;
      }
      return false;
    }
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Categories
  getCategories: async () => {
    if (!supabase) return mockCategories;
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  // Users
  getUser: async (id) => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error getting user:', error);
      return null;
    }
    return data;
  },

  updateUser: async (id, userData) => {
    if (!supabase) {
      console.log('Demo mode: User update simulated');
      return userData;
    }
    
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Cart
  getCartItems: async (userId) => {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data || [];
  },

  addToCart: async (userId, productId, quantity) => {
    if (!supabase) {
      console.log('Demo mode: Add to cart simulated');
      return;
    }
    
    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        product_id: productId,
        quantity
      });
    
    if (error) throw error;
    return data;
  },

  updateCartItem: async (userId, productId, quantity) => {
    if (!supabase) {
      console.log('Demo mode: Cart update simulated');
      return;
    }
    
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
    return data;
  },

  removeFromCart: async (userId, productId) => {
    if (!supabase) {
      console.log('Demo mode: Remove from cart simulated');
      return;
    }
    
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
    return data;
  },

  clearCart: async (userId) => {
    if (!supabase) {
      console.log('Demo mode: Clear cart simulated');
      return;
    }
    
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  },

  // Orders
  createOrder: async (orderData) => {
    if (!supabase) {
      console.log('Demo mode: Order creation simulated');
      return { id: 'demo-order-' + Date.now(), ...orderData };
    }
    
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  createOrderItem: async (orderItemData) => {
    if (!supabase) {
      console.log('Demo mode: Order item creation simulated');
      return;
    }
    
    const { data, error } = await supabase
      .from('order_items')
      .insert([orderItemData]);
    
    if (error) throw error;
    return data;
  },

  // File upload
  uploadFile: async (bucket, fileName, file) => {
    if (!supabase) {
      console.log('Demo mode: File upload simulated');
      return;
    }
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);
    
    if (error) throw error;
    return data;
  },

  deleteFile: async (bucket, fileName) => {
    if (!supabase) {
      console.log('Demo mode: File deletion simulated');
      return;
    }
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);
    
    if (error) throw error;
    return data;
  },

  getFileUrl: (bucket, fileName) => {
    if (!supabase) {
      return `https://demo.supabase.co/storage/v1/object/public/${bucket}/${fileName}`;
    }
    
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  }
};

// Mock data for demo mode
const mockCategories = [
  { id: 'racorduri', name: 'Racorduri', description: 'Racorduri și fitinguri pentru instalații sanitare', slug: 'racorduri' },
  { id: 'robinete', name: 'Robinete', description: 'Robinete și baterii pentru bucătărie și baie', slug: 'robinete' },
  { id: 'accesorii', name: 'Accesorii', description: 'Accesorii diverse pentru instalații sanitare', slug: 'accesorii' },
  { id: 'teflon', name: 'Teflon & Etanșare', description: 'Materiale pentru etanșări și izolații', slug: 'teflon-etansare' },
  { id: 'tevi', name: 'Țevi', description: 'Țevi din diverse materiale pentru instalații', slug: 'tevi' },
  { id: 'sifoane', name: 'Sifoane', description: 'Sifoane pentru chiuvete și lavoare', slug: 'sifoane' }
];

const mockProducts = [
  {
    id: 'demo-1',
    name: 'Racord Flexibil Premium 1/2"',
    description: 'Racord flexibil de înaltă calitate pentru instalații sanitare',
    bullet_points: ['Material inox 316L', 'Rezistență la presiune ridicată', 'Garanție 5 ani'],
    price: 45.99,
    estimated_shipping_price: 5.99,
    category_id: 'racorduri',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    specifications: 'Diametru: 1/2", Lungime: 30cm, Material: Inox 316L',
    stock: 25,
    sku: 'RAC-FLEX-001',
    active: true,
    amazon_links: {
      FR: 'https://amazon.fr/dp/B08XYZ123',
      DE: 'https://amazon.de/dp/B08XYZ123',
      ES: 'https://amazon.es/dp/B08XYZ123'
    },
    categories: { id: 'racorduri', name: 'Racorduri', slug: 'racorduri' },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'demo-2',
    name: 'Robinet Monocomandă Premium',
    description: 'Robinet monocomandă cu design modern și funcționalitate superioară',
    bullet_points: ['Cartus ceramic', 'Finisaj cromat', 'Economie de apă'],
    price: 189.99,
    estimated_shipping_price: 8.99,
    category_id: 'robinete',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop',
    specifications: 'Înălțime: 25cm, Material: Alamă cromată, Debit: 6L/min',
    stock: 15,
    sku: 'ROB-MONO-001',
    active: true,
    amazon_links: {
      FR: 'https://amazon.fr/dp/B08ABC456',
      DE: 'https://amazon.de/dp/B08ABC456',
      IT: 'https://amazon.it/dp/B08ABC456'
    },
    categories: { id: 'robinete', name: 'Robinete', slug: 'robinete' },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Export the supabase client and helper functions
export { supabase };
export default supabase;
