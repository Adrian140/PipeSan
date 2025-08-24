import React, { useState } from 'react';
import { CreditCard, MapPin, Truck, Shield } from 'lucide-react';

function CheckoutForm({ cartItems = [], onSubmit }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer Info
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    
    // Billing Address
    billingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'FR',
      vatNumber: ''
    },
    
    // Shipping Address
    shippingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'FR'
    },
    
    // Shipping Method
    shippingMethod: 'standard',
    
    // Payment
    paymentMethod: 'card',
    
    // Options
    sameAsShipping: true,
    createAccount: false,
    marketingConsent: false
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.20;
  const shippingCost = formData.shippingMethod === 'express' ? 19.99 : 9.99;
  const total = subtotal + tax + shippingCost;

  const countries = [
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' }
  ];

  const shippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: '5-7 business days',
      price: 9.99
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: '2-3 business days',
      price: 19.99
    }
  ];

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            First Name *
          </label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => handleInputChange(null, 'firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Last Name *
          </label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => handleInputChange(null, 'lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Email Address *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleInputChange(null, 'email', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange(null, 'phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Shipping Address</h2>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Street Address *
        </label>
        <input
          type="text"
          required
          value={formData.shippingAddress.street}
          onChange={(e) => handleInputChange('shippingAddress', 'street', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            City *
          </label>
          <input
            type="text"
            required
            value={formData.shippingAddress.city}
            onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Postal Code *
          </label>
          <input
            type="text"
            required
            value={formData.shippingAddress.postalCode}
            onChange={(e) => handleInputChange('shippingAddress', 'postalCode', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Country *
          </label>
          <select
            required
            value={formData.shippingAddress.country}
            onChange={(e) => handleInputChange('shippingAddress', 'country', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Shipping Method</h2>
      
      <div className="space-y-3">
        {shippingMethods.map(method => (
          <label
            key={method.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              formData.shippingMethod === method.id
                ? 'border-primary bg-blue-50'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="shippingMethod"
              value={method.id}
              checked={formData.shippingMethod === method.id}
              onChange={(e) => handleInputChange(null, 'shippingMethod', e.target.value)}
              className="mr-3"
            />
            <Truck className="w-5 h-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <div className="font-medium text-text-primary">{method.name}</div>
              <div className="text-sm text-gray-500">{method.description}</div>
            </div>
            <div className="font-semibold text-primary">€{method.price.toFixed(2)}</div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Payment</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-sm text-blue-800">
            Your payment information is secure and encrypted
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formData.paymentMethod === 'card'}
            onChange={(e) => handleInputChange(null, 'paymentMethod', e.target.value)}
            className="mr-3"
          />
          <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
          <span>Credit/Debit Card</span>
        </label>
        
        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={formData.paymentMethod === 'paypal'}
            onChange={(e) => handleInputChange(null, 'paymentMethod', e.target.value)}
            className="mr-3"
          />
          <div className="w-5 h-5 bg-blue-600 rounded mr-3 flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span>PayPal</span>
        </label>
      </div>
      
      {formData.paymentMethod === 'card' && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600">
            Card details will be collected securely on the next page
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > stepNumber ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Place Order
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>€{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (VAT 20%)</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
