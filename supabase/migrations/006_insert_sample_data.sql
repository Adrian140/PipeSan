/*
  # Insert sample data for testing
  1. Purpose: Populate database with sample categories, products, and admin user
  2. Schema: Sample data for all tables
  3. Security: Creates admin user and sample content
*/

-- Insert sample categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Valves', 'valves', 'Professional ball valves and control valves', 1),
  ('Pipe Fittings', 'fittings', 'Brass and stainless steel pipe fittings', 2),
  ('Elbows', 'elbows', '90° and 45° pipe elbows', 3),
  ('Tees', 'tees', 'T-junction pipe fittings', 4),
  ('Nipples', 'nipples', 'Pipe nipples and extensions', 5),
  ('Reducers', 'reducers', 'Pipe size reducers and adapters', 6),
  ('Hoses', 'hoses', 'Flexible hoses and connections', 7),
  ('Gaskets', 'gaskets', 'Sealing gaskets and O-rings', 8),
  ('Tools', 'tools', 'Professional installation tools', 9),
  ('Accessories', 'accessories', 'Installation accessories and hardware', 10)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, sku, description, short_description, price, sale_price, specifications, features, bullet_points, amazon_links, stock_quantity, category_id) VALUES
  (
    'Professional Pipe Fitting DN25 - Brass Connection',
    'professional-pipe-fitting-dn25-brass',
    'PF-DN25-001',
    'High-quality professional pipe fitting designed for industrial and commercial applications. Made from premium brass with excellent corrosion resistance and durability.',
    'Professional brass pipe fitting DN25 with BSP threads',
    45.99,
    39.99,
    '{"nominalDiameter": "DN25 (1\")", "material": "CW617N Brass", "pressureRating": "PN16 (16 bar)", "temperatureRange": "-20°C to +120°C", "threadType": "BSP (British Standard Pipe)", "certification": "CE, ACS, WRAS", "weight": "0.45 kg", "dimensions": "85 x 45 x 32 mm"}',
    '{"Premium CW617N brass construction", "Excellent corrosion resistance", "Precision machined threads", "Suitable for potable water", "CE certified for EU compliance", "Professional grade quality"}',
    '{"Premium CW617N brass construction", "Excellent corrosion resistance", "Precision machined threads", "Suitable for potable water", "CE certified for EU compliance"}',
    '{"IT": "https://amazon.it/dp/B08EXAMPLE1", "FR": "https://amazon.fr/dp/B08EXAMPLE2", "DE": "https://amazon.de/dp/B08EXAMPLE3", "ES": "https://amazon.es/dp/B08EXAMPLE4"}',
    15,
    (SELECT id FROM categories WHERE slug = 'fittings')
  ),
  (
    'Brass Ball Valve 1/2" BSP',
    'brass-ball-valve-half-inch-bsp',
    'HPV-12-002',
    'Professional brass ball valve with full bore design. Suitable for water, oil, and gas applications. Lever handle for easy operation.',
    'Professional brass ball valve 1/2" BSP with lever handle',
    89.99,
    NULL,
    '{"nominalDiameter": "DN15 (1/2\")", "material": "CW617N Brass", "pressureRating": "PN25 (25 bar)", "temperatureRange": "-10°C to +150°C", "threadType": "BSP Female", "certification": "CE, WRAS", "weight": "0.28 kg", "dimensions": "65 x 35 x 28 mm"}',
    '{"Full bore design", "Lever handle operation", "PTFE seats and seals", "Blow-out proof stem", "ISO 5211 mounting pad"}',
    '{"Full bore design for maximum flow", "Lever handle for easy operation", "PTFE seats and seals", "Blow-out proof stem", "ISO 5211 mounting pad"}',
    '{"IT": "https://amazon.it/dp/B08VALVE1", "FR": "https://amazon.fr/dp/B08VALVE2", "DE": "https://amazon.de/dp/B08VALVE3"}',
    25,
    (SELECT id FROM categories WHERE slug = 'valves')
  )
ON CONFLICT (sku) DO NOTHING;

-- Insert sample content
INSERT INTO content (key, value, type, language) VALUES
  ('hero_title', 'PipeSan - Professional Plumbing Parts', 'text', 'en'),
  ('hero_subtitle', 'Valves, fittings, connectors and professional installation components. Fast EU delivery with complete technical specifications.', 'text', 'en'),
  ('contact_phone', '+33 675 111 62 18', 'text', 'en'),
  ('contact_email', 'contact@pipesan.eu', 'text', 'en'),
  ('contact_address', 'Sat Leamna de jos, Comuna Bucovat, nr.159 A, Region: Dolj, România', 'text', 'en')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Insert sample documents
INSERT INTO documents (title, description, type, size, pages, languages, download_url, category) VALUES
  ('Complete Technical Catalog 2024', 'Full product specifications, dimensions and technical data', 'PDF', '15.2 MB', 156, '{"EN", "FR", "DE", "IT", "ES"}', '#', 'technical'),
  ('Installation Guidelines', 'Professional installation procedures and best practices', 'PDF', '8.7 MB', 89, '{"EN", "FR", "DE"}', '#', 'installation'),
  ('CE Certificates & Declarations', 'Complete certification documentation for all products', 'PDF', '12.4 MB', 234, '{"EN", "FR"}', '#', 'certification'),
  ('Material Safety Data Sheets', 'MSDS for all materials used in our products', 'PDF', '6.1 MB', 67, '{"EN", "FR", "DE", "IT", "ES"}', '#', 'safety')
ON CONFLICT DO NOTHING;
