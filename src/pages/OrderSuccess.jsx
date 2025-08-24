import React from 'react';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

function OrderSuccess() {
  const location = useLocation();
  const { orderNumber, total } = location.state || {};

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-text-secondary mb-8">
            Thank you for your order. We have received your payment and will process your order shortly.
          </p>

          {orderNumber && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-semibold text-text-primary">{orderNumber}</p>
                </div>
                {total && (
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-semibold text-text-primary">€{total.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>What happens next?</strong><br />
                You will receive an order confirmation email shortly. 
                We will notify you when your order ships with tracking information.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                <Download className="w-5 h-5" />
                Download Invoice
              </button>
              
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need help? Contact us at{' '}
                <a href="mailto:contact@pipesan.eu" className="text-primary hover:text-primary-dark">
                  contact@pipesan.eu
                </a>{' '}
                or{' '}
                <a href="tel:+40264123456" className="text-primary hover:text-primary-dark">
                  +40 264 123 456
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
