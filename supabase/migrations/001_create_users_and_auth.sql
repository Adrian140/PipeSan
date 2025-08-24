/*
  # Create users and authentication tables
  1. Purpose: Set up user authentication and profile management
  2. Schema: users, addresses, billing_profiles tables
  3. Security: RLS enabled with appropriate policies
*/

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  country text DEFAULT 'FR',
  language text DEFAULT 'fr',
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  two_factor_enabled boolean DEFAULT false,
  two_factor_secret text DEFAULT '',
  email_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('shipping', 'billing', 'both')),
  label text DEFAULT '',
  first_name text NOT NULL,
  last_name text NOT NULL,
  company text DEFAULT '',
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL,
  phone text DEFAULT '',
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create billing_profiles table
CREATE TABLE IF NOT EXISTS billing_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('individual', 'company')),
  first_name text DEFAULT '',
  last_name text DEFAULT '',
  company_name text DEFAULT '',
  vat_number text DEFAULT '',
  siren_siret text DEFAULT '',
  country text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  phone text DEFAULT '',
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_profiles ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT 
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE 
  USING (auth.uid() = auth_id);

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Addresses policies
CREATE POLICY "Users can manage own addresses"
  ON addresses FOR ALL 
  USING (
    user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  );

-- Billing profiles policies
CREATE POLICY "Users can manage own billing profiles"
  ON billing_profiles FOR ALL 
  USING (
    user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  );
