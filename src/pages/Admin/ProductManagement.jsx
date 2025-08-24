import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  CloudUpload,
  Info
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const ProductManagement = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [alert, setAlert] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Mock categories - replace with actual data
  const mockCategories = [
    { id: 'racorduri', name: 'Racorduri' },
    { id: 'robinete', name: 'Robinete' },
    { id: 'accesorii', name: 'Accesorii' },
    { id: 'teflon', name: 'Teflon & Etanșare' },
    { id: 'tevi', name: 'Țevi' },
    { id: 'sifoane', name: 'Sifoane' }
  ];

  // Mock products - replace with actual data
  const mockProducts = [
    {
      id: 1,
      name: "Racord Flexibil Premium 1/2\"",
      description: "Racord flexibil de înaltă calitate pentru instalații sanitare",
      price: 45.99,
      category: 'racorduri',
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      amazonLinks: {
        FR: "https://amazon.fr/dp/B08XYZ123",
        BE: "https://amazon.com.be/dp/B08XYZ123",
        IT: "https://amazon.it/dp/B08XYZ123",
        DE: "https://amazon.de/dp/B08XYZ123",
        ES: "https://amazon.es/dp/B08XYZ123",
        SE: "https://amazon.se/dp/B08XYZ123",
        PL: "https://amazon.pl/dp/B08XYZ123",
        NL: "https://amazon.nl/dp/B08XYZ123",
        UK: "https://amazon.co.uk/dp/B08XYZ123"
      },
      specifications: "Material: Inox, Lungime: 30cm, Diametru: 1/2\"",
      stock: 25,
      active: true,
      sku: "RF-001"
    },
    {
      id: 2,
      name: "Robinet Monocomandă Bucătărie",
      description: "Robinet modern cu design elegant pentru bucătărie",
      price: 189.99,
      category: 'robinete',
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop",
      amazonLinks: {
        FR: "https://amazon.fr/dp/B08ABC456",
        BE: "https://amazon.com.be/dp/B08ABC456",
        IT: "https://amazon.it/dp/B08ABC456",
        DE: "https://amazon.de/dp/B08ABC456",
        ES: "https://amazon.es/dp/B08ABC456",
        SE: "https://amazon.se/dp/B08ABC456",
        PL: "https://amazon.pl/dp/B08ABC456",
        NL: "https://amazon.nl/dp/B08ABC456",
        UK: "https://amazon.co.uk/dp/B08ABC456"
      },
      specifications: "Material: Alamă cromată, Înălțime: 35cm, Garanție: 5 ani",
      stock: 12,
      active: true,
      sku: "RM-002"
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setCategories(mockCategories);
  }, []);

  const handleOpenDialog = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('category', product.category);
      // Set Amazon links for each country
      if (product.amazonLinks) {
        setValue('amazonFR', product.amazonLinks.FR || '');
        setValue('amazonBE', product.amazonLinks.BE || '');
        setValue('amazonIT', product.amazonLinks.IT || '');
        setValue('amazonDE', product.amazonLinks.DE || '');
        setValue('amazonES', product.amazonLinks.ES || '');
        setValue('amazonSE', product.amazonLinks.SE || '');
        setValue('amazonPL', product.amazonLinks.PL || '');
        setValue('amazonNL', product.amazonLinks.NL || '');
        setValue('amazonUK', product.amazonLinks.UK || '');
      }
      setValue('specifications', product.specifications);
      setValue('stock', product.stock);
      setValue('sku', product.sku);
      setValue('active', product.active);
    } else {
      reset();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    reset();
  };

  const onSubmit = (data) => {
    try {
      // Construct Amazon links object
      const amazonLinks = {
        FR: data.amazonFR || '',
        BE: data.amazonBE || '',
        IT: data.amazonIT || '',
        DE: data.amazonDE || '',
        ES: data.amazonES || '',
        SE: data.amazonSE || '',
        PL: data.amazonPL || '',
        NL: data.amazonNL || '',
        UK: data.amazonUK || ''
      };

      const productData = {
        ...data,
        amazonLinks,
        // Remove individual amazon fields
        amazonFR: undefined,
        amazonBE: undefined,
        amazonIT: undefined,
        amazonDE: undefined,
        amazonES: undefined,
        amazonSE: undefined,
        amazonPL: undefined,
        amazonNL: undefined,
        amazonUK: undefined
      };

      if (editingProduct) {
        // Update existing product
        setProducts(prev => prev.map(p => 
          p.id === editingProduct.id 
            ? { ...p, ...productData, id: editingProduct.id }
            : p
        ));
        setAlert({ type: 'success', message: 'Produsul a fost actualizat cu succes!' });
      } else {
        // Add new product
        const newProduct = {
          ...productData,
          id: Date.now(),
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
        };
        setProducts(prev => [...prev, newProduct]);
        setAlert({ type: 'success', message: 'Produsul a fost adăugat cu succes!' });
      }
      handleCloseDialog();
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({ type: 'error', message: 'A apărut o eroare. Încercați din nou.' });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleDelete = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setDeleteConfirm(null);
    setAlert({ type: 'success', message: 'Produsul a fost șters cu succes!' });
    setTimeout(() => setAlert(null), 3000);
  };

  const toggleProductStatus = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, active: !p.active } : p
    ));
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
                    src={product.image}
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
                    label={categories.find(cat => cat.id === product.category)?.name} 
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
              
              {/* Amazon Links Section */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
                  Link-uri Amazon pentru fiecare țară
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Adaugă link-urile complete Amazon pentru fiecare țară unde vinzi produsul
                </Typography>
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
                    {...register('category', { required: 'Categoria este obligatorie' })}
                    error={!!errors.category}
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
                <TextField
                  fullWidth
                  label="��🇷 Amazon Franța"
                  {...register('amazonFR')}
                  placeholder="https://amazon.fr/dp/B08XYZ123"
                  helperText="Link complet Amazon Franța"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="��🇪 Amazon Belgia"
                  {...register('amazonBE')}
                  placeholder="https://amazon.com.be/dp/B08XYZ123"
                  helperText="Link complet Amazon Belgia"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="🇮🇹 Amazon Italia"
                  {...register('amazonIT')}
                  placeholder="https://amazon.it/dp/B08XYZ123"
                  helperText="Link complet Amazon Italia"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="🇩🇪 Amazon Germania"
                  {...register('amazonDE')}
                  placeholder="https://amazon.de/dp/B08XYZ123"
                  helperText="Link complet Amazon Germania"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="��🇸 Amazon Spania"
                  {...register('amazonES')}
                  placeholder="https://amazon.es/dp/B08XYZ123"
                  helperText="Link complet Amazon Spania"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="��🇪 Amazon Suedia"
                  {...register('amazonSE')}
                  placeholder="https://amazon.se/dp/B08XYZ123"
                  helperText="Link complet Amazon Suedia"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="��🇱 Amazon Polonia"
                  {...register('amazonPL')}
                  placeholder="https://amazon.pl/dp/B08XYZ123"
                  helperText="Link complet Amazon Polonia"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="🇳🇱 Amazon Olanda"
                  {...register('amazonNL')}
                  placeholder="https://amazon.nl/dp/B08XYZ123"
                  helperText="Link complet Amazon Olanda"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="🇬🇧 Amazon UK"
                  {...register('amazonUK')}
                  placeholder="https://amazon.co.uk/dp/B08XYZ123"
                  helperText="Link complet Amazon UK"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Notă:</strong> Pentru utilizatorii din "Altă țară", se va folosi automat link-ul din Germania.
                  </Typography>
                </Alert>
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  fullWidth
                  sx={{ py: 2 }}
                >
                  Încarcă Imagine Produs
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Formatul recomandat: JPG, PNG. Dimensiune maximă: 5MB
                </Typography>
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
          >
            {editingProduct ? 'Actualizează' : 'Adaugă'} Produs
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
