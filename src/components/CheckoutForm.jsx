import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useCountry } from '../contexts/CountryContext';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Button,
  Divider,
  Alert,
  Chip
} from '@mui/material';
import {
  LocalShipping,
  Receipt,
  ShoppingCartCheckout
} from '@mui/icons-material';

const CheckoutForm = ({ onSubmit }) => {
  const { user } = useAuth();
  const { items, getTotalPrice } = useCart();
  const { formatPrice, getCurrentCountry } = useCountry();
  const [billingDifferent, setBillingDifferent] = useState(false);
  const [invoiceType, setInvoiceType] = useState('individual');
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      // Shipping address
      shipping_name: user?.name || '',
      shipping_email: user?.email || '',
      shipping_phone: user?.phone || '',
      shipping_address: '',
      shipping_city: '',
      shipping_postal_code: '',
      shipping_country: user?.country || 'FR',
      
      // Billing address (if different)
      billing_name: '',
      billing_address: '',
      billing_city: '',
      billing_postal_code: '',
      billing_country: user?.country || 'FR',
      
      // Company billing info
      company_name: user?.company_name || '',
      fiscal_code: user?.fiscal_code || '',
      vat_number: user?.vat_number || '',
      
      // Order notes
      notes: ''
    }
  });

  const totalPrice = getTotalPrice();
  const freeShipping = totalPrice >= 100;
  const currentCountry = getCurrentCountry();

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      
      const orderData = {
        ...data,
        invoice_type: invoiceType,
        billing_different: billingDifferent,
        items: items,
        subtotal: totalPrice,
        shipping_cost: freeShipping ? 0 : null, // null means to be calculated
        total_amount: totalPrice,
        free_shipping: freeShipping,
        country: currentCountry.code
      };
      
      await onSubmit(orderData);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={4}>
        {/* Shipping Address */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShipping />
                Adresa de Livrare
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nume Complet *"
                    {...register('shipping_name', { required: 'Numele este obligatoriu' })}
                    error={!!errors.shipping_name}
                    helperText={errors.shipping_name?.message}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email *"
                    type="email"
                    {...register('shipping_email', { 
                      required: 'Email-ul este obligatoriu',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email invalid'
                      }
                    })}
                    error={!!errors.shipping_email}
                    helperText={errors.shipping_email?.message}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefon *"
                    {...register('shipping_phone', { required: 'Telefonul este obligatoriu' })}
                    error={!!errors.shipping_phone}
                    helperText={errors.shipping_phone?.message}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Adresa Completă *"
                    multiline
                    rows={2}
                    {...register('shipping_address', { required: 'Adresa este obligatorie' })}
                    error={!!errors.shipping_address}
                    helperText={errors.shipping_address?.message}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Oraș *"
                    {...register('shipping_city', { required: 'Orașul este obligatoriu' })}
                    error={!!errors.shipping_city}
                    helperText={errors.shipping_city?.message}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cod Poștal *"
                    {...register('shipping_postal_code', { required: 'Codul poștal este obligatoriu' })}
                    error={!!errors.shipping_postal_code}
                    helperText={errors.shipping_postal_code?.message}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">Țara de livrare:</Typography>
                    <Chip 
                      label={`${currentCountry.flag} ${currentCountry.name}`}
                      color="primary"
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Receipt />
                Informații Facturare
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Tip Factură</FormLabel>
                <RadioGroup
                  value={invoiceType}
                  onChange={(e) => setInvoiceType(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="individual"
                    control={<Radio />}
                    label="Persoană Fizică"
                  />
                  <FormControlLabel
                    value="company"
                    control={<Radio />}
                    label="Companie"
                  />
                </RadioGroup>
              </FormControl>

              {invoiceType === 'company' && (
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Denumire Companie *"
                      {...register('company_name', { 
                        required: invoiceType === 'company' ? 'Denumirea companiei este obligatorie' : false 
                      })}
                      error={!!errors.company_name}
                      helperText={errors.company_name?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CUI *"
                      {...register('fiscal_code', { 
                        required: invoiceType === 'company' ? 'CUI-ul este obligatoriu' : false 
                      })}
                      error={!!errors.fiscal_code}
                      helperText={errors.fiscal_code?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cod TVA (opțional)"
                      {...register('vat_number')}
                      helperText="Completați doar dacă aveți cod de TVA"
                    />
                  </Grid>
                </Grid>
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    checked={billingDifferent}
                    onChange={(e) => setBillingDifferent(e.target.checked)}
                  />
                }
                label="Adresa de facturare este diferită de cea de livrare"
              />

              {billingDifferent && (
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Adresa de Facturare
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nume / Denumire *"
                      {...register('billing_name', { 
                        required: billingDifferent ? 'Numele este obligatoriu' : false 
                      })}
                      error={!!errors.billing_name}
                      helperText={errors.billing_name?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Adresa Completă *"
                      multiline
                      rows={2}
                      {...register('billing_address', { 
                        required: billingDifferent ? 'Adresa este obligatorie' : false 
                      })}
                      error={!!errors.billing_address}
                      helperText={errors.billing_address?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Oraș *"
                      {...register('billing_city', { 
                        required: billingDifferent ? 'Orașul este obligatoriu' : false 
                      })}
                      error={!!errors.billing_city}
                      helperText={errors.billing_city?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cod Poștal *"
                      {...register('billing_postal_code', { 
                        required: billingDifferent ? 'Codul poștal este obligatoriu' : false 
                      })}
                      error={!!errors.billing_postal_code}
                      helperText={errors.billing_postal_code?.message}
                    />
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Note Comandă (opțional)
              </Typography>
              <TextField
                fullWidth
                label="Observații pentru comandă"
                multiline
                rows={3}
                {...register('notes')}
                helperText="Orice informații suplimentare pentru procesarea comenzii"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rezumatul Comenzii
              </Typography>
              
              {/* Items */}
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

              {/* Subtotal */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">{formatPrice(totalPrice)}</Typography>
              </Box>

              {/* Shipping */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Transport:</Typography>
                <Typography variant="body1" color={freeShipping ? 'success.main' : 'text.primary'}>
                  {freeShipping ? 'GRATUIT' : 'Se calculează'}
                </Typography>
              </Box>

              {freeShipping ? (
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    🎉 <strong>Transport gratuit!</strong><br />
                    Comanda ta depășește 100 EUR.
                  </Typography>
                </Alert>
              ) : (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Transport estimativ:</strong><br />
                    Veți primi o ofertă personalizată cu costul exact de transport.
                  </Typography>
                </Alert>
              )}

              <Divider sx={{ mb: 2 }} />

              {/* Total */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary.main">
                  {formatPrice(totalPrice)}
                  {!freeShipping && ' + transport'}
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<ShoppingCartCheckout />}
                disabled={loading}
              >
                {loading ? 'Se procesează...' : 'Finalizează Comanda'}
              </Button>

              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                Veți primi confirmarea comenzii pe email în cel mai scurt timp.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutForm;
