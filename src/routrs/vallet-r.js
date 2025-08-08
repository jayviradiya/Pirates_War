const express = require("express");
const router = express.Router();
const {
    createOrUpdateWallet,
    getWalletByUser,
    deleteWalletEntry
} = require("../controllers/vallet-c");

router.post("/create", createOrUpdateWallet);
router.get("/get/:userId", getWalletByUser);
router.delete("/delete/:id", deleteWalletEntry);

module.exports = router;
