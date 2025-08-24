// Simple Supabase client that won't crash if env vars are missing
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback values to prevent crashes
if (!supabaseUrl) {
  console.warn('VITE_SUPABASE_URL not found, using fallback');
  supabaseUrl = 'https://placeholder.supabase.co';
}

if (!supabaseKey) {
  console.warn('VITE_SUPABASE_ANON_KEY not found, using fallback');
  supabaseKey = 'placeholder-key';
}

// Mock Supabase client for now
export const auth = {
  getCurrentUser: () => Promise.resolve(null),
  signIn: () => Promise.resolve({ user: null }),
  signUp: () => Promise.resolve({ user: null }),
  signOut: () => Promise.resolve()
};

export const db = {
  getProducts: () => Promise.resolve([]),
  getCategories: () => Promise.resolve([]),
  getUser: () => Promise.resolve(null),
  createOrder: () => Promise.resolve({ id: 1, order_number: 'TEST-001' }),
  createOrderItem: () => Promise.resolve({ id: 1 }),
  addToCart: () => Promise.resolve(),
  removeFromCart: () => Promise.resolve(),
  updateCartItem: () => Promise.resolve(),
  clearCart: () => Promise.resolve(),
  getCartItems: () => Promise.resolve([]),
  updateUser: () => Promise.resolve(),
  uploadFile: () => Promise.resolve(),
  getFileUrl: () => 'https://via.placeholder.com/300x200'
};

console.log('Supabase client initialized with mock functions');
