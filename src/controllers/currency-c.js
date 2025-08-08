const Currency = require('../models/currency-m');

// Create
const createCurrency = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file?.filename;

        if (!image || !name || !description) {
            return res.status(400).json({ success: false, message: 'All fields (image, name, description) are required.' });
        }

        const currency = await Currency.create({ image, name, description });
        res.status(201).json({ success: true, data: currency });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Read All
const getAllCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.find();
        res.status(200).json({ success: true, data: currencies });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Read by ID
const getCurrencyById = async (req, res) => {
    try {
        const currency = await Currency.findById(req.params.id);
        if (!currency) return res.status(404).json({ success: false, message: 'Currency not found' });
        res.status(200).json({ success: true, data: currency });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update
const updateCurrency = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file?.filename;

        const updateData = { name, description };
        if (image) updateData.image = image;

        const currency = await Currency.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!currency) return res.status(404).json({ success: false, message: 'Currency not found' });

        res.status(200).json({ success: true, data: currency });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete
const deleteCurrency = async (req, res) => {
    try {
        const currency = await Currency.findByIdAndDelete(req.params.id);
        if (!currency) return res.status(404).json({ success: false, message: 'Currency not found' });
        res.status(200).json({ success: true, message: 'Currency deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createCurrency,
    getAllCurrencies,
    getCurrencyById,
    updateCurrency,
    deleteCurrency
};
