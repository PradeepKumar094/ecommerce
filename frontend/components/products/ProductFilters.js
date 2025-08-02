'use client';

import { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

export default function ProductFilters({ categories, filters, onFilterChange, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      inStock: false
    });
    setSearchQuery('');
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== false
  ) || searchQuery;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiFilter className="w-5 h-5" />
            Filters
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <FiX className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </form>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Min price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Stars</option>
          </select>
        </div>

        {/* Stock Filter */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900">In Stock Only</span>
          </label>
        </div>

        {/* Quick Price Filters */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Quick Price Filters</h4>
          <div className="space-y-2">
            <button
              onClick={() => handleFilterChange('minPrice', '0', 'maxPrice', '25')}
              className="w-full text-left text-sm text-gray-600 hover:text-primary-600 py-1"
            >
              Under $25
            </button>
            <button
              onClick={() => handleFilterChange('minPrice', '25', 'maxPrice', '50')}
              className="w-full text-left text-sm text-gray-600 hover:text-primary-600 py-1"
            >
              $25 - $50
            </button>
            <button
              onClick={() => handleFilterChange('minPrice', '50', 'maxPrice', '100')}
              className="w-full text-left text-sm text-gray-600 hover:text-primary-600 py-1"
            >
              $50 - $100
            </button>
            <button
              onClick={() => handleFilterChange('minPrice', '100')}
              className="w-full text-left text-sm text-gray-600 hover:text-primary-600 py-1"
            >
              Over $100
            </button>
          </div>
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
} 