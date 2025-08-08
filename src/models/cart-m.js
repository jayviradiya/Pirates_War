// models/cart.model.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    cartItems: [
        {
            marketId: { type: mongoose.Schema.Types.ObjectId, ref: "Market", required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
