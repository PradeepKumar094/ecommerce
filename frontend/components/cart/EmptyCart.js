'use client';

import { FiShoppingCart } from 'react-icons/fi';

export default function EmptyCart({ onContinueShopping }) {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        {/* Empty Cart Icon */}
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FiShoppingCart className="w-12 h-12 text-gray-400" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onContinueShopping}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Start Shopping
          </button>
          
          <div className="text-sm text-gray-500">
            <p>Already have an account?</p>
            <a href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in to see your saved items
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/products?category=electronics"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h4 className="font-medium text-gray-900">Electronics</h4>
              <p className="text-sm text-gray-600">Latest gadgets</p>
            </a>
            <a
              href="/products?category=fashion"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h4 className="font-medium text-gray-900">Fashion</h4>
              <p className="text-sm text-gray-600">Trendy styles</p>
            </a>
            <a
              href="/products?category=home"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h4 className="font-medium text-gray-900">Home & Garden</h4>
              <p className="text-sm text-gray-600">Home essentials</p>
            </a>
            <a
              href="/products?category=books"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h4 className="font-medium text-gray-900">Books</h4>
              <p className="text-sm text-gray-600">Great reads</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 