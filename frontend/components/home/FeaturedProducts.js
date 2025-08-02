'use client';

import Link from 'next/link';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist } from '../../store/slices/wishlistSlice';

const FeaturedProducts = ({ products, loading }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleAddToWishlist = (productId) => {
    if (isAuthenticated) {
      dispatch(addToWishlist(productId));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No featured products available</div>
        <Link href="/products" className="btn btn-primary">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="product-card group">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <img
              src={product.primaryImage || product.images?.[0]?.url || '/placeholder-product.jpg'}
              alt={product.name}
              className="product-image w-full h-full object-cover"
            />
            
            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleAddToWishlist(product._id)}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                title="Add to wishlist"
              >
                <FaHeart className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                title="Add to cart"
              >
                <FaShoppingCart className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Discount Badge */}
            {product.discountPercentage > 0 && (
              <div className="absolute top-3 left-3">
                <span className="badge badge-error">
                  -{product.discountPercentage}%
                </span>
              </div>
            )}

            {/* Stock Status */}
            <div className="absolute bottom-3 left-3">
              {product.stockStatus === 'out_of_stock' ? (
                <span className="badge badge-error">Out of Stock</span>
              ) : product.stockStatus === 'low_stock' ? (
                <span className="badge badge-warning">Low Stock</span>
              ) : (
                <span className="badge badge-success">In Stock</span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Category */}
            <div className="text-sm text-gray-500 mb-1">{product.category}</div>
            
            {/* Product Name */}
            <Link href={`/products/${product._id}`}>
              <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex items-center mr-2">
                {renderStars(product.rating?.average || 0)}
              </div>
              <span className="text-sm text-gray-500">
                ({product.rating?.count || 0})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="price text-lg font-bold text-gray-900">
                  ${product.price?.toFixed(2)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="price-original">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Seller */}
              <div className="text-xs text-gray-500">
                by {product.seller?.name || product.seller?.sellerProfile?.businessName || 'Seller'}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.stockStatus === 'out_of_stock'}
              className="w-full btn btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stockStatus === 'out_of_stock' ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts; 