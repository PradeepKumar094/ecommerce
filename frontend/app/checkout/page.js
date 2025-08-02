'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../store/slices/orderSlice';
import { clearCart } from '../../store/slices/cartSlice';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CheckoutForm from '../../components/checkout/CheckoutForm';
import OrderSummary from '../../components/checkout/OrderSummary';
import PaymentMethods from '../../components/checkout/PaymentMethods';
import { FiCreditCard, FiTruck, FiMapPin, FiUser } from 'react-icons/fi';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { items, total, itemCount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.orders);

  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    shippingAddress: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    // Billing Information
    billingAddress: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    // Payment Information
    payment: {
      method: 'card',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    },
    // Order Options
    orderNotes: '',
    useSameAddress: true,
    saveAddress: false
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    if (items.length === 0) {
      router.push('/cart');
      return;
    }
  }, [user, items, router]);

  const steps = [
    { id: 1, name: 'Shipping', icon: FiTruck },
    { id: 2, name: 'Payment', icon: FiCreditCard },
    { id: 3, name: 'Review', icon: FiUser }
  ];

  const handleFormChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleUseSameAddress = (checked) => {
    setFormData(prev => ({
      ...prev,
      useSameAddress: checked,
      billingAddress: checked ? prev.shippingAddress : prev.billingAddress
    }));
  };

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant
        })),
        shippingAddress: formData.shippingAddress,
        billingAddress: formData.useSameAddress ? formData.shippingAddress : formData.billingAddress,
        paymentMethod: formData.payment.method,
        orderNotes: formData.orderNotes,
        total: total
      };

      const result = await dispatch(createOrder(orderData)).unwrap();
      
      // Clear cart after successful order
      dispatch(clearCart());
      
      // Redirect to order confirmation
      router.push(`/orders/${result._id}/confirmation`);
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  const validateCurrentStep = () => {
    switch (activeStep) {
      case 1:
        const shipping = formData.shippingAddress;
        return shipping.firstName && shipping.lastName && shipping.email && 
               shipping.address && shipping.city && shipping.state && shipping.zipCode;
      case 2:
        const payment = formData.payment;
        return payment.method && payment.cardNumber && payment.cardName && 
               payment.expiryDate && payment.cvv;
      case 3:
        return true;
      default:
        return false;
    }
  };

  if (!user || items.length === 0) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="container-custom py-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600 mt-2">Complete your purchase</p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Progress Steps */}
                <div className="p-6 border-b">
                  <nav aria-label="Progress">
                    <ol className="flex items-center">
                      {steps.map((step, stepIdx) => (
                        <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} ${stepIdx !== 0 ? 'pl-8 sm:pl-20' : ''}`}>
                          <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            {stepIdx !== 0 && (
                              <div className={`h-0.5 w-full ${activeStep > step.id ? 'bg-primary-600' : 'bg-gray-200'}`} />
                            )}
                          </div>
                          <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                            activeStep >= step.id ? 'bg-primary-600' : 'bg-gray-200'
                          }`}>
                            <step.icon className={`h-5 w-5 ${activeStep >= step.id ? 'text-white' : 'text-gray-500'}`} />
                            <span className="sr-only">{step.name}</span>
                          </div>
                          <div className="mt-2">
                            <p className={`text-sm font-medium ${activeStep >= step.id ? 'text-primary-600' : 'text-gray-500'}`}>
                              {step.name}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>

                {/* Form Content */}
                <div className="p-6">
                  {activeStep === 1 && (
                    <CheckoutForm
                      formData={formData}
                      onFormChange={handleFormChange}
                      onUseSameAddress={handleUseSameAddress}
                      step="shipping"
                    />
                  )}

                  {activeStep === 2 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                      <PaymentMethods
                        payment={formData.payment}
                        onPaymentChange={(field, value) => handleFormChange('payment', field, value)}
                      />
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Review</h3>
                      <div className="space-y-6">
                        {/* Shipping Address Review */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">
                              {formData.shippingAddress.firstName} {formData.shippingAddress.lastName}<br />
                              {formData.shippingAddress.address}<br />
                              {formData.shippingAddress.city}, {formData.shippingAddress.state} {formData.shippingAddress.zipCode}<br />
                              {formData.shippingAddress.email}<br />
                              {formData.shippingAddress.phone}
                            </p>
                          </div>
                        </div>

                        {/* Payment Method Review */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">
                              {formData.payment.method === 'card' ? 'Credit Card' : formData.payment.method}<br />
                              Card ending in {formData.payment.cardNumber.slice(-4)}
                            </p>
                          </div>
                        </div>

                        {/* Order Notes */}
                        {formData.orderNotes && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Order Notes</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-600">{formData.orderNotes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handlePrevStep}
                      disabled={activeStep === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {activeStep < 3 ? (
                      <button
                        onClick={handleNextStep}
                        disabled={!validateCurrentStep()}
                        className="px-6 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handlePlaceOrder}
                        disabled={loading || !validateCurrentStep()}
                        className="px-6 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Processing...' : 'Place Order'}
                      </button>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary 
                items={items}
                total={total}
                itemCount={itemCount}
                formData={formData}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 