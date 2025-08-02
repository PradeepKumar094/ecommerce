'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart, clearCart } from '../../store/slices/cartSlice';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import EmptyCart from '../../components/cart/EmptyCart';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { items, total, itemCount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItem({ productId, quantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    if (!user) {
      router.push('/auth/login?redirect=/cart');
      return;
    }
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/products');
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-gray-50 min-h-screen">
          <div className="container-custom py-8">
            <EmptyCart onContinueShopping={handleContinueShopping} />
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
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="container-custom py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600 mt-2">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                <FiTrash2 className="w-4 h-4" />
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FiShoppingCart className="w-5 h-5" />
                    Cart Items ({itemCount})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <button
                  onClick={handleContinueShopping}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary 
                items={items}
                total={total}
                itemCount={itemCount}
                onCheckout={handleCheckout}
                user={user}
              />
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                You might also like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* This would be populated with recommended products */}
                <div className="text-center py-8 text-gray-500">
                  <p>Recommended products will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 