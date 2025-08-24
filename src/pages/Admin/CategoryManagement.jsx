import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Save,
  Cancel,
  Category as CategoryIcon
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const CategoryManagement = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [alert, setAlert] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Mock categories with product counts
  const mockCategories = [
    { id: 'racorduri', name: 'Racorduri', description: 'Racorduri și fitinguri pentru instalații sanitare', productCount: 15, slug: 'racorduri' },
    { id: 'robinete', name: 'Robinete', description: 'Robinete și baterii pentru bucătărie și baie', productCount: 12, slug: 'robinete' },
    { id: 'accesorii', name: 'Accesorii', description: 'Accesorii diverse pentru instalații sanitare', productCount: 8, slug: 'accesorii' },
    { id: 'teflon', name: 'Teflon & Etanșare', description: 'Materiale pentru etanșări și izolații', productCount: 6, slug: 'teflon-etansare' },
    { id: 'tevi', name: 'Țevi', description: 'Țevi din diverse materiale pentru instalații', productCount: 7, slug: 'tevi' },
    { id: 'sifoane', name: 'Sifoane', description: 'Sifoane pentru chiuvete și lavoare', productCount: 4, slug: 'sifoane' }
  ];

  useEffect(() => {
    setCategories(mockCategories);
  }, []);

  const handleOpenDialog = (category = null) => {
    setEditingCategory(category);
    if (category) {
      setValue('name', category.name);
      setValue('description', category.description);
      setValue('slug', category.slug);
    } else {
      reset();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
    reset();
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const onSubmit = (data) => {
    try {
      const slug = data.slug || generateSlug(data.name);
      
      if (editingCategory) {
        // Update existing category
        setCategories(prev => prev.map(c => 
          c.id === editingCategory.id 
            ? { ...c, ...data, slug, id: editingCategory.id }
            : c
        ));
        setAlert({ type: 'success', message: 'Categoria a fost actualizată cu succes!' });
      } else {
        // Add new category
        const newCategory = {
          ...data,
          id: generateSlug(data.name),
          slug,
          productCount: 0
        };
        setCategories(prev => [...prev, newCategory]);
        setAlert({ type: 'success', message: 'Categoria a fost adăugată cu succes!' });
      }
      handleCloseDialog();
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({ type: 'error', message: 'A apărut o eroare. Încercați din nou.' });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleDelete = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (category && category.productCount > 0) {
      setAlert({ type: 'error', message: 'Nu poți șterge o categorie care conține produse!' });
      setTimeout(() => setAlert(null), 3000);
      setDeleteConfirm(null);
      return;
    }
    
    setCategories(prev => prev.filter(c => c.id !== categoryId));
    setDeleteConfirm(null);
    setAlert({ type: 'success', message: 'Categoria a fost ștearsă cu succes!' });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Gestionare Categorii
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          size="large"
        >
          Adaugă Categorie Nouă
        </Button>
      </Box>

      {alert && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      {/* Categories Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {category.description}
                </Typography>
                <Chip 
                  label={`${category.productCount} produse`} 
                  size="small" 
                  color={category.productCount > 0 ? 'primary' : 'default'}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(category)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setDeleteConfirm(category.id)}
                    color="error"
                    disabled={category.productCount > 0}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Categories Table */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Tabel Categorii
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nume Categorie</TableCell>
              <TableCell>Descriere</TableCell>
              <TableCell>Slug URL</TableCell>
              <TableCell>Produse</TableCell>
              <TableCell>Acțiuni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {category.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {category.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', backgroundColor: 'grey.100', px: 1, py: 0.5, borderRadius: 1 }}>
                    /{category.slug}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={category.productCount} 
                    size="small" 
                    color={category.productCount > 0 ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(category)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteConfirm(category.id)}
                      color="error"
                      disabled={category.productCount > 0}
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

      {/* Add/Edit Category Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCategory ? 'Editează Categoria' : 'Adaugă Categorie Nouă'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nume Categorie"
                  {...register('name', { required: 'Numele categoriei este obligatoriu' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Slug URL"
                  {...register('slug')}
                  helperText="Se va genera automat din nume dacă nu este completat"
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
          >
            {editingCategory ? 'Actualizează' : 'Adaugă'} Categoria
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmă Ștergerea</DialogTitle>
        <DialogContent>
          <Typography>
            Ești sigur că vrei să ștergi această categorie? Această acțiune nu poate fi anulată.
          </Typography>
          {deleteConfirm && categories.find(c => c.id === deleteConfirm)?.productCount > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Această categorie conține produse și nu poate fi ștearsă!
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>
            Anulează
          </Button>
          <Button 
            onClick={() => handleDelete(deleteConfirm)} 
            color="error" 
            variant="contained"
            disabled={deleteConfirm && categories.find(c => c.id === deleteConfirm)?.productCount > 0}
          >
            Șterge
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CategoryManagement;
