'use client';

import Link from 'next/link';
import { 
  FaMobile, 
  FaTshirt, 
  FaBook, 
  FaHome, 
  FaDumbbell, 
  FaHeart, 
  FaGamepad, 
  FaCar,
  FaUtensils,
  FaGem,
  FaPalette,
  FaTools,
  FaPaw,
  FaBaby,
  FaGraduationCap,
  FaMusic,
  FaFilm,
  FaSeedling,
  FaUserMd,
  FaEllipsisH
} from 'react-icons/fa';

const CategoryGrid = ({ categories, loading }) => {
  const categoryIcons = {
    'Electronics': FaMobile,
    'Clothing': FaTshirt,
    'Books': FaBook,
    'Home & Garden': FaHome,
    'Sports & Outdoors': FaDumbbell,
    'Beauty & Health': FaHeart,
    'Toys & Games': FaGamepad,
    'Automotive': FaCar,
    'Food & Beverages': FaUtensils,
    'Jewelry & Watches': FaGem,
    'Art & Collectibles': FaPalette,
    'Tools & Hardware': FaTools,
    'Pet Supplies': FaPaw,
    'Baby & Kids': FaBaby,
    'Office & School': FaGraduationCap,
    'Music & Instruments': FaMusic,
    'Movies & TV': FaFilm,
    'Garden & Outdoor': FaSeedling,
    'Health & Wellness': FaUserMd,
  };

  const defaultCategories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Beauty & Health',
    'Toys & Games',
    'Books',
    'Automotive'
  ];

  const displayCategories = categories?.length > 0 ? categories : defaultCategories;

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {displayCategories.map((category, index) => {
        const IconComponent = categoryIcons[category] || FaEllipsisH;
        
        return (
          <Link
            key={category}
            href={`/products?category=${encodeURIComponent(category)}`}
            className="group text-center"
          >
            <div className="aspect-square bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center mb-2 group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-200">
              <IconComponent className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
              {category}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryGrid; 