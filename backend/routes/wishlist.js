const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private (Customer only)
router.get('/', [
  protect,
  authorize('customer')
], async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'customerProfile.wishlist',
        populate: {
          path: 'seller',
          select: 'name sellerProfile.businessName'
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        wishlist: user.customerProfile.wishlist || []
      }
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching wishlist'
    });
  }
});

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private (Customer only)
router.post('/', [
  protect,
  authorize('customer'),
  body('productId').isMongoId().withMessage('Invalid product ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if product is active
    if (product.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Product is not available'
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if product is already in wishlist
    if (user.customerProfile.wishlist.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product is already in wishlist'
      });
    }

    // Add product to wishlist
    user.customerProfile.wishlist.push(productId);
    await user.save();

    // Populate the added product
    const populatedUser = await User.findById(req.user.id)
      .populate({
        path: 'customerProfile.wishlist',
        populate: {
          path: 'seller',
          select: 'name sellerProfile.businessName'
        }
      });

    res.json({
      success: true,
      message: 'Product added to wishlist successfully',
      data: {
        wishlist: populatedUser.customerProfile.wishlist
      }
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding product to wishlist'
    });
  }
});

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private (Customer only)
router.delete('/:productId', [
  protect,
  authorize('customer')
], async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if product is in wishlist
    if (!user.customerProfile.wishlist.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product is not in wishlist'
      });
    }

    // Remove product from wishlist
    user.customerProfile.wishlist = user.customerProfile.wishlist.filter(
      id => id.toString() !== productId
    );
    await user.save();

    // Populate the updated wishlist
    const populatedUser = await User.findById(req.user.id)
      .populate({
        path: 'customerProfile.wishlist',
        populate: {
          path: 'seller',
          select: 'name sellerProfile.businessName'
        }
      });

    res.json({
      success: true,
      message: 'Product removed from wishlist successfully',
      data: {
        wishlist: populatedUser.customerProfile.wishlist
      }
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing product from wishlist'
    });
  }
});

// @desc    Clear wishlist
// @route   DELETE /api/wishlist
// @access  Private (Customer only)
router.delete('/', [
  protect,
  authorize('customer')
], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Clear wishlist
    user.customerProfile.wishlist = [];
    await user.save();

    res.json({
      success: true,
      message: 'Wishlist cleared successfully',
      data: {
        wishlist: []
      }
    });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing wishlist'
    });
  }
});

// @desc    Check if product is in wishlist
// @route   GET /api/wishlist/check/:productId
// @access  Private (Customer only)
router.get('/check/:productId', [
  protect,
  authorize('customer')
], async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isInWishlist = user.customerProfile.wishlist.includes(productId);

    res.json({
      success: true,
      data: {
        isInWishlist
      }
    });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking wishlist'
    });
  }
});

// @desc    Get wishlist count
// @route   GET /api/wishlist/count
// @access  Private (Customer only)
router.get('/count', [
  protect,
  authorize('customer')
], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const count = user.customerProfile.wishlist.length;

    res.json({
      success: true,
      data: {
        count
      }
    });
  } catch (error) {
    console.error('Get wishlist count error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting wishlist count'
    });
  }
});

module.exports = router; 