/*
  # Initial Schema for PipeSan E-commerce Platform
  
  1. Purpose: Create complete database structure for PipeSan
  2. Schema: 
     - users (authentication and profiles)
     - categories (product categories)
     - products (product catalog with Amazon links)
     - cart_items (shopping cart functionality)
     - orders (order management)
     - order_items (order line items)
  3. Security: RLS enabled on all tables with appropriate policies
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  account_type text NOT NULL DEFAULT 'individual' CHECK (account_type IN ('individual', 'company')),
  company_name text,
  company_address text,
  contact_person text,
  fiscal_code text,
  vat_number text,
  vies_status text CHECK (vies_status IN ('valid', 'invalid', 'error', 'pending')),
  country text NOT NULL DEFAULT 'FR',
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'pending')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text NOT NULL,
  bullet_points text[],
  price decimal(10,2) NOT NULL DEFAULT 0.00,
  estimated_shipping_price decimal(10,2) DEFAULT 0.00,
  category_id text REFERENCES categories(id) ON DELETE SET NULL,
  image_url text,
  specifications text,
  stock integer NOT NULL DEFAULT 0,
  sku text UNIQUE NOT NULL,
  active boolean DEFAULT true,
  amazon_links jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  shipping_address text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal decimal(10,2) NOT NULL DEFAULT 0.00,
  shipping_cost decimal(10,2) NOT NULL DEFAULT 0.00,
  total_amount decimal(10,2) NOT NULL DEFAULT 0.00,
  notes text,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_sku text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT 
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE 
  USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all users"
  ON users FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Categories policies
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Products policies
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT 
  USING (active = true);

CREATE POLICY "Admins can view all products"
  ON products FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage products"
  ON products FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Cart items policies
CREATE POLICY "Users can view their own cart"
  ON cart_items FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage their own cart"
  ON cart_items FOR ALL 
  USING (auth.uid()::text = user_id::text);

-- Orders policies
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage orders"
  ON orders FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Order items policies
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Admins can view all order items"
  ON order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage order items"
  ON order_items FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Insert default categories
INSERT INTO categories (id, name, description, slug) VALUES
  ('racorduri', 'Racorduri', 'Racorduri și fitinguri pentru instalații sanitare', 'racorduri'),
  ('robinete', 'Robinete', 'Robinete și baterii pentru bucătărie și baie', 'robinete'),
  ('accesorii', 'Accesorii', 'Accesorii diverse pentru instalații sanitare', 'accesorii'),
  ('teflon', 'Teflon & Etanșare', 'Materiale pentru etanșări și izolații', 'teflon-etansare'),
  ('tevi', 'Țevi', 'Țevi din diverse materiale pentru instalații', 'tevi'),
  ('sifoane', 'Sifoane', 'Sifoane pentru chiuvete și lavoare', 'sifoane')
ON CONFLICT (id) DO NOTHING;

-- Insert admin user
INSERT INTO users (
  id,
  email,
  name,
  role,
  account_type,
  company_name,
  country,
  phone
) VALUES (
  uuid_generate_v4(),
  'contact@pipesan.eu',
  'Administrator PipeSan',
  'admin',
  'company',
  'PipeSan',
  'RO',
  '+40 722 140 444'
) ON CONFLICT (email) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
