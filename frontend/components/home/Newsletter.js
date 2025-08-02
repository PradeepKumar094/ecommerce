'use client';

import { useState } from 'react';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1000);
  };

  if (subscribed) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaEnvelope className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-primary-100 mb-6">
          You've successfully subscribed to our newsletter. We'll keep you updated with the latest products and offers.
        </p>
        <button
          onClick={() => setSubscribed(false)}
          className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600"
        >
          Subscribe Another Email
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <FaEnvelope className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-3xl font-bold text-white mb-4">
        Stay Updated
      </h3>
      
      <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
        Subscribe to our newsletter and be the first to know about new products, 
        exclusive offers, and special promotions.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-l-lg border-0 bg-white/10 text-white placeholder-primary-200 focus:ring-2 focus:ring-white focus:outline-none backdrop-blur-sm"
            required
          />
          <button
            type="submit"
            disabled={loading || !email}
            className="px-6 py-3 bg-white text-primary-600 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <div className="loading-spinner w-5 h-5"></div>
            ) : (
              <>
                Subscribe
                <FaArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </form>

      <p className="text-sm text-primary-200 mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default Newsletter; 