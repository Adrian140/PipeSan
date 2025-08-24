import { createClient } from '@supabase/supabase-js';

// Environment variables with fallbacks for different deployment platforms
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Configuration Check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlValid: supabaseUrl ? supabaseUrl.startsWith('https://') : false,
  keyLength: supabaseAnonKey ? supabaseAnonKey.length : 0,
  mode: (!supabaseUrl || !supabaseAnonKey) ? 'DEMO' : 'PRODUCTION'
});

// Create Supabase client only if we have valid credentials
let supabase = null;
if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client created successfully');
  } catch (error) {
    console.error('❌ Failed to create Supabase client:', error);
  }
} else {
  console.log('⚠️ Running in demo mode - no Supabase connection');
}

// Authentication functions
export const auth = {
  async signIn(email, password) {
    if (!supabase) {
      throw new Error('Demo mode - use demo credentials');
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  async signUp(email, password, userData) {
    if (!supabase) {
      throw new Error('Demo mode - registration not available');
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
  supabase, // Expose supabase client for checking if we're in demo mode
  
  // Users
  async getUser(id) {
    if (!supabase) {
      return {
        id,
        email: 'demo@example.com',
        name: 'Demo User',
        role: 'customer'
      };
    }
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUser(id, userData) {
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

  // Products
  async getProducts(filters = {}) {
    if (!supabase) {
      return mockProducts;
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
    
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createProduct(productData) {
    if (!supabase) {
      console.log('Demo mode: Product creation simulated');
      return { id: 'demo-' + Date.now(), ...productData };
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProduct(id, productData) {
    if (!supabase) {
      console.log('Demo mode: Product update simulated');
      return { id, ...productData };
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

  async deleteProduct(id) {
    if (!supabase) {
      console.log('Demo mode: Product deletion simulated');
      return;
    }
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Categories
  async getCategories() {
    if (!supabase) {
      return mockCategories;
    }
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  // Cart
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
    
    if (error) throw error;
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

  async removeFromCart(userId, productId) {
    if (!supabase) {
      console.log('Demo mode: Remove from cart simulated');
      return;
    }
    
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
  },

  async clearCart(userId) {
    if (!supabase) {
      console.log('Demo mode: Clear cart simulated');
      return;
    }
    
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
  },

  // Orders
  async createOrder(orderData) {
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

  async createOrderItem(orderItemData) {
    if (!supabase) {
      console.log('Demo mode: Order item creation simulated');
      return { id: 'demo-item-' + Date.now(), ...orderItemData };
    }
    
    const { data, error } = await supabase
      .from('order_items')
      .insert([orderItemData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // File upload
  async uploadFile(bucket, fileName, file) {
    if (!supabase) {
      console.log('Demo mode: File upload simulated');
      return `demo-${fileName}`;
    }
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);
    
    if (error) throw error;
    return data;
  },

  getFileUrl(bucket, fileName) {
    if (!supabase) {
      return `https://via.placeholder.com/300x200?text=${encodeURIComponent(fileName)}`;
    }
    
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  },

  async deleteFile(bucket, fileName) {
    if (!supabase) {
      console.log('Demo mode: File deletion simulated');
      return;
    }
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);
    
    if (error) throw error;
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
    price: 45.99,
    category_id: 'racorduri',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    stock: 25,
    sku: 'RAF-001',
    active: true,
    categories: { id: 'racorduri', name: 'Racorduri', slug: 'racorduri' },
    amazon_links: {
      FR: 'https://amazon.fr/dp/demo1',
      DE: 'https://amazon.de/dp/demo1'
    }
  },
  {
    id: 'demo-2',
    name: 'Robinet Monocomandă Bucătărie',
    description: 'Robinet modern cu design elegant pentru bucătărie',
    price: 189.99,
    category_id: 'robinete',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop',
    stock: 15,
    sku: 'RMB-001',
    active: true,
    categories: { id: 'robinete', name: 'Robinete', slug: 'robinete' },
    amazon_links: {
      FR: 'https://amazon.fr/dp/demo2',
      DE: 'https://amazon.de/dp/demo2'
    }
  },
  {
    id: 'demo-3',
    name: 'Set Teflon Professional',
    description: 'Set complet de teflon pentru etanșări profesionale',
    price: 12.99,
    category_id: 'teflon',
    image_url: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&h=200&fit=crop',
    stock: 50,
    sku: 'STP-001',
    active: true,
    categories: { id: 'teflon', name: 'Teflon & Etanșare', slug: 'teflon-etansare' },
    amazon_links: {
      FR: 'https://amazon.fr/dp/demo3',
      DE: 'https://amazon.de/dp/demo3'
    }
  }
];

export default supabase;
