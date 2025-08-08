const express = require("express");
const router = express.Router();

const {
  addOrUpdateCart,
  getCart,
  removeCartItem,
  clearCart
} = require("../controllers/cart-c");

router.post("/create", addOrUpdateCart); 
router.get("/get/:userId", getCart); 
router.put("/remove", removeCartItem); 
router.delete("/clear/:userId", clearCart);

module.exports = router;
