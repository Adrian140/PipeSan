import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Supabase configuration is missing. Please check your environment variables.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const auth = {
  signUp: async (email, password, userData = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) throw error;
      
      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            ...userData
          }]);
        
        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }
      
      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) {
          console.error('Profile fetch error:', profileError);
          return { user, profile: null };
        }
        
        return { user, profile };
      }
      
      return { user: null, profile: null };
    } catch (error) {
      console.error('Get current user error:', error);
      return { user: null, profile: null };
    }
  }
};

// Database helper functions
export const db = {
  // Users
  getUser: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get categories error:', error);
      return [];
    }
  },

  // Products
  getProducts: async (filters = {}) => {
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name
          )
        `);
      
      if (filters.active !== undefined) {
        query = query.eq('active', filters.active);
      }
      
      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get products error:', error);
      return [];
    }
  },

  // Cart
  getCartItems: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (
            id,
            name,
            price,
            image_url,
            sku
          )
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get cart items error:', error);
      return [];
    }
  },

  addToCart: async (userId, productId, quantity) => {
    try {
      // Check if item already exists
      const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();
      
      if (existing) {
        // Update quantity
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Insert new item
        const { data, error } = await supabase
          .from('cart_items')
          .insert([{
            user_id: userId,
            product_id: productId,
            quantity
          }])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  },

  updateCartItem: async (userId, productId, quantity) => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', userId)
        .eq('product_id', productId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update cart item error:', error);
      throw error;
    }
  },

  removeFromCart: async (userId, productId) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Remove from cart error:', error);
      throw error;
    }
  },

  clearCart: async (userId) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Clear cart error:', error);
      throw error;
    }
  },

  // Orders
  createOrder: async (orderData) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  },

  createOrderItem: async (orderItemData) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .insert([orderItemData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Create order item error:', error);
      throw error;
    }
  },

  // File upload
  uploadFile: async (bucket, fileName, file) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Upload file error:', error);
      throw error;
    }
  },

  getFileUrl: (bucket, fileName) => {
    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Get file URL error:', error);
      return null;
    }
  }
};

export default supabase;
