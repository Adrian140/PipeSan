import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  IconButton,
  Grid
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  Image as ImageIcon,
  Add
} from '@mui/icons-material';
import { db, supabase } from '../lib/supabase';

const ImageUpload = ({ 
  currentImages = [], 
  onImagesChange, 
  bucket = 'products',
  maxImages = 3,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState(currentImages);
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    // Check if adding these files would exceed max images
    if (images.length + files.length > maxImages) {
      setError(`Poți încărca maximum ${maxImages} imagini. Ai deja ${images.length} imagini.`);
      return;
    }

    setUploading(true);
    setError(null);
    const newImages = [...images];

    try {
      for (const file of files) {
        // Validate file type
        if (!acceptedTypes.includes(file.type)) {
          throw new Error(`Tipul de fișier ${file.type} nu este acceptat. Folosește: ${acceptedTypes.join(', ')}`);
        }

        // Validate file size
        if (file.size > maxSize) {
          throw new Error(`Fișierul ${file.name} este prea mare. Dimensiunea maximă: ${Math.round(maxSize / 1024 / 1024)}MB`);
        }

        // Check if we have Supabase connection
        if (supabase) {
          // Create unique filename
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

          try {
            // Upload file
            await db.uploadFile(bucket, fileName, file);
            
            // Get public URL
            const publicUrl = db.getFileUrl(bucket, fileName);
            
            // Add to images array
            newImages.push({
              url: publicUrl,
              fileName: fileName,
              altText: file.name.split('.')[0]
            });
            
          } catch (uploadError) {
            console.error('Upload error for file:', file.name, uploadError);
            throw new Error(`Eroare la încărcarea fișierului ${file.name}: ${uploadError.message}`);
          }
        } else {
          // Demo mode - create mock image URLs
          const reader = new FileReader();
          reader.onload = (e) => {
            newImages.push({
              url: e.target.result,
              fileName: `demo-${Date.now()}-${file.name}`,
              altText: file.name.split('.')[0]
            });
            
            // Update state after all files are processed
            if (newImages.length === images.length + files.length) {
              setImages(newImages);
              onImagesChange(newImages);
            }
          };
          reader.readAsDataURL(file);
        }
     }

       // Only update if not in demo mode (demo mode updates in FileReader callback)
      if (supabase) {
        setImages(newImages);
        onImagesChange(newImages);
      }
     
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Eroare la încărcarea imaginilor. Încercați din nou.');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async (index) => {
    try {
      const imageToRemove = images[index];
      
      // Delete from storage if it has a fileName
      if (imageToRemove.fileName) {
        try {
          await db.deleteFile(bucket, imageToRemove.fileName);
        } catch (deleteError) {
          console.warn('Could not delete file from storage:', deleteError);
        }
      }
      
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      onImagesChange(newImages);
      
    } catch (error) {
      console.error('Error removing image:', error);
      setError('Eroare la ștergerea imaginii');
    }
  };

  const canAddMore = images.length < maxImages;

  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes.join(',')}
        multiple
        style={{ display: 'none' }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h6" gutterBottom>
        Imagini Produs ({images.length}/{maxImages})
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="150"
                image={image.url || image}
                alt={image.altText || `Imagine ${index + 1}`}
                sx={{ objectFit: 'cover' }}
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                }}
                color="error"
                size="small"
              >
                <Delete />
              </IconButton>
              {index === 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem'
                  }}
                >
                  Principală
                </Box>
              )}
            </Card>
          </Grid>
        ))}

        {canAddMore && (
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed',
                borderColor: 'grey.300',
                cursor: 'pointer',
                '&:hover': { borderColor: 'primary.main' }
              }}
              onClick={handleFileSelect}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Add sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Adaugă Imagine
                </Typography>
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>

      {canAddMore && (
        <Button
          variant="outlined"
          startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
          onClick={handleFileSelect}
          disabled={uploading}
          fullWidth
          sx={{ py: 2 }}
        >
          {uploading ? 'Se încarcă...' : `Selectează Imagini (${maxImages - images.length} rămase)`}
        </Button>
      )}

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Formate acceptate: JPG, PNG, WebP. Dimensiune maximă: {Math.round(maxSize / 1024 / 1024)}MB per imagine.
        Prima imagine va fi folosită ca imagine principală.
      </Typography>
    </Box>
  );
};

export default ImageUpload;