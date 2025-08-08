const express = require('express');
const router = express.Router();
const {
  createInventory,
  getAllInventories,
  getInventoryById,
  updateInventory,
  deleteInventory,
  getInventoryByUserIdAndShipId
} = require('../controllers/ship-c');
 
router.post('/create', createInventory);
router.get('/all', getAllInventories);
router.get('/:inventoryId', getInventoryById);
router.patch('/update/:inventoryId', updateInventory);
router.delete('/delete/:inventoryId', deleteInventory);
router.get('/getshipinventory/:userId/:shipId', getInventoryByUserIdAndShipId);
 
module.exports = router;