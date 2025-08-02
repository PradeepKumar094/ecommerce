'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onQuantityChange(item.productId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const totalPrice = item.price * item.quantity;

  return (
    <div className="flex items-center py-6 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24">
        <Link href={`/products/${item.productId}`}>
          <img
            src={item.image || '/placeholder-product.jpg'}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex-1 ml-6">
        <div className="flex justify-between">
          <div className="flex-1">
            <Link href={`/products/${item.productId}`}>
              <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors">
                {item.name}
              </h3>
            </Link>
            
            {item.variant && (
              <p className="text-sm text-gray-500 mt-1">
                Variant: {item.variant.name}
              </p>
            )}
            
            <p className="text-sm text-gray-500 mt-1">
              Price: {formatPrice(item.price)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-1 rounded-full border border-gray-300 hover:bg-gray-50"
            >
              <FiMinus className="w-4 h-4 text-gray-600" />
            </button>
            
            <span className="w-12 text-center text-sm font-medium text-gray-900">
              {quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-1 rounded-full border border-gray-300 hover:bg-gray-50"
            >
              <FiPlus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Total Price */}
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(totalPrice)}
            </p>
          </div>

          {/* Remove Button */}
          <div className="ml-4">
            <button
              onClick={() => onRemove(item.productId)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 