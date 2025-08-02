'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { fetchCategories } from '../store/slices/categorySlice';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryGrid from '../components/home/CategoryGrid';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  const dispatch = useDispatch();
  const { products, loading: productsLoading } = useSelector((state) => state.products);
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts({ featured: true, limit: 8 }));
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover amazing products across all categories. From electronics to fashion, 
                we have everything you need.
              </p>
            </div>
            <CategoryGrid categories={categories} loading={categoriesLoading} />
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked products from our top sellers. Quality guaranteed with 
                competitive prices.
              </p>
            </div>
            <FeaturedProducts products={products} loading={productsLoading} />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied customers 
                have to say about their shopping experience.
              </p>
            </div>
            <Testimonials />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary-600">
          <div className="container-custom">
            <Newsletter />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 