'use client';

import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import LoadingSpinner from '../common/LoadingSpinner';

export default function Wishlist({ items, loading }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">My Wishlist</h3>
      </div>
      
      <div className="p-6">
        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.productId} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image || '/placeholder-product.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {item.name}
                  </h4>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                      <FiShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiHeart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-4">Start adding products to your wishlist to save them for later.</p>
            <a
              href="/products"
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse Products
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 