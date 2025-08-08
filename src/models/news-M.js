const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  link: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
