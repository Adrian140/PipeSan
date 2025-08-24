import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useCountry } from '../contexts/CountryContext';
import { db } from '../lib/supabase';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  ShoppingCart,
  Launch
} from '@mui/icons-material';

const Products = () => {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const { getAmazonLink, formatPrice } = useCountry();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          db.getProducts({ active: true }),
          db.getCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Eroare la încărcarea produselor. Încercați din nou.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = async (product) => {
    try {
      await addItem(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Se încarcă produsele...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom>
        {t('products.title')}
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
        {t('products.subtitle')}
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Caută produse..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 300 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Categorie</InputLabel>
          <Select
            value={selectedCategory}
            label="Categorie"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">Toate categoriile</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                
                <Chip
                  label={product.categories?.name || 'Fără categorie'}
                  size="small"
                  sx={{ mb: 2 }}
                />
                
                {product.specifications && (
                  <Typography variant="body2" sx={{ mb: 2, fontSize: '0.875rem' }}>
                    <strong>Specificații:</strong> {product.specifications}
                  </Typography>
                )}
                
                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {formatPrice(product.price)}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                    fullWidth
                    disabled={product.stock <= 0}
                  >
                    {product.stock <= 0 ? 'Stoc epuizat' : t('products.add_to_cart')}
                  </Button>
                  {product.amazon_links && Object.keys(product.amazon_links).length > 0 && (
                    <Button
                      variant="outlined"
                      startIcon={<Launch />}
                      href={getAmazonLink(product.amazon_links)}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      {t('products.buy_amazon')}
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Nu au fost găsite produse care să corespundă criteriilor de căutare.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Products;
