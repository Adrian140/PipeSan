import { createClient } from '@supabase/supabase-js';

// Environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase client only if credentials are available
let supabase = null;
if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://') && supabaseUrl.includes('supabase')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error);
    supabase = null;
  }
} else {
  console.log('🔧 Demo mode: Supabase credentials not configured');
}

// Mock data for demo mode
const mockCategories = [
  { id: 'racorduri', name: 'Racorduri', description: 'Racorduri și fitinguri pentru instalații sanitare', slug: 'racorduri' },
  { id: 'robinete', name: 'Robinete', description: 'Robinete și baterii pentru bucătărie și baie', slug: 'robinete' },
  { id: 'accesorii', name: 'Accesorii', description: 'Accesorii diverse pentru instalații sanitare', slug: 'accesorii' },
  { id: 'teflon', name: 'Teflon & Etanșare', description: 'Materiale pentru etanșări și izolații', slug: 'teflon-etansare' },
  { id: 'tevi', name: 'Țevi', description: 'Țevi din diverse materiale pentru instalații', slug: 'tevi' },
  { id: 'sifoane', name: 'Sifoane', description: 'Sifoane pentru chiuvete și lavoare', slug: 'sifoane' }
];

let mockProducts = [
  {
    id: '1',
    name: 'Racord Flexibil Premium 1/2"',
    description: 'Racord flexibil de înaltă calitate pentru instalații sanitare, rezistent la presiune și temperaturi ridicate.',
    bullet_points: ['Rezistent la presiune înaltă', 'Material inoxidabil', 'Instalare ușoară', 'Garanție 5 ani'],
    price: 45.99,
    estimated_shipping_price: 8.50,
    category_id: 'racorduri',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    specifications: 'Dimensiune: 1/2", Material: Inox 316L, Presiune max: 16 bar',
    stock: 25,
    sku: 'RAC-FLEX-001',
    active: true,
    amazon_links: {
      FR: 'https://amazon.fr/dp/B08XYZ123',
      DE: 'https://amazon.de/dp/B08XYZ123',
      ES: 'https://amazon.es/dp/B08XYZ123',
      IT: 'https://amazon.it/dp/B08XYZ123'
    },
    categories: { name: 'Racorduri' },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Robinet Monocomandă Bucătărie',
    description: 'Robinet modern cu design elegant, perfect pentru bucătării contemporane. Cartușul ceramic asigură durabilitatea.',
    bullet_points: ['Design modern', 'Cartușul ceramic', 'Economie de apă', 'Instalare simplă'],
    price: 189.99,
    estimated_shipping_price: 12.00,
    category_id: 'robinete',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
    specifications: 'Înălțime: 35cm, Material: Alamă cromată, Debit: 8L/min',
    stock: 15,
    sku: 'ROB-MONO-001',
    active: true,
    amazon_links: {
      FR: 'https://amazon.fr/dp/B08ABC456',
      DE: 'https://amazon.de/dp/B08ABC456',
      ES: 'https://amazon.es/dp/B08ABC456',
      IT: 'https://amazon.it/dp/B08ABC456'
    },
    categories: { name: 'Robinete' },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Set Teflon Professional',
    description: 'Set complet de bandă teflonată pentru etanșarea filetelor. Calitate profesională pentru instalatori.',
    bullet_points: ['Calitate profesională', 'Rezistent la temperaturi', 'Aderență excelentă', 'Set complet'],
    price: 12.99,
    estimated_shipping_price: 4.50,
    category_id: 'teflon',
    image_url: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=300&fit=crop',
    specifications: 'Lățime: 12mm, Lungime: 10m, Temperatură max: 200°C',
    stock: 50,
    sku: 'TEF-SET-001',
    active: true,
    amazon_links: {
      FR: 'https://amazon.fr/dp/B08DEF789',
      DE: 'https://amazon.de/dp/B08DEF789',
      ES: 'https://amazon.es/dp/B08DEF789',
      IT: 'https://amazon.it/dp/B08DEF789'
    },
    categories: { name: 'Teflon & Etanșare' },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Database operations
export const db = {
  supabase,

  // Categories
  async getCategories() {
    if (!supabase) {
      console.log('📦 Demo mode: returning mock categories');
      return mockCategories;
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return mockCategories;
    }
  },

  async createCategory(categoryData) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating category creation');
      const newCategory = {
        ...categoryData,
        id: categoryData.slug || categoryData.name.toLowerCase().replace(/\s+/g, '-'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockCategories.push(newCategory);
      return newCategory;
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Products
  async getProducts(filters = {}) {
    if (!supabase) {
      console.log('📦 Demo mode: returning mock products');
      let filteredProducts = [...mockProducts];
      
      if (filters.active !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.active === filters.active);
      }
      
      if (filters.category_id) {
        filteredProducts = filteredProducts.filter(p => p.category_id === filters.category_id);
      }
      
      return filteredProducts;
    }

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
        `)
        .order('created_at', { ascending: false });

      if (filters.active !== undefined) {
        query = query.eq('active', filters.active);
      }

      if (filters.category_id) {
        query = query.eq('category_id', filters.category_id);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return mockProducts;
    }
  },

  async createProduct(productData) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating product creation');
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        categories: mockCategories.find(c => c.id === productData.category_id)
      };
      mockProducts.push(newProduct);
      console.log('✅ Demo product created:', newProduct.id);
      return newProduct;
    }

    try {
      console.log('🚀 Creating product in Supabase:', productData);
      
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .single();

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      console.log('✅ Product created successfully:', data?.id);
      return data;
    } catch (error) {
      console.error('❌ Error creating product:', error);
      throw error;
    }
  },

  async updateProduct(id, updateData) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating product update');
      const index = mockProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], ...updateData, updated_at: new Date().toISOString() };
        console.log('✅ Demo product updated:', id);
        return mockProducts[index];
      }
      throw new Error('Product not found');
    }

    try {
      console.log('🔄 Updating product in Supabase:', id, updateData);
      
      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .single();

      if (error) {
        console.error('❌ Supabase update error:', error);
        throw error;
      }

      console.log('✅ Product updated successfully:', data?.id);
      return data;
    } catch (error) {
      console.error('❌ Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(id) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating product deletion');
      const index = mockProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
        console.log('✅ Demo product deleted:', id);
        return true;
      }
      throw new Error('Product not found');
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // File upload operations
  async uploadFile(bucket, fileName, file) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating file upload');
      return { path: `demo/${fileName}` };
    }

    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  getFileUrl(bucket, fileName) {
    if (!supabase) {
      console.log('📦 Demo mode: returning demo file URL');
      return `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop`;
    }

    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error getting file URL:', error);
      return null;
    }
  },

  async deleteFile(bucket, fileName) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating file deletion');
      return true;
    }

    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },

  // User operations
  async getUser(userId) {
    if (!supabase) {
      console.log('📦 Demo mode: returning mock user');
      return {
        id: userId,
        email: 'demo@example.com',
        name: 'Demo User',
        role: 'customer'
      };
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async updateUser(userId, userData) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating user update');
      return { id: userId, ...userData };
    }

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
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Cart operations
  async getCartItems(userId) {
    if (!supabase) {
      console.log('📦 Demo mode: returning empty cart');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (*)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  },

  async addToCart(userId, productId, quantity) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating add to cart');
      return true;
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: userId,
          product_id: productId,
          quantity: quantity
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  async removeFromCart(userId, productId) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating remove from cart');
      return true;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  async updateCartItem(userId, productId, quantity) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating cart update');
      return true;
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  async clearCart(userId) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating cart clear');
      return true;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Order operations
  async createOrder(orderData) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating order creation');
      return {
        id: Date.now().toString(),
        order_number: orderData.order_number,
        ...orderData,
        created_at: new Date().toISOString()
      };
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async createOrderItem(orderItemData) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating order item creation');
      return {
        id: Date.now().toString(),
        ...orderItemData,
        created_at: new Date().toISOString()
      };
    }

    try {
      const { data, error } = await supabase
        .from('order_items')
        .insert([orderItemData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating order item:', error);
      throw error;
    }
  }
};

// Authentication operations
export const auth = {
  async getCurrentUser() {
    if (!supabase) {
      console.log('📦 Demo mode: returning null user');
      return null;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const profile = await db.getUser(user.id);
        return { user, profile };
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  async signIn(email, password) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating sign in');
      return {
        user: { id: 'demo-user', email },
        error: null
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  async signUp(email, password, userData) {
    if (!supabase) {
      console.log('📦 Demo mode: simulating sign up');
      return {
        user: { id: 'demo-user', email },
        error: null
      };
    }

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
        await db.createUser({
          id: data.user.id,
          email,
          ...userData
        });
      }

      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  async signOut() {
    if (!supabase) {
      console.log('📦 Demo mode: simulating sign out');
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
};

export default db;
