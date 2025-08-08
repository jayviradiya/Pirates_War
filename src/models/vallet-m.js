const mongoose = require("mongoose");

const userWalletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    currencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency",
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const UserWallet = mongoose.model("UserWallet", userWalletSchema);
module.exports = UserWallet;
