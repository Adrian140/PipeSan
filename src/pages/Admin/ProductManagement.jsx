import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ImageUpload from '../../components/ImageUpload';
import AmazonLinksManager from '../../components/AmazonLinksManager';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  VisibilityOff,
  Save,
  Cancel,
  Info
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { db } from '../../lib/supabase';

const ProductManagement = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [alert, setAlert] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [amazonLinks, setAmazonLinks] = useState({});
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading products and categories...');
      const [productsData, categoriesData] = await Promise.all([
        db.getProducts(),
        db.getCategories()
      ]);
      
      console.log('📊 Data loaded:', { 
        products: productsData?.length || 0, 
        categories: categoriesData?.length || 0 
      });
      
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('❌ Error loading data:', error);
      setAlert({ type: 'error', message: `Eroare la încărcarea datelor: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('bullet_points', product.bullet_points?.join('\n') || '');
      setValue('price', product.price);
      setValue('estimated_shipping_price', product.estimated_shipping_price || 0);
      setValue('category_id', product.category_id);
      setProductImages(product.images || [product.image_url].filter(Boolean));
      setAmazonLinks(product.amazon_links || {});
      setValue('specifications', product.specifications);
      setValue('stock', product.stock);
      setValue('sku', product.sku);
      setValue('active', product.active);
    } else {
      reset();
      setProductImages([]);
      setAmazonLinks({});
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setProductImages([]);
    setAmazonLinks({});
    reset();
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setAlert(null);
      
      console.log('🚀 Form submission started:', { editingProduct: !!editingProduct, data });
      
      const productData = {
        ...data,
        bullet_points: data.bullet_points ? data.bullet_points.split('\n').filter(point => point.trim()) : [],
        amazon_links: amazonLinks,
        images: productImages,
        image_url: productImages[0]?.url || productImages[0] || null,
        estimated_shipping_price: parseFloat(data.estimated_shipping_price) || 0,
        price: parseFloat(data.price),
        stock: parseInt(data.stock)
      };

      console.log(' Processed product data:', productData);

      let result;
      if (editingProduct) {
        console.log('✏️ Updating existing product:', editingProduct.id);
        result = await db.updateProduct(editingProduct.id, productData);
        setAlert({ type: 'success', message: 'Produsul a fost actualizat cu succes!' });
      } else {
        console.log('➕ Creating new product');
        result = await db.createProduct(productData);
        setAlert({ type: 'success', message: 'Produsul a fost adăugat cu succes!' });
      }

      console.log('✅ Operation completed successfully:', result?.id);

      // Reload data to reflect changes
      await loadData();
      handleCloseDialog();
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('❌ Error saving product:', error);
      console.error('❌ Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      setAlert({ 
        type: 'error', 
        message: `Eroare la salvarea produsului: ${error.message || 'Încercați din nou.'}` 
      });
      setTimeout(() => setAlert(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await db.deleteProduct(productId);
      await loadData();
      setDeleteConfirm(null);
      setAlert({ type: 'success', message: 'Produsul a fost șters cu succes!' });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setAlert({ type: 'error', message: 'Eroare la ștergerea produsului' });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const toggleProductStatus = async (productId) => {
    try {
      const product = products.find(p => p.id === productId);
      if (product) {
        await db.updateProduct(productId, { active: !product.active });
        await loadData();
      }
    } catch (error) {
      console.error('Error updating product status:', error);
      setAlert({ type: 'error', message: 'Eroare la actualizarea statusului' });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Gestionare Produse
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          size="large"
        >
          Adaugă Produs Nou
        </Button>
      </Box>

      {alert && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

     {/* Products Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagine</TableCell>
              <TableCell>Nume Produs</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Categorie</TableCell>
              <TableCell>Preț</TableCell>
              <TableCell>Stoc</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Acțiuni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Box
                    component="img"
                    src={product.image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop"}
                    alt={product.name}
                    sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description?.substring(0, 50)}...
                  </Typography>
                </TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>
                  <Chip 
                    label={product.categories?.name || 'Fără categorie'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <Typography 
                    color={product.stock < 5 ? 'error' : 'text.primary'}
                    sx={{ fontWeight: product.stock < 5 ? 'bold' : 'normal' }}
                  >
                    {product.stock}
                  </Typography>
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={product.active}
                        onChange={() => toggleProductStatus(product.id)}
                        color="primary"
                      />
                    }
                    label={product.active ? 'Activ' : 'Inactiv'}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(product)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteConfirm(product.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Editează Produs' : 'Adaugă Produs Nou'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nume Produs"
                  {...register('name', { required: 'Numele produsului este obligatoriu' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SKU"
                  {...register('sku', { required: 'SKU-ul este obligatoriu' })}
                  error={!!errors.sku}
                  helperText={errors.sku?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <ImageUpload
                  currentImages={productImages}
                  onImagesChange={setProductImages}
                  bucket="products"
                  maxImages={3}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Descriere"
                  multiline
                  rows={3}
                  {...register('description', { required: 'Descrierea este obligatorie' })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Bullet Points"
                  multiline
                  rows={3}
                  {...register('bullet_points')}
                  helperText="Un punct per linie - caracteristici principale ale produsului"
                  placeholder="• Caracteristică 1&#10;• Caracteristică 2&#10;• Caracteristică 3"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preț (EUR)"
                  type="number"
                  step="0.01"
                  {...register('price', { 
                    required: 'Prețul este obligatoriu',
                    min: { value: 0.01, message: 'Prețul trebuie să fie pozitiv' }
                  })}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preț Transport Estimativ (EUR)"
                  type="number"
                  step="0.01"
                  {...register('estimated_shipping_price')}
                  helperText="Costul estimativ de transport pentru acest produs"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stoc"
                  type="number"
                  {...register('stock', { 
                    required: 'Stocul este obligatoriu',
                    min: { value: 0, message: 'Stocul nu poate fi negativ' }
                  })}
                  error={!!errors.stock}
                  helperText={errors.stock?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Categorie</InputLabel>
                  <Select
                    {...register('category_id', { required: 'Categoria este obligatorie' })}
                    error={!!errors.category_id}
                    label="Categorie"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      {...register('active')}
                      defaultChecked={true}
                    />
                  }
                  label="Produs Activ"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Specificații"
                  multiline
                  rows={2}
                  {...register('specifications')}
                  helperText="Detalii tehnice despre produs"
                />
              </Grid>
              
              <Grid item xs={12}>
                <AmazonLinksManager
                  amazonLinks={amazonLinks}
                  onLinksChange={setAmazonLinks}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<Cancel />}>
            Anulează
          </Button>
          <Button 
            onClick={handleSubmit(onSubmit)} 
            variant="contained" 
            startIcon={<Save />}
            disabled={loading}
          >
            {loading ? 'Se salvează...' : (editingProduct ? 'Actualizează' : 'Adaugă')} Produs
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmă Ștergerea</DialogTitle>
        <DialogContent>
          <Typography>
            Ești sigur că vrei să ștergi acest produs? Această acțiune nu poate fi anulată.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>
            Anulează
          </Button>
          <Button 
            onClick={() => handleDelete(deleteConfirm)} 
            color="error" 
            variant="contained"
          >
            Șterge
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductManagement;