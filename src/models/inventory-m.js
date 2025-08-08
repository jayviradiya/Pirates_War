const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  stock: { type: Number, default: 0 },
  amount: { type: Number },
  maxAmount: { type: Number },
  inventoryType: { type: String }, // [ "featured","items","Ships & Pets"]
  image: { type: String },
  isAvailable: { type: Boolean, default: true },
  currency: [
    {
      currencyId:{ type: mongoose.Schema.Types.ObjectId, ref: "Currency"},
      price: { type: Number }
    }
  ],
  specials: [
    {
      name: { type: String }
    }
  ],
  category: [
    {
      name: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
