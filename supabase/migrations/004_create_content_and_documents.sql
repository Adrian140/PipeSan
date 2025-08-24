/*
  # Create content management and documents
  1. Purpose: CMS functionality, technical documents, site content
  2. Schema: content, documents, services, pricing tables
  3. Security: RLS enabled with admin management
*/

-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text DEFAULT '',
  type text DEFAULT 'text' CHECK (type IN ('text', 'html', 'json', 'image')),
  language text DEFAULT 'en',
  updated_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  type text DEFAULT 'PDF' CHECK (type IN ('PDF', 'DOC', 'XLS', 'ZIP')),
  size text DEFAULT '',
  pages integer DEFAULT 0,
  languages text[] DEFAULT '{"EN"}',
  download_url text NOT NULL,
  category text DEFAULT 'technical' CHECK (category IN ('technical', 'installation', 'certification', 'safety')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  features text[] DEFAULT '{}',
  price text DEFAULT '',
  unit text DEFAULT '',
  category text DEFAULT '',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pricing table
CREATE TABLE IF NOT EXISTS pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL,
  price text NOT NULL,
  unit text NOT NULL,
  category text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;

-- Content policies
CREATE POLICY "Anyone can view content"
  ON content FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage content"
  ON content FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Documents policies
CREATE POLICY "Anyone can view active documents"
  ON documents FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage documents"
  ON documents FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Services policies
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage services"
  ON services FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Pricing policies
CREATE POLICY "Anyone can view active pricing"
  ON pricing FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage pricing"
  ON pricing FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );
