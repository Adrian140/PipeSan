import { supabase } from '../config/supabase';

export const uploadLogo = async (file) => {
  try {
    // Validează tipul fișierului
    if (!file.type.startsWith('image/')) {
      throw new Error('Fișierul trebuie să fie o imagine');
    }

    // Validează mărimea (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('Imaginea este prea mare (max 2MB)');
    }

    // Șterge logo-ul vechi dacă există
    await supabase.storage
      .from('product-images')
      .remove(['logo/pipesan-logo.png']);

    // Încarcă noul logo
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload('logo/pipesan-logo.png', file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    // Obține URL-ul public
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl('logo/pipesan-logo.png');

    return publicUrl;
  } catch (error) {
    console.error('Error uploading logo:', error);
    throw error;
  }
};

export const deleteLogo = async () => {
  try {
    const { error } = await supabase.storage
      .from('product-images')
      .remove(['logo/pipesan-logo.png']);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting logo:', error);
    throw error;
  }
};
