const mongoose = require('mongoose');

const ItemPackageSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Pearl', 'Yulong', 'Safanad'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  baseAmount: {
    type: Number,
    required: true
  },
  bonusPercentage: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  priceUSD: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ItemPackage', ItemPackageSchema);
