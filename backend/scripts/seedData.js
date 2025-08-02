const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Product = require('../models/Product');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_platform');
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Sample users data
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'customer',
    isEmailVerified: true,
    isActive: true
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'seller',
    isEmailVerified: true,
    isActive: true,
    sellerProfile: {
      businessName: 'Jane\'s Electronics Store',
      businessDescription: 'Quality electronics and gadgets',
      businessAddress: {
        street: '123 Business St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      isApproved: true,
      rating: 4.5,
      totalReviews: 25
    }
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'password123',
    role: 'seller',
    isEmailVerified: true,
    isActive: true,
    sellerProfile: {
      businessName: 'Mike\'s Fashion Hub',
      businessDescription: 'Trendy clothing and accessories',
      businessAddress: {
        street: '456 Fashion Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      isApproved: true,
      rating: 4.8,
      totalReviews: 42
    }
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    isEmailVerified: true,
    isActive: true
  }
];

// Sample products data
const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip. Perfect for photography enthusiasts and power users.',
    shortDescription: 'Latest iPhone with A17 Pro chip',
    price: 999.99,
    compareAtPrice: 1099.99,
    category: 'Electronics',
    subcategory: 'Smartphones',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        alt: 'iPhone 15 Pro',
        isPrimary: true
      }
    ],
    inventory: {
      quantity: 50,
      lowStockThreshold: 5,
      trackInventory: true
    },
    tags: ['smartphone', 'apple', 'ios', 'camera'],
    status: 'active',
    featured: true,
    rating: {
      average: 4.8,
      count: 156
    }
  },
  {
    name: 'Samsung Galaxy S24',
    description: 'Powerful Android smartphone with excellent display and camera capabilities.',
    shortDescription: 'Latest Samsung Galaxy smartphone',
    price: 899.99,
    category: 'Electronics',
    subcategory: 'Smartphones',
    brand: 'Samsung',
    model: 'Galaxy S24',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
        alt: 'Samsung Galaxy S24',
        isPrimary: true
      }
    ],
    inventory: {
      quantity: 30,
      lowStockThreshold: 5,
      trackInventory: true
    },
    tags: ['smartphone', 'samsung', 'android'],
    status: 'active',
    featured: true,
    rating: {
      average: 4.6,
      count: 89
    }
  },
  {
    name: 'MacBook Air M3',
    description: 'Ultra-thin laptop with M3 chip, perfect for students and professionals.',
    shortDescription: 'Lightweight laptop with M3 chip',
    price: 1299.99,
    category: 'Electronics',
    subcategory: 'Laptops',
    brand: 'Apple',
    model: 'MacBook Air M3',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
        alt: 'MacBook Air M3',
        isPrimary: true
      }
    ],
    inventory: {
      quantity: 25,
      lowStockThreshold: 3,
      trackInventory: true
    },
    tags: ['laptop', 'apple', 'macbook', 'm3'],
    status: 'active',
    featured: true,
    rating: {
      average: 4.9,
      count: 203
    }
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with excellent cushioning and style.',
    shortDescription: 'Comfortable running shoes',
    price: 149.99,
    category: 'Clothing',
    subcategory: 'Shoes',
    brand: 'Nike',
    model: 'Air Max 270',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        alt: 'Nike Air Max 270',
        isPrimary: true
      }
    ],
    inventory: {
      quantity: 100,
      lowStockThreshold: 10,
      trackInventory: true
    },
    tags: ['shoes', 'nike', 'running', 'sports'],
    status: 'active',
    featured: false,
    rating: {
      average: 4.4,
      count: 67
    }
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Premium noise-canceling headphones with exceptional sound quality.',
    shortDescription: 'Premium noise-canceling headphones',
    price: 399.99,
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'Sony',
    model: 'WH-1000XM5',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        alt: 'Sony WH-1000XM5',
        isPrimary: true
      }
    ],
    inventory: {
      quantity: 40,
      lowStockThreshold: 5,
      trackInventory: true
    },
    tags: ['headphones', 'sony', 'noise-canceling', 'audio'],
    status: 'active',
    featured: true,
    rating: {
      average: 4.7,
      count: 134
    }
  }
];

// Seed function
const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create users
    const users = [];
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      users.push(userData);
    }
    
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Find sellers for products
    const sellers = createdUsers.filter(user => user.role === 'seller');
    
    // Create products and assign to sellers
    const products = sampleProducts.map((product, index) => ({
      ...product,
      seller: sellers[index % sellers.length]._id
    }));

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Sample Accounts:');
    console.log('Customer: john@example.com / password123');
    console.log('Seller: jane@example.com / password123');
    console.log('Seller: mike@example.com / password123');
    console.log('Admin: admin@example.com / admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run seeding
connectDB().then(() => {
  seedData();
});
