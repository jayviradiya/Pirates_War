const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currency-c');

const upload = require('../middleware/upload');

router.post('/create', upload.single('image'), currencyController.createCurrency);
router.get('/getall', currencyController.getAllCurrencies);
router.get('/get/:id', currencyController.getCurrencyById);
router.put('/update/:id', upload.single('image'), currencyController.updateCurrency);
router.delete('/delete/:id', currencyController.deleteCurrency);

module.exports = router;
