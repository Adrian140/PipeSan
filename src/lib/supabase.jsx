import { createClient } from '@supabase/supabase-js';

// Get environment variables - support both naming conventions
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client only if valid credentials are provided
export const supabase = (supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_url_here' && 
  supabaseAnonKey !== 'your_supabase_anon_key_here' &&
  supabaseUrl.startsWith('https://') && 
  supabaseUrl.includes('.supabase.co'))
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
    
    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          email: data.user.email,
          ...userData
        }]);
      
      if (profileError) console.error('Profile creation error:', profileError);
    }
    
    return data;
  },

  async signIn(email, password) {
    if (!supabase) {
      // Demo mode fallback
      console.log('Demo mode: Mock authentication');
      return {
        user: {
          id: 'demo-user',
          email: email,
          user_metadata: {
            name: email === 'contact@pipesan.eu' ? 'Administrator PipeSan' : 'Demo User'
          }
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
    
    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    return { user, profile };
  }
};

// Database functions
export const db = {
  // Products
  async getProducts(filters = {}) {
    if (!supabase) {
      // Return mock data for demo
      return [
        {
          id: '1',
          name: 'Racord Flexibil Premium 1/2"',
          description: 'Racord flexibil de înaltă calitate pentru instalații sanitare',
          bullet_points: ['Material: Inox', 'Lungime: 30cm', 'Diametru: 1/2"'],
          price: 45.99,
          estimated_shipping_price: 5.99,
          category_id: 'racorduri',
          image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop'
          ],
          amazon_links: {
            FR: 'https://amazon.fr/dp/B08XYZ123',
            DE: 'https://amazon.de/dp/B08XYZ123'
          },
          specifications: 'Material: Inox, Lungime: 30cm',
          stock: 25,
          active: true,
          sku: 'RF-001'
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
    
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createProduct(productData) {
    if (!supabase) {
      console.log('Demo mode: Product would be created:', productData);
      return { id: Date.now().toString(), ...productData };
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
      console.log('Demo mode: Product would be updated:', id, productData);
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
      console.log('Demo mode: Product would be deleted:', id);
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
      return [
        { id: 'racorduri', name: 'Racorduri', description: 'Racorduri și fitinguri', slug: 'racorduri' },
        { id: 'robinete', name: 'Robinete', description: 'Robinete și baterii', slug: 'robinete' },
        { id: 'accesorii', name: 'Accesorii', description: 'Accesorii diverse', slug: 'accesorii' }
      ];
    }
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  async createCategory(categoryData) {
    if (!supabase) {
      console.log('Demo mode: Category would be created:', categoryData);
      return { id: Date.now().toString(), ...categoryData };
    }
    
    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Users
  async getUser(id) {
    if (!supabase) return null;
    
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
      console.log('Demo mode: User would be updated:', id, userData);
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
    if (!supabase) {
      console.log('Demo mode: Item would be added to cart');
      return;
    }
    
    const { data, error } = await supabase
      .from('cart_items')
      .upsert([{
        user_id: userId,
        product_id: productId,
        quantity: quantity
      }], {
        onConflict: 'user_id,product_id'
      });
    
    if (error) throw error;
    return data;
  },

  async removeFromCart(userId, productId) {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
  },

  async updateCartItem(userId, productId, quantity) {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
  },

  async clearCart(userId) {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
  },

  // Orders
  async createOrder(orderData) {
    if (!supabase) {
      console.log('Demo mode: Order would be created:', orderData);
      return { id: Date.now().toString(), ...orderData };
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
    if (!supabase) return;
    
    const { data, error } = await supabase
      .from('order_items')
      .insert([orderItemData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // File upload functions
  async uploadFile(bucket, fileName, file) {
    if (!supabase) {
      console.log('Demo mode: File would be uploaded:', fileName);
      // In demo mode, we'll handle this in the component with FileReader
      return { path: fileName };
    }
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) throw error;
    return data;
  },

  getFileUrl(bucket, fileName) {
    if (!supabase) {
      // In demo mode, return the fileName as-is (will be handled by FileReader)
      return fileName;
    }
    
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  },

  async deleteFile(bucket, fileName) {
    if (!supabase) return;
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);
    
    if (error) throw error;
  },

  // Product images
  async addProductImage(productId, imageUrl, altText = '', sortOrder = 0, isPrimary = false) {
    if (!supabase) {
      console.log('Demo mode: Product image would be added');
      return;
    }
    
    const { data, error } = await supabase
      .from('product_images')
      .insert([{
        product_id: productId,
        image_url: imageUrl,
        alt_text: altText,
        sort_order: sortOrder,
        is_primary: isPrimary
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getProductImages(productId) {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('sort_order');
    
    if (error) throw error;
    return data || [];
  },

  async deleteProductImage(imageId) {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('product_images')
      .delete()
      .eq('id', imageId);
    
    if (error) throw error;
  }
};

// Connection test
export const testConnection = async () => {
  if (!supabase) {
    console.log('Supabase not configured - running in demo mode');
    return false;
  }
  
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return false;
  }
};

export default { supabase, auth, db, testConnection };
