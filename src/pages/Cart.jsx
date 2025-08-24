import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useCountry } from '../contexts/CountryContext';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  TextField,
  Divider,
  Alert
} from '@mui/material';
import {
  Delete,
  Add,
  Remove,
  ShoppingCartCheckout
} from '@mui/icons-material';

const Cart = () => {
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { formatPrice } = useCountry();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Card sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {t('cart.empty')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Nu aveți produse în coșul de cumpărături.
          </Typography>
          <Button
              component={Link}
              to="/checkout"
            component={Link}
            to="/products"
            variant="contained"
            size="large"
          >
            Continuă Cumpărăturile
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" gutterBottom>
        {t('cart.title')}
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 1
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="h6" color="primary.main">
                      {formatPrice(item.price)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        size="small"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        sx={{ width: 60 }}
                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <IconButton
                      color="error"
                      onClick={() => removeItem(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              component={Link}
              to="/products"
              variant="outlined"
            >
              Continuă Cumpărăturile
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
            >
              Golește Coșul
            </Button>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom>
              Rezumatul Comenzii
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              {items.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    {formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">
                {t('cart.total')}:
              </Typography>
              <Typography variant="h6" color="primary.main">
                {formatPrice(getTotalPrice())}
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
              Prețul final va fi stabilit după procesarea comenzii și va include costurile de transport.
            </Alert>

            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ShoppingCartCheckout />}
              sx={{ mb: 2 }}
            >
              {t('cart.checkout')}
            </Button>

            <Typography variant="body2" color="text.secondary" align="center">
              Veți primi o ofertă personalizată cu prețul final în cel mai scurt timp.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
