/*
  # Create orders and shopping cart
  1. Purpose: Order management, cart functionality, payment tracking
  2. Schema: orders, order_items, cart_items tables
  3. Security: RLS enabled with user-specific access
*/

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  order_number text UNIQUE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method text DEFAULT 'card',
  payment_intent_id text DEFAULT '',
  
  -- Customer info
  customer_email text NOT NULL,
  customer_phone text DEFAULT '',
  
  -- Billing address
  billing_first_name text NOT NULL,
  billing_last_name text NOT NULL,
  billing_company text DEFAULT '',
  billing_address text NOT NULL,
  billing_city text NOT NULL,
  billing_postal_code text NOT NULL,
  billing_country text NOT NULL,
  billing_vat_number text DEFAULT '',
  
  -- Shipping address
  shipping_first_name text NOT NULL,
  shipping_last_name text NOT NULL,
  shipping_company text DEFAULT '',
  shipping_address text NOT NULL,
  shipping_city text NOT NULL,
  shipping_postal_code text NOT NULL,
  shipping_country text NOT NULL,
  
  -- Pricing
  subtotal decimal(10,2) NOT NULL DEFAULT 0.00,
  tax_amount decimal(10,2) NOT NULL DEFAULT 0.00,
  shipping_amount decimal(10,2) NOT NULL DEFAULT 0.00,
  discount_amount decimal(10,2) DEFAULT 0.00,
  total_amount decimal(10,2) NOT NULL DEFAULT 0.00,
  currency text DEFAULT 'EUR',
  
  -- Shipping
  shipping_method text DEFAULT 'standard',
  tracking_number text DEFAULT '',
  shipped_at timestamptz DEFAULT NULL,
  delivered_at timestamptz DEFAULT NULL,
  
  -- Notes
  customer_notes text DEFAULT '',
  admin_notes text DEFAULT '',
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  variant_id uuid REFERENCES product_variants(id) ON DELETE SET NULL,
  
  -- Product snapshot at time of order
  product_name text NOT NULL,
  product_sku text NOT NULL,
  variant_name text DEFAULT '',
  variant_sku text DEFAULT '',
  
  quantity integer NOT NULL DEFAULT 1,
  unit_price decimal(10,2) NOT NULL DEFAULT 0.00,
  total_price decimal(10,2) NOT NULL DEFAULT 0.00,
  
  created_at timestamptz DEFAULT now()
);

-- Create cart_items table (for persistent cart)
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  variant_id uuid REFERENCES product_variants(id) ON DELETE SET NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT 
  USING (
    user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage orders"
  ON orders FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Order items policies
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT 
  USING (
    order_id IN (
      SELECT id FROM orders 
      WHERE user_id IN (
        SELECT id FROM users WHERE auth_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can view all order items"
  ON order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Cart items policies
CREATE POLICY "Users can manage own cart"
  ON cart_items FOR ALL 
  USING (
    user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  );
