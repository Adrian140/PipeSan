import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate order processing și trimitere emailuri
      const orderNumber = `ORD-${Date.now()}`;
      const orderTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Simulează trimiterea email-ului de confirmare comandă
      const orderConfirmationEmail = {
        to: formData.email,
        subject: `Confirmare comandă ${orderNumber} - Prep Center France`,
        template: 'order-confirmation',
        data: {
          orderNumber,
          customerName: `${formData.firstName} ${formData.lastName}`,
          items: items,
          total: orderTotal,
          shippingAddress: formData.shippingAddress,
          estimatedDelivery: '3-5 business days'
        }
      };
      
      console.log('Order confirmation email would be sent:', orderConfirmationEmail);
      
      // Simulează trimiterea email-ului intern către admin
      const adminNotificationEmail = {
        to: 'admin@prep-center.eu',
        subject: `New Order ${orderNumber} - Action Required`,
        template: 'admin-new-order',
        data: {
          orderNumber,
          customerEmail: formData.email,
          total: orderTotal,
          itemCount: items.length
        }
      };
      
      console.log('Admin notification email would be sent:', adminNotificationEmail);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success', { 
        state: { 
          orderNumber,
          total: orderTotal,
          email: formData.email
        }
      });
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Your cart is empty</h1>
          <p className="text-text-secondary mb-8">Add some products to proceed with checkout.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Checkout</h1>
          <p className="text-text-secondary">Complete your order</p>
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-text-primary font-medium">Processing your order...</p>
            </div>
          </div>
        )}

        <CheckoutForm cartItems={items} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Checkout;
