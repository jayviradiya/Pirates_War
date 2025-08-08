const Inventory = require("../models/inventory-m");

// CREATE
const createInventory = async (req, res) => {
  const {
    name,
    description,
    stock,
    amount,
    maxAmount,
    inventoryType,
    image,
    currency,
    specials,
    category
  } = req.body;

  console.log(req.body);


  try {
    if   (!name ||
      !description ||
      !inventoryType ||
      stock === undefined ||
      amount === undefined ||
      maxAmount === undefined ||
      !image ||
      !currency ||
      !Array.isArray(currency) ||
      currency.length === 0 ||
      !specials ||
      !Array.isArray(specials) ||
      specials.length === 0 ||
      !category ||
      !Array.isArray(category) ||
      category.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const newInventory = new Inventory({
      name,
      description,
      stock,
      amount,
      maxAmount,
      inventoryType,
      image,
      currency,
      specials,
      category
    });

    const saved = await newInventory.save();

    res.status(201).json({
      success: true,
      message: "Inventory created successfully",
      data: saved
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create inventory",
      error: error.message
    });
  }
};

// READ ALL
const getAllInventory = async (req, res) => {
  try {
    const inventories = await Inventory.find();

    res.status(200).json({
      success: true,
      message: "Inventory list fetched successfully",
      data: inventories
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory list",
      error: error.message
    });
  }
};

// READ ONE
const getInventoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Inventory.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Inventory fetched successfully",
      data: item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory",
      error: error.message
    });
  }
};

// UPDATE
const updateInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Inventory.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update inventory",
      error: error.message
    });
  }
};

// DELETE
const deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Inventory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete inventory",
      error: error.message
    });
  }
};

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory
};
