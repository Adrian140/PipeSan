import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCountry } from '../contexts/CountryContext';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import {
  Build,
  Security,
  LocalShipping,
  Star
} from '@mui/icons-material';

const Home = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCountry();

  const features = [
    {
      icon: <Build sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('home.quality_premium'),
      description: t('home.quality_description')
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('home.extended_warranty'),
      description: t('home.warranty_description')
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('home.fast_delivery'),
      description: t('home.delivery_description')
    },
    {
      icon: <Star sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('home.vast_experience'),
      description: t('home.experience_description')
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Racord Flexibil Premium",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Robinet Monocomandă",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Set Teflon Professional",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&h=200&fit=crop"
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {t('hero.title')}
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                {t('hero.subtitle')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': { backgroundColor: 'grey.100' }
                  }}
                >
                  {t('hero.cta')}
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  {t('hero.cta_secondary')}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                alt="PipeSan Products"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          {t('home.why_pipesan')}
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 6, color: 'text.secondary' }}>
          {t('home.advantages_subtitle')}
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            {t('home.featured_products')}
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, color: 'text.secondary' }}>
            {t('home.popular_products_subtitle')}
          </Typography>
          
          <Grid container spacing={4}>
            {featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
                      {formatPrice(product.price)}
                    </Typography>
                    <Button
                      component={Link}
                      to="/products"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      {t('products.view_details')}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
