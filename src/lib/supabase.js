import { createClient } from '@supabase/supabase-js';

// Environment variables - PRODUCTION ONLY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
    ❌ CONFIGURARE INCOMPLETĂ SUPABASE
    
    Pentru a folosi aplicația, trebuie să configurezi:
    1. VITE_SUPABASE_URL=your_project_url
    2. VITE_SUPABASE_ANON_KEY=your_anon_key
    
    Creează un fișier .env în root cu aceste valori.
  `);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('✅ Supabase client initialized for production');

// Auth helper functions
export const auth = {
  getCurrentUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      console.error('Supabase auth error:', error);
      throw new Error('Autentificare eșuată');
    }
    return data;
  },

  signUp: async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    if (error) {
      console.error('Supabase signup error:', error);
      if (error.message.includes('already registered')) {
        throw new Error('Email already registered');
      } else if (error.message.includes('password')) {
        throw new Error('Password requirements not met');
      } else {
        throw new Error('Registration failed');
      }
    }
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
  }
};

// Database helper functions
export const db = {
  // Products
  getProducts: async (filters = {}) => {
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
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  updateProduct: async (id, productData) => {
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
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Categories
  getCategories: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  // Users
  getUser: async (id) => {
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
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
    return data;
  },

  removeFromCart: async (userId, productId) => {
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
    return data;
  },

  clearCart: async (userId) => {
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  },

  // Orders
  createOrder: async (orderData) => {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  createOrderItem: async (orderItemData) => {
    const { data, error } = await supabase
      .from('order_items')
      .insert([orderItemData]);
    
    if (error) throw error;
    return data;
  },

  // File upload
  uploadFile: async (bucket, fileName, file) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);
    
    if (error) throw error;
    return data;
  },

  deleteFile: async (bucket, fileName) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);
    
    if (error) throw error;
    return data;
  },

  getFileUrl: (bucket, fileName) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  }
};

// Export the supabase client and helper functions
export { supabase };
export default supabase;
