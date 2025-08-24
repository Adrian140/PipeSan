import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  IconButton
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  Image as ImageIcon
} from '@mui/icons-material';
import { db } from '../lib/supabase';

const ImageUpload = ({ 
  currentImage, 
  onImageChange, 
  bucket = 'products',
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Tipul de fișier nu este acceptat. Folosește: ${acceptedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(`Fișierul este prea mare. Dimensiunea maximă: ${Math.round(maxSize / 1024 / 1024)}MB`);
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${bucket}/${fileName}`;

      // Upload file
      await db.uploadFile(bucket, fileName, file);
      
      // Get public URL
      const publicUrl = db.getFileUrl(bucket, fileName);
      
      // Update preview
      setPreview(publicUrl);
      
      // Notify parent component
      onImageChange(publicUrl);
      
    } catch (err) {
      console.error('Upload error:', err);
      setError('Eroare la încărcarea imaginii. Încercați din nou.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes.join(',')}
        style={{ display: 'none' }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {preview ? (
        <Card sx={{ mb: 2, position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={preview}
            alt="Preview"
            sx={{ objectFit: 'cover' }}
          />
          <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
            }}
            color="error"
          >
            <Delete />
          </IconButton>
        </Card>
      ) : (
        <Card 
          sx={{ 
            mb: 2, 
            p: 4, 
            textAlign: 'center', 
            border: '2px dashed',
            borderColor: 'grey.300',
            cursor: 'pointer',
            '&:hover': { borderColor: 'primary.main' }
          }}
          onClick={handleFileSelect}
        >
          <ImageIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nicio imagine selectată
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Faceți clic pentru a selecta o imagine
          </Typography>
        </Card>
      )}

      <Button
        variant="outlined"
        startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
        onClick={handleFileSelect}
        disabled={uploading}
        fullWidth
        sx={{ py: 2 }}
      >
        {uploading ? 'Se încarcă...' : preview ? 'Schimbă Imaginea' : 'Selectează Imagine'}
      </Button>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Formate acceptate: JPG, PNG, WebP. Dimensiune maximă: {Math.round(maxSize / 1024 / 1024)}MB
      </Typography>
    </Box>
  );
};

export default ImageUpload;
