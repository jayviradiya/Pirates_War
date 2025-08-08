const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  currencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency',
    required: function () {
      return this.type !== 'currency';
    }
  },
  type: {
    type: String,
    enum: ['elite', 'currency'],
    required: true
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Market', MarketSchema);
