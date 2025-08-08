const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory-c');

router.post('/create', inventoryController.createInventory);
router.get('/getall', inventoryController.getAllInventory);
router.get('/get/:id', inventoryController.getInventoryById);
router.put('/update/:id', inventoryController.updateInventory);
router.delete('/delete/:id', inventoryController.deleteInventory);

module.exports = router;
