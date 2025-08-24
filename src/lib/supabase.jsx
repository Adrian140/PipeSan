import { createClient } from '@supabase/supabase-js';

// Read from Vercel environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Environment check:', {
  url: supabaseUrl ? 'SET' : 'NOT SET',
  key: supabaseAnonKey ? 'SET' : 'NOT SET'
});

// Create Supabase client
let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client created successfully');
} else {
  console.warn('Supabase credentials not found, running in demo mode');
}

// Auth functions
export const auth = {
  async signIn(email, password) {
    if (!supabase) {
      // Demo admin login
      if (email === 'contact@pipesan.eu' && password === 'Pipesan2022') {
        return {
          user: {
            id: 'demo-admin-id',
            email: 'contact@pipesan.eu'
          }
        };
      }
      throw new Error('Invalid credentials');
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },

  async signUp(email, password, userData) {
    if (!supabase) {
      console.log('Demo mode: Registration simulated');
      return {
        user: {
          id: 'demo-user-' + Date.now(),
          email
        }
      };
    }
    
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

  async signOut() {
    if (!supabase) {
      console.log('Demo mode: Logout simulated');
      return;
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    if (!supabase) {
      // Check if demo admin is logged in (simulate session)
      const demoSession = localStorage.getItem('demo_session');
      if (demoSession === 'admin') {
        return {
          profile: {
            id: 'demo-admin-id',
            email: 'contact@pipesan.eu',
            name: 'Administrator PipeSan',
            role: 'admin',
            account_type: 'company',
            company_name: 'PipeSan',
            country: 'RO',
            phone: '+40 722 140 444'
          }
        };
      }
      return null;
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const profile = await db.getUser(user.id);
    return { profile };
  }
};

// Database functions
export const db = {
  async getUser(userId) {
    if (!supabase) {
      if (userId === 'demo-admin-id') {
        return {
          id: 'demo-admin-id',
          email: 'contact@pipesan.eu',
          name: 'Administrator PipeSan',
          role: 'admin',
          account_type: 'company',
          company_name: 'PipeSan',
          country: 'RO',
          phone: '+40 722 140 444'
        };
      }
      return null;
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    
    return data;
  },

  async updateUser(userId, userData) {
    if (!supabase) {
      console.log('Demo mode: User update simulated');
      return userData;
    }
    
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getProducts(filters = {}) {
    if (!supabase) {
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
            IT: "https://amazon.it/dp/B08XYZ123"
          },
          specifications: "Material: Inox, Lungime: 30cm, Diametru: 1/2\"",
          stock: 25,
          active: true,
          sku: "RF-001",
          categories: { name: 'Racorduri' }
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
            IT: "https://amazon.it/dp/B08ABC456"
          },
          specifications: "Material: Alamă cromată, Înălțime: 35cm, Garanție: 5 ani",
          stock: 12,
          active: true,
          sku: "RM-002",
          categories: { name: 'Robinete' }
        }
      ];
    }
    
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
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    return data || [];
  },

  async getCategories() {
    if (!supabase) {
      return [
        { id: 'racorduri', name: 'Racorduri', description: 'Racorduri și fitinguri pentru instalații sanitare', slug: 'racorduri' },
        { id: 'robinete', name: 'Robinete', description: 'Robinete și baterii pentru bucătărie și baie', slug: 'robinete' },
        { id: 'accesorii', name: 'Accesorii', description: 'Accesorii diverse pentru instalații sanitare', slug: 'accesorii' },
        { id: 'teflon', name: 'Teflon & Etanșare', description: 'Materiale pentru etanșări și izolații', slug: 'teflon-etansare' },
        { id: 'tevi', name: 'Țevi', description: 'Țevi din diverse materiale pentru instalații', slug: 'tevi' },
        { id: 'sifoane', name: 'Sifoane', description: 'Sifoane pentru chiuvete și lavoare', slug: 'sifoane' }
      ];
    }
    
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    return data || [];
  },

  async getCartItems(userId) {
    if (!supabase) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (*)
      `)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
    
    return data || [];
  },

  async addToCart(userId, productId, quantity) {
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

  async updateCartItem(userId, productId, quantity) {
    if (!supabase) {
      console.log('Demo mode: Update cart simulated');
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

  async removeFromCart(userId, productId) {
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

  async clearCart(userId) {
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

  async createOrder(orderData) {
    if (!supabase) {
      console.log('Demo mode: Create order simulated');
      return {
        id: 'demo-order-' + Date.now(),
        order_number: orderData.order_number
      };
    }
    
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async createOrderItem(itemData) {
    if (!supabase) {
      console.log('Demo mode: Create order item simulated');
      return itemData;
    }
    
    const { data, error } = await supabase
      .from('order_items')
      .insert(itemData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
