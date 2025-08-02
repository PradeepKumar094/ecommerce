'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
  const [isWishlisted, setIsWishlisted] = useState(
    wishlistItems.some(item => item.productId === product._id)
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      // Redirect to login
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    };

    dispatch(addToCart(cartItem));
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (!user) {
      // Redirect to login
      return;
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      setIsWishlisted(false);
    } else {
      dispatch(addToWishlist({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      }));
      setIsWishlisted(true);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderRating = () => {
    const rating = product.rating || 0;
    const reviewCount = product.reviewCount || 0;
    
    return (
      <div className="flex items-center gap-1">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">({reviewCount})</span>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
        <div className="flex">
          {/* Product Image */}
          <div className="w-48 h-48 flex-shrink-0">
            <Link href={`/products/${product._id}`}>
              <img
                src={product.images[0] || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-full object-cover rounded-l-lg"
              />
            </Link>
          </div>

          {/* Product Info */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link href={`/products/${product._id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-2">
                  {renderRating()}
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-2 rounded-lg border transition-colors ${
                      isWishlisted 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                    }`}
                  >
                    <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              <div className="text-right">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Link href={`/products/${product._id}`}>
          <img
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button */}
        <Link
          href={`/products/${product._id}`}
          className="absolute top-3 left-3 p-2 bg-white text-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
        >
          <FiEye className="w-4 h-4" />
        </Link>

        {/* Sale Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            Sale
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute bottom-3 left-3">
          {product.stock > 0 ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1">
          {renderRating()}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiShoppingCart className="w-4 h-4" />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
} 