import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { uploadLogo, deleteLogo } from '../../utils/logoUpload';
import LogoComponent from '../LogoComponent';

function LogoUpload() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploading(true);
    setMessage('');
    
    try {
      const logoUrl = await uploadLogo(file);
      setMessage('Logo încărcat cu succes! Reîmprospătează pagina pentru a vedea modificările.');
      
      // Reîmprospătează componenta logo după 1 secundă
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      setMessage(`Eroare la încărcarea logo-ului: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDeleteLogo = async () => {
    if (!confirm('Ești sigur că vrei să ștergi logo-ul?')) return;
    
    setUploading(true);
    setMessage('');
    
    try {
      await deleteLogo();
      setMessage('Logo șters cu succes! Reîmprospătează pagina pentru a vedea modificările.');
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      setMessage(`Eroare la ștergerea logo-ului: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Logo Companie</h3>
        
        {/* Current Logo Preview */}
        <div className="mb-6">
          <p className="text-sm font-medium text-text-primary mb-2">Logo curent:</p>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <LogoComponent className="w-16 h-16" />
            <div>
              <p className="font-medium text-text-primary">PipeSan</p>
              <p className="text-sm text-text-secondary">Logo actual al companiei</p>
            </div>
            <button
              onClick={handleDeleteLogo}
              disabled={uploading}
              className="ml-auto text-red-600 hover:text-red-800 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            id="logo-upload"
          />
          <label htmlFor="logo-upload" className="cursor-pointer">
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-lg font-medium text-gray-700">Se încarcă logo-ul...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Încarcă logo nou
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Drag & drop sau click pentru a selecta imaginea
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, WEBP până la 2MB
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes('succes') 
              ? 'bg-green-50 border border-green-200 text-green-600'
              : 'bg-red-50 border border-red-200 text-red-600'
          }`}>
            <div className="flex items-center">
              {message.includes('succes') ? (
                <Check className="w-5 h-5 mr-2" />
              ) : (
                <X className="w-5 h-5 mr-2" />
              )}
              {message}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Instrucțiuni:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Folosește imagini cu fundal transparent (PNG) pentru cel mai bun rezultat</li>
            <li>• Dimensiunea recomandată: 200x200px sau mai mare</li>
            <li>• Logo-ul va fi redimensionat automat pentru diferite secțiuni</li>
            <li>• După încărcare, logo-ul va apărea în header și footer</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LogoUpload;
