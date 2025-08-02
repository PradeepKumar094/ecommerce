'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../../store/slices/productSlice';
import { fetchProductReviews } from '../../../store/slices/reviewSlice';
import { addToCart } from '../../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../../store/slices/wishlistSlice';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ProductGallery from '../../../components/products/ProductGallery';
import ProductInfo from '../../../components/products/ProductInfo';
import ProductReviews from '../../../components/products/ProductReviews';
import RelatedProducts from '../../../components/products/RelatedProducts';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { product, loading } = useSelector((state) => state.products);
  const { reviews, loading: reviewsLoading } = useSelector((state) => state.reviews);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductById(params.id));
      dispatch(fetchProductReviews(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: selectedVariant ? selectedVariant.price : product.price,
      image: product.images[0],
      quantity,
      variant: selectedVariant
    };

    dispatch(addToCart(cartItem));
  };

  const handleWishlistToggle = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const isInWishlist = wishlistItems.some(item => item.productId === product._id);
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      }));
    }
  };

  const isInWishlist = wishlistItems.some(item => item.productId === product?._id);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-gray-50 min-h-screen">
          <div className="container-custom py-12">
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-gray-50 min-h-screen">
          <div className="container-custom py-12">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
              <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
              <button
                onClick={() => router.push('/products')}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
              >
                Back to Products
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container-custom py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <button
                    onClick={() => router.push('/')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/products')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Products
                  </button>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900">{product.name}</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Gallery */}
            <ProductGallery images={product.images} />
            
            {/* Product Info */}
            <ProductInfo 
              product={product}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
              isInWishlist={isInWishlist}
            />
          </div>

          {/* Product Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {['description', 'specifications', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-sm font-medium text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-gray-500">No specifications available.</p>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <ProductReviews 
                  productId={product._id}
                  reviews={reviews}
                  loading={reviewsLoading}
                />
              )}
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts 
            categoryId={product.category}
            currentProductId={product._id}
          />
        </div>
      </main>
      <Footer />
    </>
  );
} 