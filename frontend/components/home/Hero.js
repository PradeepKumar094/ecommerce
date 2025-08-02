'use client';

import Link from 'next/link';
import { FaArrowRight, FaShoppingBag, FaStar } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Ultimate
              <span className="block text-yellow-300">Shopping Destination</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover amazing products from trusted sellers. Quality guaranteed with 
              competitive prices and fast delivery.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">10K+</div>
                <div className="text-primary-100">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-primary-100">Sellers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50K+</div>
                <div className="text-primary-100">Happy Customers</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100 flex items-center justify-center"
              >
                <FaShoppingBag className="w-5 h-5 mr-2" />
                Shop Now
                <FaArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/categories"
                className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-600"
              >
                Browse Categories
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
              <div className="flex items-center">
                <FaStar className="w-4 h-4 text-yellow-300 mr-1" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <FaShoppingBag className="w-24 h-24 mx-auto mb-4 text-yellow-300" />
                    <p className="text-lg font-semibold">Start Shopping Today</p>
                    <p className="text-primary-100">Amazing deals await you</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce-gentle"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-8 w-12 h-12 bg-primary-300 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero; 