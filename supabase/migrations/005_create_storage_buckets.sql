/*
  # Create storage buckets for file uploads
  1. Purpose: Image storage for products, documents, avatars
  2. Schema: Storage buckets with appropriate policies
  3. Security: Public read for product images, authenticated upload
*/

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('product-images', 'product-images', true),
  ('documents', 'documents', false),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Product images storage policies
CREATE POLICY "Anyone can view product images"
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update product images"
  ON storage.objects FOR UPDATE 
  USING (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete product images"
  ON storage.objects FOR DELETE 
  USING (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Documents storage policies
CREATE POLICY "Authenticated users can view documents"
  ON storage.objects FOR SELECT 
  USING (
    bucket_id = 'documents' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Admins can manage documents"
  ON storage.objects FOR ALL 
  USING (
    bucket_id = 'documents' AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE auth_id = auth.uid() AND role = 'admin'
    )
  );

-- Avatars storage policies
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE 
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );
