'use client';

import { FiShoppingCart, FiTruck, FiShield } from 'react-icons/fi';

export default function CartSummary({ items, total, itemCount, onCheckout, user }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax rate
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
        
        {/* Items Count */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Items ({itemCount})</span>
          <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-gray-900">{formatPrice(finalTotal)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          disabled={!user || items.length === 0}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!user ? 'Sign in to Checkout' : 'Proceed to Checkout'}
        </button>

        {/* Free Shipping Notice */}
        {subtotal < 50 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center text-sm text-blue-800">
              <FiTruck className="w-4 h-4 mr-2" />
              <span>
                Add {formatPrice(50 - subtotal)} more for free shipping
              </span>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center text-sm text-gray-600">
            <FiShield className="w-4 h-4 mr-2" />
            <span>Secure checkout with SSL encryption</span>
          </div>
        </div>

        {/* Accepted Payment Methods */}
        <div className="mt-6">
          <p className="text-xs text-gray-500 mb-2">We accept:</p>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 