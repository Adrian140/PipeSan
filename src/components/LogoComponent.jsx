import React, { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';
import { supabase } from '../config/supabase';

function LogoComponent({ className = "w-10 h-10" }) {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      // Încearcă să obții logo-ul din Supabase Storage
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl('logo/pipesan-logo.png');
      
      if (data?.publicUrl) {
        // Verifică dacă imaginea există
        const response = await fetch(data.publicUrl);
        if (response.ok) {
          setLogoUrl(data.publicUrl);
        }
      }
    } catch (error) {
      console.log('Logo not found in storage, using fallback');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`${className} bg-gray-200 rounded-lg animate-pulse`} />
    );
  }

  if (logoUrl) {
    return (
      <img 
        src={logoUrl}
        alt="PipeSan Logo" 
        className={`${className} rounded-lg object-contain`}
        onError={() => setLogoUrl(null)}
      />
    );
  }

  // Fallback la iconul Wrench dacă logo-ul nu se încarcă
  return (
    <div className={`${className} bg-gradient-to-br from-primary to-copper rounded-lg flex items-center justify-center`}>
      <Wrench className="w-6 h-6 text-white" />
    </div>
  );
}

export default LogoComponent;
