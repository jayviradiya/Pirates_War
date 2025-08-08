const UserWallet = require("../models/vallet-m");

// ✅ Create or Update User Wallet Entry
const createOrUpdateWallet = async (req, res) => {
    try {
        const { userId, currencyId, balance } = req.body;

        const wallet = await UserWallet.findOneAndUpdate(
            { userId, currencyId },
            { userId, currencyId, balance },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: wallet });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ✅ Get All Wallet Balances for a User
const getWalletByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const wallet = await UserWallet.find({ userId }).populate("currencyId");
        res.status(200).json({ success: true, data: wallet });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ✅ Delete Wallet Entry
const deleteWalletEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await UserWallet.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Wallet entry not found" });
        }
        res.status(200).json({ success: true, message: "Wallet entry deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createOrUpdateWallet,
    getWalletByUser,
    deleteWalletEntry
};
