import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Auth functions
export const auth = {
  async signUp(email, password, userData) {
    if (!supabase) throw new Error('Supabase not configured');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    
    if (error) throw error;
    return data;
  },

  async signIn(email, password) {
    if (!supabase) {
      // Demo mode authentication
      if (email === 'contact@pipesan.eu' && password === 'Pipesan2022') {
        return {
          user: {
            id: 'admin-user',
            email: 'contact@pipesan.eu'
          }
        };
      }
      return {
        user: {
          id: 'demo-user',
          email: email
        }
      };
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },

  async signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    if (!supabase) return null;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const profile = await db.getUser(user.id);
    return { user, profile };
  }
};

// Database functions
export const db = {
  // Users
  async getUser(userId) {
    if (!supabase) {
      // Return mock admin user for demo
      if (userId === 'admin-user') {
        return {
          id: 'admin-user',
          email: 'contact@pipesan.eu',
          name: 'Administrator PipeSan',
          role: 'admin',
          account_type: 'company',
          company_name: 'PipeSan',
          country: 'RO',
          phone: '+40 722 140 444'
        };
      }
      return {
        id: userId,
        email: 'demo@example.com',
        name: 'Demo User',
        role: 'customer',
        account_type: 'individual',
        country: 'FR'
      };
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUser(userId, userData) {
    if (!supabase) return userData;
    
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Products
  async getProducts(filters = {}) {
    // Mock products data
    return [
      {
        id: 1,
        name: "Racord Flexibil Premium 1/2\"",
        description: "Racord flexibil de înaltă calitate pentru instalații sanitare",
        bullet_points: ["Material: Inox", "Lungime: 30cm", "Diametru: 1/2\""],
        price: 45.99,
        estimated_shipping_price: 5.99,
        category_id: 'racorduri',
        image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
        amazon_links: {
          FR: "https://amazon.fr/dp/B08XYZ123",
          DE: "https://amazon.de/dp/B08XYZ123",
          ES: "https://amazon.es/dp/B08XYZ123"
        },
        specifications: "Material: Inox, Lungime: 30cm",
        stock: 25,
        active: true,
        sku: "RF-001",
        categories: { name: "Racorduri" }
      },
      {
        id: 2,
        name: "Robinet Monocomandă Bucătărie",
        description: "Robinet modern cu design elegant pentru bucătărie",
        bullet_points: ["Material: Alamă cromată", "Înălțime: 35cm", "Garanție: 5 ani"],
        price: 189.99,
        estimated_shipping_price: 12.99,
        category_id: 'robinete',
        image_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop",
        amazon_links: {
          FR: "https://amazon.fr/dp/B08ABC456",
          DE: "https://amazon.de/dp/B08ABC456",
          ES: "https://amazon.es/dp/B08ABC456"
        },
        specifications: "Material: Alamă cromată, Înălțime: 35cm",
        stock: 12,
        active: true,
        sku: "RM-002",
        categories: { name: "Robinete" }
      }
    ];
  },

  async getCategories() {
    return [
      { id: 'racorduri', name: 'Racorduri', description: 'Racorduri și fitinguri', slug: 'racorduri' },
      { id: 'robinete', name: 'Robinete', description: 'Robinete și baterii', slug: 'robinete' },
      { id: 'accesorii', name: 'Accesorii', description: 'Accesorii diverse', slug: 'accesorii' }
    ];
  },

  // Cart functions
  async getCartItems(userId) {
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

  async addToCart(userId, productId, quantity) {
    if (!supabase) return;
    
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

  async updateCartItem(userId, productId, quantity) {
    if (!supabase) return;
    
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
    return data;
  },

  async removeFromCart(userId, productId) {
    if (!supabase) return;
    
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
    return data;
  },

  async clearCart(userId) {
    if (!supabase) return;
    
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  },

  // Orders
  async createOrder(orderData) {
    if (!supabase) return { id: Date.now(), order_number: orderData.order_number };
    
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async createOrderItem(itemData) {
    if (!supabase) return itemData;
    
    const { data, error } = await supabase
      .from('order_items')
      .insert(itemData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // File upload
  async uploadFile(bucket, fileName, file) {
    if (!supabase) return `https://via.placeholder.com/300x200?text=${fileName}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);
    
    if (error) throw error;
    return data;
  },

  getFileUrl(bucket, fileName) {
    if (!supabase) return `https://via.placeholder.com/300x200?text=${fileName}`;
    
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  }
};
