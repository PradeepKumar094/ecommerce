'use client';

import { FiPackage, FiTruck, FiShield } from 'react-icons/fi';

export default function OrderSummary({ items, total, itemCount, formData }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
        
        {/* Items */}
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={item.image || '/placeholder-product.jpg'}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
            <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-gray-900">
              {shipping === 0 ? 'Free' : formatPrice(shipping)}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-lg font-semibold text-gray-900">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address Preview */}
        {formData.shippingAddress.address && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping to:</h4>
            <p className="text-sm text-gray-600">
              {formData.shippingAddress.firstName} {formData.shippingAddress.lastName}<br />
              {formData.shippingAddress.address}<br />
              {formData.shippingAddress.city}, {formData.shippingAddress.state} {formData.shippingAddress.zipCode}<br />
              {formData.shippingAddress.country}
            </p>
          </div>
        )}

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

        {/* Return Policy */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center text-sm text-green-800">
            <FiPackage className="w-4 h-4 mr-2" />
            <span>30-day return policy</span>
          </div>
        </div>
      </div>
    </div>
  );
} 