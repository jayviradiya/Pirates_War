const Cart = require("../models/cart-m");

const addOrUpdateCart = async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    if (!userId || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "userId and at least one cart item are required"
      });
    }

    let userCart = await Cart.findOne({ userId });

    if (userCart) {
      // Update existing cart
      cartItems.forEach((newItem) => {
        const index = userCart.cartItems.findIndex(
          (item) => item.inventoryId.toString() === newItem.inventoryId
        );

        if (index > -1) {
          userCart.cartItems[index].quantity = newItem.quantity;
        } else {
          userCart.cartItems.push(newItem);
        }
      });

      await userCart.save();
      return res.status(200).json({
        success: true,
        message: "Cart updated",
        data: userCart
      });
    } else {
      // Create new cart
      const newCart = new Cart({ userId, cartItems });
      await newCart.save();

      res.status(201).json({
        success: true,
        message: "Cart created",
        data: newCart
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding/updating cart",
      error: error.message
    });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("cartItems.inventoryId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message
    });
  }
};

const removeCartItem = async (req, res) => {
  const { userId, inventoryId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.cartItems = cart.cartItems.filter(
      (item) => item.inventoryId.toString() !== inventoryId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing item",
      error: error.message
    });
  }
};

const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { cartItems: [] },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: error.message
    });
  }
};

module.exports = {
  addOrUpdateCart,
  getCart,
  removeCartItem,
  clearCart
};
