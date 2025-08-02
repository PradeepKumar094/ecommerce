const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  title: {
    type: String,
    required: [true, 'Please provide a review title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Please provide a review comment'],
    trim: true,
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  images: [{
    url: String,
    alt: String
  }],
  helpful: {
    count: {
      type: Number,
      default: 0
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  verified: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  moderation: {
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    moderatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    moderatedAt: Date,
    reason: String
  },
  sellerResponse: {
    comment: String,
    respondedAt: Date,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  helpfulVotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isHelpful: Boolean,
    votedAt: {
      type: Date,
      default: Date.now
    }
  }],
  reportCount: {
    type: Number,
    default: 0
  },
  reportedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    reportedAt: {
      type: Date,
      default: Date.now
    }
  }],
  language: {
    type: String,
    default: 'en'
  },
  sentiment: {
    score: Number, // -1 to 1 (negative to positive)
    label: {
      type: String,
      enum: ['negative', 'neutral', 'positive']
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
reviewSchema.index({ product: 1, isApproved: 1 });
reviewSchema.index({ customer: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ 'moderation.status': 1 });
reviewSchema.index({ verified: 1 });

// Compound index for unique customer review per product
reviewSchema.index({ product: 1, customer: 1 }, { unique: true });

// Virtual for helpful percentage
reviewSchema.virtual('helpfulPercentage').get(function() {
  if (this.helpfulVotes.length === 0) return 0;
  const helpfulCount = this.helpfulVotes.filter(vote => vote.isHelpful).length;
  return Math.round((helpfulCount / this.helpfulVotes.length) * 100);
});

// Virtual for review age
reviewSchema.virtual('ageInDays').get(function() {
  const now = new Date();
  const created = new Date(this.createdAt);
  const diffTime = Math.abs(now - created);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Method to mark review as helpful
reviewSchema.methods.markHelpful = async function(userId, isHelpful) {
  const existingVote = this.helpfulVotes.find(vote => vote.user.toString() === userId.toString());
  
  if (existingVote) {
    // Update existing vote
    existingVote.isHelpful = isHelpful;
    existingVote.votedAt = new Date();
  } else {
    // Add new vote
    this.helpfulVotes.push({
      user: userId,
      isHelpful,
      votedAt: new Date()
    });
  }
  
  // Update helpful count
  this.helpful.count = this.helpfulVotes.filter(vote => vote.isHelpful).length;
  
  await this.save();
  return this;
};

// Method to report review
reviewSchema.methods.reportReview = async function(userId, reason) {
  const existingReport = this.reportedBy.find(report => 
    report.user.toString() === userId.toString()
  );
  
  if (!existingReport) {
    this.reportedBy.push({
      user: userId,
      reason,
      reportedAt: new Date()
    });
    
    this.reportCount += 1;
    await this.save();
  }
  
  return this;
};

// Method to approve review
reviewSchema.methods.approveReview = async function(moderatorId) {
  this.isApproved = true;
  this.moderation.status = 'approved';
  this.moderation.moderatedBy = moderatorId;
  this.moderation.moderatedAt = new Date();
  
  await this.save();
  
  // Update product rating
  const Product = mongoose.model('Product');
  const product = await Product.findById(this.product);
  if (product) {
    await product.updateRating();
  }
  
  return this;
};

// Method to reject review
reviewSchema.methods.rejectReview = async function(moderatorId, reason) {
  this.isApproved = false;
  this.moderation.status = 'rejected';
  this.moderation.moderatedBy = moderatorId;
  this.moderation.moderatedAt = new Date();
  this.moderation.reason = reason;
  
  await this.save();
  return this;
};

// Method to add seller response
reviewSchema.methods.addSellerResponse = async function(sellerId, comment) {
  this.sellerResponse = {
    comment,
    respondedAt: new Date(),
    respondedBy: sellerId
  };
  
  await this.save();
  return this;
};

// Pre-save middleware to check if customer has purchased the product
reviewSchema.pre('save', async function(next) {
  if (this.isNew && !this.order) {
    // Check if customer has purchased this product
    const Order = mongoose.model('Order');
    const order = await Order.findOne({
      customer: this.customer,
      'items.product': this.product,
      status: { $in: ['delivered', 'completed'] }
    });
    
    if (order) {
      this.verified = true;
      this.order = order._id;
    }
  }
  
  next();
});

// Ensure virtual fields are serialized
reviewSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Review', reviewSchema); 