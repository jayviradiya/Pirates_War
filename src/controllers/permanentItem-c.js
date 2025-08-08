const PermanentItem = require('../models/permanentItem-m');

const createItem = async (req, res) => {

    const {
        itemName,
        price,
        quentity,
        discription,
        image,
        bonus,
        category,
    } = req.body

    if(!itemName || !price || !quentity || !discription || !image || !bonus || !category){
        res.status(400).json({
            success: true,
            message: "all Fuileds are require"
        })
    }

  try {
    const newItem = new PermanentItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await PermanentItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await PermanentItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Permanent Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: 'Invalid item ID' });
  }
};

const updateItemById = async (req, res) => {
  try {
    const updatedItem = await PermanentItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Permanent Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteItemById = async (req, res) => {
  try {
    const deletedItem = await PermanentItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Permanent Item not found' });
    }
    res.status(200).json({ message: 'Permanent Item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid item ID' });
  }
};

const getItemByCategory = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500)
    }
} 
module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItemById,
    deleteItemById
}
