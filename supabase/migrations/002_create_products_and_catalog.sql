/*
  # Create products and catalog management
  1. Purpose: Product catalog, categories, inventory management
  2. Schema: categories, products, product_variants, product_images
  3. Security: RLS enabled with public read access
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  sku text UNIQUE NOT NULL,
  description text DEFAULT '',
  short_description text DEFAULT '',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  price decimal(10,2) NOT NULL DEFAULT 0.00,
  sale_price decimal(10,2) DEFAULT NULL,
  currency text DEFAULT 'EUR',
  weight decimal(8,3) DEFAULT 0.000,
  dimensions jsonb DEFAULT '{}',
  specifications jsonb DEFAULT '{}',
  features text[] DEFAULT '{}',
  bullet_points text[] DEFAULT '{}',
  amazon_links jsonb DEFAULT '{}',
  stock_quantity integer DEFAULT 0,
  stock_status text DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'on_backorder')),
  manage_stock boolean DEFAULT true,
  rating decimal(3,2) DEFAULT 0.00,
  review_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  meta_title text DEFAULT '',
  meta_description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text DEFAULT '',
  sort_order integer DEFAULT 0,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0.00,
  sale_price decimal(10,2) DEFAULT NULL,
  stock_quantity integer DEFAULT 0,
  weight decimal(8,3) DEFAULT 0.000,
  dimensions jsonb DEFAULT '{}',
  attributes jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read, admin write)
CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Product images policies
CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT 
  USING (
    product_id IN (
      SELECT id FROM products WHERE is_active = true
    )
  );

CREATE POLICY "Admins can manage product images"
  ON product_images FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Product variants policies
CREATE POLICY "Anyone can view active product variants"
  ON product_variants FOR SELECT 
  USING (
    is_active = true AND 
    product_id IN (
      SELECT id FROM products WHERE is_active = true
    )
  );

CREATE POLICY "Admins can manage product variants"
  ON product_variants FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );
