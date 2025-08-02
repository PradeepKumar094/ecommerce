'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { toggleCart, toggleSearch, toggleMobileMenu } from '../../store/slices/uiSlice';
import { 
  FaShoppingCart, 
  FaSearch, 
  FaUser, 
  FaHeart, 
  FaBars, 
  FaTimes,
  FaSignOutAlt 
} from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { itemCount } = useSelector((state) => state.cart);
  const { mobileMenuOpen } = useSelector((state) => state.ui);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient">E-Commerce</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <FaSearch className="search-icon" />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button (Mobile) */}
            <button
              onClick={() => dispatch(toggleSearch())}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                href="/wishlist"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
              >
                <FaHeart className="w-5 h-5" />
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
            >
              <FaShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="cart-badge">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <FaUser className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </button>
                {/* Dropdown menu would go here */}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="btn btn-outline btn-sm"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="btn btn-primary btn-sm"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link"
                  onClick={() => dispatch(toggleMobileMenu())}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="nav-link"
                    onClick={() => dispatch(toggleMobileMenu())}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="nav-link"
                    onClick={() => dispatch(toggleMobileMenu())}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      dispatch(toggleMobileMenu());
                    }}
                    className="nav-link text-left flex items-center"
                  >
                    <FaSignOutAlt className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link
                    href="/auth/login"
                    className="btn btn-outline w-full justify-center"
                    onClick={() => dispatch(toggleMobileMenu())}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="btn btn-primary w-full justify-center"
                    onClick={() => dispatch(toggleMobileMenu())}
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;