const express = require('express');
const router = express.Router();

const {
  createMarket,
  getAllMarkets,
  getMarketById,
  updateMarket,
  deleteMarket,
  getMarketsByType
} = require('../controllers/market-c');

router.post('/create', createMarket);
router.get('/getAll', getAllMarkets);
router.get('/get/:id', getMarketById);
router.put('/update/:id', updateMarket);
router.delete('/delete/:id', deleteMarket);
router.get('/fuilter/type/:type', getMarketsByType);

module.exports = router;
