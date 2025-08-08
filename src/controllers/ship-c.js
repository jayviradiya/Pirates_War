const ShipInventory = require('../models/ship-m');

//Create Inventory
const createInventory = async (req, res) => {
    try {
        const {
            userId,
            shipId,
            equipped = {},
            inStorage = {},
            shipStats = {}
        } = req.body;

        if (!userId || !shipId) {
            return res.status(400).json({ error: 'userId and shipId are required' });
        }

        // Limit equipped items (example: max 10 cannons)
        if ((equipped.cannons?.length || 0) > 10) {
            return res.status(400).json({ error: 'Cannot equip more than 10 cannons' });
        }

        const newInventory = new ShipInventory({
            userId,
            shipId,
            equipped,
            inStorage,
            shipStats
        });

        const existingInventory = await ShipInventory.findOne({ userId, shipId });
        if (existingInventory) {
            return res.status(400).json({ error: 'Inventory already exists for this user and ship' });
        }

        await newInventory.save();
        return res.status(201).json({ message: 'Ship inventory created', data: newInventory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get All Inventories
const getAllInventories = async (req, res) => {
    try {
        const inventories = await ShipInventory.find().populate('userId shipId');
        res.status(200).json(inventories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get Single Inventory
const getInventoryById = async (req, res) => {
    try {
        const inventory = await ShipInventory.findById(req.params.inventoryId).populate('userId shipId');
        if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
        res.status(200).json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Utility to deeply merge nested objects
const deepMerge = (target, source) => {
    for (const key in source) {
        if (
            source[key] &&
            typeof source[key] === 'object' &&
            !Array.isArray(source[key])
        ) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
};

//Update Inventory
const updateInventory = async (req, res) => {
    try {
        const { inventoryId } = req.params;
        const existingInventory = await ShipInventory.findById(inventoryId);

        if (!existingInventory) {
            return res.status(404).json({ error: 'Inventory not found' });
        }

        // Convert document to plain JS object
        const updatedData = deepMerge(existingInventory.toObject(), req.body);

        // Update using merged data
        const updatedInventory = await ShipInventory.findByIdAndUpdate(
            inventoryId,
            updatedData,
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Inventory updated successfully', data: updatedInventory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Delete Inventory
const deleteInventory = async (req, res) => {
    try {
        const deleted = await ShipInventory.findByIdAndDelete(req.params.inventoryId);
        if (!deleted) return res.status(404).json({ error: 'Inventory not found' });

        res.status(200).json({ message: 'Inventory deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get By userId and ShipId
const getInventoryByUserIdAndShipId = async (req, res) => {
    try {
        const { userId, shipId } = req.params;

        if (!userId || !shipId) {
            return res.status(400).json({ error: 'userId and shipId are required' });
        }

        const inventory = await ShipInventory.findOne({ userId, shipId }).populate('userId shipId');
        if (!inventory) return res.status(404).json({ error: 'Inventory not found' });

        res.status(200).json({ message: 'Inventory fetched successfully', data: inventory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createInventory,
    getAllInventories,
    getInventoryById,
    updateInventory,
    deleteInventory,
    getInventoryByUserIdAndShipId
};