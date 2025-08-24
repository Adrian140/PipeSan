import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { db } from '../lib/supabase';
import CheckoutForm from '../components/CheckoutForm';
import {
  Container,
  Typography,
  Alert,
  Box
} from '@mui/material';

const Checkout = () => {
  const { user } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleOrderSubmit = async (orderData) => {
    try {
      setError(null);
      
      // Generate order number
      const orderNumber = `ORD-${Date.now()}`;
      
      // Create order
      const order = await db.createOrder({
        order_number: orderNumber,
        user_id: user?.id || null,
        customer_name: orderData.shipping_name,
        customer_email: orderData.shipping_email,
        customer_phone: orderData.shipping_phone,
        shipping_address: `${orderData.shipping_address}, ${orderData.shipping_city}, ${orderData.shipping_postal_code}`,
        billing_address: orderData.billing_different 
          ? `${orderData.billing_address}, ${orderData.billing_city}, ${orderData.billing_postal_code}`
          : null,
        invoice_type: orderData.invoice_type,
        company_name: orderData.company_name,
        fiscal_code: orderData.fiscal_code,
        vat_number: orderData.vat_number,
        subtotal: orderData.subtotal,
        shipping_cost: orderData.shipping_cost,
        total_amount: orderData.total_amount,
        notes: orderData.notes,
        status: 'pending',
        country: orderData.country,
        free_shipping: orderData.free_shipping
      });

      // Create order items
      for (const item of orderData.items) {
        await db.createOrderItem({
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          product_sku: item.sku,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        });
      }

      // Clear cart
      await clearCart();
      
      // Send notification email (you can implement this)
      // await sendOrderNotification(order);
      
      // Redirect to success page
      navigate(`/order-success/${order.order_number}`);
      
    } catch (error) {
      console.error('Order creation error:', error);
      setError('A apărut o eroare la procesarea comenzii. Încercați din nou.');
    }
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          <Typography variant="body1">
            Trebuie să fiți conectat pentru a finaliza comanda.
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Finalizare Comandă
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Completați informațiile pentru livrare și facturare
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <CheckoutForm onSubmit={handleOrderSubmit} />
    </Container>
  );
};

export default Checkout;
