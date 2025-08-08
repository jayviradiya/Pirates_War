const mongoose = require('mongoose');

const battlePointSchema = new mongoose.Schema({
  rankBadge: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BattlePoint', battlePointSchema);
