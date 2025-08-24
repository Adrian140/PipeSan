import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useCountry } from '../contexts/CountryContext';
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
  MenuItem
} from '@mui/material';
import {
  ShoppingCart,
  Launch
} from '@mui/icons-material';

const Products = () => {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const { getAmazonLink, formatPrice } = useCountry();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data - replace with actual data from Supabase
  const categories = [
    { id: 'racorduri', name: 'Racorduri' },
    { id: 'robinete', name: 'Robinete' },
    { id: 'accesorii', name: 'Accesorii' },
    { id: 'teflon', name: 'Teflon & Etanșare' }
  ];

  const products = [
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
      specifications: "Material: Inox, Lungime: 30cm, Diametru: 1/2\""
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
      specifications: "Material: Alamă cromată, Înălțime: 35cm, Garanție: 5 ani"
    },
    {
      id: 3,
      name: "Set Teflon Professional",
      description: "Set complet de teflon pentru etanșări profesionale",
      price: 12.99,
      category: 'teflon',
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&h=200&fit=crop",
      amazonLinks: {
        FR: "https://amazon.fr/dp/B08DEF789",
        BE: "https://amazon.com.be/dp/B08DEF789",
        IT: "https://amazon.it/dp/B08DEF789",
        DE: "https://amazon.de/dp/B08DEF789",
        ES: "https://amazon.es/dp/B08DEF789",
        SE: "https://amazon.se/dp/B08DEF789",
        PL: "https://amazon.pl/dp/B08DEF789",
        NL: "https://amazon.nl/dp/B08DEF789",
        UK: "https://amazon.co.uk/dp/B08DEF789"
      },
      specifications: "Grosime: 0.1mm, Lungime: 12m, Rezistență: -50°C la +260°C"
    },
    {
      id: 4,
      name: "Racord Compresie 20mm",
      description: "Racord de compresie pentru țevi de cupru și plastic",
      price: 23.50,
      category: 'racorduri',
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      amazonLinks: {
        FR: "https://amazon.fr/dp/B08GHI012",
        BE: "https://amazon.com.be/dp/B08GHI012",
        IT: "https://amazon.it/dp/B08GHI012",
        DE: "https://amazon.de/dp/B08GHI012",
        ES: "https://amazon.es/dp/B08GHI012",
        SE: "https://amazon.se/dp/B08GHI012",
        PL: "https://amazon.pl/dp/B08GHI012",
        NL: "https://amazon.nl/dp/B08GHI012",
        UK: "https://amazon.co.uk/dp/B08GHI012"
      },
      specifications: "Material: Alamă, Diametru: 20mm, Presiune max: 16 bar"
    },
    {
      id: 5,
      name: "Robinet Termostat Duș",
      description: "Robinet termostat pentru duș cu control precis al temperaturii",
      price: 299.99,
      category: 'robinete',
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop",
      amazonLinks: {
        FR: "https://amazon.fr/dp/B08JKL345",
        BE: "https://amazon.com.be/dp/B08JKL345",
        IT: "https://amazon.it/dp/B08JKL345",
        DE: "https://amazon.de/dp/B08JKL345",
        ES: "https://amazon.es/dp/B08JKL345",
        SE: "https://amazon.se/dp/B08JKL345",
        PL: "https://amazon.pl/dp/B08JKL345",
        NL: "https://amazon.nl/dp/B08JKL345",
        UK: "https://amazon.co.uk/dp/B08JKL345"
      },
      specifications: "Control termostat, Siguranță la 38°C, Finisaj cromat"
    },
    {
      id: 6,
      name: "Sifon Extensibil Universal",
      description: "Sifon extensibil pentru chiuvetă cu design modern",
      price: 67.99,
      category: 'accesorii',
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&h=200&fit=crop",
      amazonLinks: {
        FR: "https://amazon.fr/dp/B08MNO678",
        BE: "https://amazon.com.be/dp/B08MNO678",
        IT: "https://amazon.it/dp/B08MNO678",
        DE: "https://amazon.de/dp/B08MNO678",
        ES: "https://amazon.es/dp/B08MNO678",
        SE: "https://amazon.se/dp/B08MNO678",
        PL: "https://amazon.pl/dp/B08MNO678",
        NL: "https://amazon.nl/dp/B08MNO678",
        UK: "https://amazon.co.uk/dp/B08MNO678"
      },
      specifications: "Material: Plastic ABS, Extensibil: 32-50mm, Cromat"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addItem(product);
  };

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
                image={product.image}
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
                  label={categories.find(cat => cat.id === product.category)?.name}
                  size="small"
                  sx={{ mb: 2 }}
                />
                
                <Typography variant="body2" sx={{ mb: 2, fontSize: '0.875rem' }}>
                  <strong>Specificații:</strong> {product.specifications}
                </Typography>
                
                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {formatPrice(product.price)}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                    fullWidth
                  >
                    {t('products.add_to_cart')}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Launch />}
                    href={getAmazonLink(product.amazonLinks)}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    {t('products.buy_amazon')}
                  </Button>
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
