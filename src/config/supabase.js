import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Supabase configuration is missing. Please check your environment variables.');
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for file uploads
export const uploadProductImage = async (file, productId) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file);

  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName);

  return publicUrl;
};

export const uploadDocument = async (file, documentId) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${documentId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(fileName, file);

  if (error) throw error;
  
  // Get signed URL (private)
  const { data: { signedUrl } } = await supabase.storage
    .from('documents')
    .createSignedUrl(fileName, 3600); // 1 hour expiry

  return signedUrl;
};

export const deleteImage = async (imageUrl, bucket = 'product-images') => {
  const path = imageUrl.split(`/${bucket}/`)[1];
  if (!path) return;
  
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) throw error;
};