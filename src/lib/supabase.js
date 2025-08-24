import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug environment variables
console.log('Supabase URL:', supabaseUrl ? 'SET' : 'NOT SET');
console.log('Supabase Key:', supabaseAnonKey ? 'SET' : 'NOT SET');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'NOT SET');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('categories').select('count').limit(1);
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection successful');
    }
  } catch (err) {
    console.error('Supabase connection error:', err);
  }
};

// Test connection on load
testConnection();

// Authentication functions
export const auth = {
  async signIn(email, password) {
    console.log('SignIn attempt for:', email);
    try {
      // For demo purposes, check if this is the admin user
      if (email === 'contact@pipesan.eu' && password === 'Pipesan2022') {
        console.log('Admin login detected, fetching admin user...');
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .eq('role', 'admin')
          .single();
        
        if (userError) {
          console.error('Admin user fetch error:', userError);
          throw new Error('Admin user not found in database');
        }
        
        if (userData) {
          console.log('Admin user found:', userData);
          return {
            user: {
              id: userData.id,
              email: userData.email
            }
          };
        }
      }
      
      // Try Supabase auth first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Supabase auth error:', error);
        throw error;
      }
      
      console.log('Supabase auth successful:', data);
      return data;
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  },

  async signUp(email, password, userData) {
    console.log('SignUp attempt for:', email);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) {
        console.error('SignUp error:', error);
        throw error;
      }
      
      console.log('SignUp successful:', data);
      return data;
    } catch (error) {
      console.error('SignUp error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    console.log('Getting current user...');
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current auth user:', user);
      
      if (user) {
        const profile = await db.getUser(user.id);
        console.log('User profile:', profile);
        return { user, profile };
      }
      
      return null;
    } catch (error) {
      console.error('getCurrentUser error:', error);
      return null;
    }
  },

  async signOut() {
    console.log('Signing out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('SignOut error:', error);
      throw error;
    }
  }
};

// Database functions
export const db = {
  async getUser(userId) {
    console.log('Getting user by ID:', userId);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('getUser error:', error);
        throw error;
      }
      
      console.log('User data:', data);
      return data;
    } catch (error) {
      console.error('getUser error:', error);
      throw error;
    }
  },

  async updateUser(userId, userData) {
    console.log('Updating user:', userId, userData);
    try {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) {
        console.error('updateUser error:', error);
        throw error;
      }
      
      console.log('User updated:', data);
      return data;
    } catch (error) {
      console.error('updateUser error:', error);
      throw error;
    }
  },

  async getProducts(filters = {}) {
    console.log('Getting products with filters:', filters);
    try {
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
      
      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('getProducts error:', error);
        throw error;
      }
      
      console.log('Products data:', data);
      return data || [];
    } catch (error) {
      console.error('getProducts error:', error);
      return [];
    }
  },

  async getCategories() {
    console.log('Getting categories...');
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('getCategories error:', error);
        throw error;
      }
      
      console.log('Categories data:', data);
      return data || [];
    } catch (error) {
      console.error('getCategories error:', error);
      return [];
    }
  },

  async getCartItems(userId) {
    console.log('Getting cart items for user:', userId);
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
      
      if (error) {
        console.error('getCartItems error:', error);
        throw error;
      }
      
      console.log('Cart items:', data);
      return data || [];
    } catch (error) {
      console.error('getCartItems error:', error);
      return [];
    }
  },

  async addToCart(userId, productId, quantity) {
    console.log('Adding to cart:', { userId, productId, quantity });
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: userId,
          product_id: productId,
          quantity: quantity
        }, {
          onConflict: 'user_id,product_id'
        })
        .select();
      
      if (error) {
        console.error('addToCart error:', error);
        throw error;
      }
      
      console.log('Added to cart:', data);
      return data;
    } catch (error) {
      console.error('addToCart error:', error);
      throw error;
    }
  },

  async updateCartItem(userId, productId, quantity) {
    console.log('Updating cart item:', { userId, productId, quantity });
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', userId)
        .eq('product_id', productId)
        .select();
      
      if (error) {
        console.error('updateCartItem error:', error);
        throw error;
      }
      
      console.log('Cart item updated:', data);
      return data;
    } catch (error) {
      console.error('updateCartItem error:', error);
      throw error;
    }
  },

  async removeFromCart(userId, productId) {
    console.log('Removing from cart:', { userId, productId });
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
      
      if (error) {
        console.error('removeFromCart error:', error);
        throw error;
      }
      
      console.log('Removed from cart successfully');
      return true;
    } catch (error) {
      console.error('removeFromCart error:', error);
      throw error;
    }
  },

  async clearCart(userId) {
    console.log('Clearing cart for user:', userId);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);
      
      if (error) {
        console.error('clearCart error:', error);
        throw error;
      }
      
      console.log('Cart cleared successfully');
      return true;
    } catch (error) {
      console.error('clearCart error:', error);
      throw error;
    }
  },

  async createOrder(orderData) {
    console.log('Creating order:', orderData);
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();
      
      if (error) {
        console.error('createOrder error:', error);
        throw error;
      }
      
      console.log('Order created:', data);
      return data;
    } catch (error) {
      console.error('createOrder error:', error);
      throw error;
    }
  },

  async createOrderItem(orderItemData) {
    console.log('Creating order item:', orderItemData);
    try {
      const { data, error } = await supabase
        .from('order_items')
        .insert(orderItemData)
        .select()
        .single();
      
      if (error) {
        console.error('createOrderItem error:', error);
        throw error;
      }
      
      console.log('Order item created:', data);
      return data;
    } catch (error) {
      console.error('createOrderItem error:', error);
      throw error;
    }
  },

  async uploadFile(bucket, fileName, file) {
    console.log('Uploading file:', { bucket, fileName });
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);
      
      if (error) {
        console.error('uploadFile error:', error);
        throw error;
      }
      
      console.log('File uploaded:', data);
      return data;
    } catch (error) {
      console.error('uploadFile error:', error);
      throw error;
    }
  },

  getFileUrl(bucket, fileName) {
    console.log('Getting file URL:', { bucket, fileName });
    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);
      
      console.log('File URL:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('getFileUrl error:', error);
      return null;
    }
  }
};
