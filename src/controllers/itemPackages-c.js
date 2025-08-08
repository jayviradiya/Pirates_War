const ItemPackage = require('../models/itemPackages-m');

const getAllPackages = async (req, res) => {
    try {
        const data = await ItemPackage.find();
        res.status(200).json({ success: true, message: 'Packages fetched', data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching packages', error: error.message });
    }
};

const getPackageById = async (req, res) => {
    try {
        const data = await ItemPackage.findById(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: 'Package not found' });
        res.status(200).json({ success: true, message: 'Package fetched', data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching package', error: error.message });
    }
};


const createPackage = async (req, res) => {
    try {
        const {
            category,
            name,
            baseAmount,
            bonusPercentage = 0,
            totalAmount,
            priceUSD,
            isActive
        } = req.body;

        const imageUrl = req.file?.filename;

        console.log(category, name, baseAmount, bonusPercentage, totalAmount, priceUSD, isActive, imageUrl);


        if (!category || !['Pearl', 'Yulong', 'Safanad'].includes(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing 'category'. Must be 'Pearl', 'Yulong', or 'Safanad'."
            });
        }

        if (!name || !baseAmount || !bonusPercentage || !totalAmount || !priceUSD) {
            return res.status(404).json({
                success: false,
                message: "All Fields are required"
            })
        }

        if (!imageUrl) {
            return res.status(404).json({
                success: false,
                message: "ImageUrl is required"
            })
        }

        const newItem = new ItemPackage({
            category,
            name,
            baseAmount,
            bonusPercentage,
            totalAmount,
            priceUSD,
            imageUrl,
            isActive
        });

        await newItem.save();

        return res.status(201).json({
            success: true,
            message: 'Package created successfully',
            data: newItem
        });

    } catch (error) {
        console.error('Error creating package:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while creating package',
            error: error.message
        });
    }
};


const updatePackage = async (req, res) => {
    try {
        const {
            category,
            name,
            baseAmount,
            bonusPercentage = 0,
            totalAmount,
            priceUSD,
            isActive
        } = req.body;

        const imageUrl = req.file?.filename;

        const itemData = await ItemPackage.findById(req.params.id);

        if (!itemData) {
            return res.status(404).json({
                success: false,
                message: "ElightItem not found"
            });
        }

        if (category && !['Pearl', 'Yulong', 'Safanad'].includes(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid 'category'"
            });
        }

        const updateData = {};
        if (category) updateData.category = category;
        if (name) updateData.name = name;
        if (baseAmount !== undefined) updateData.baseAmount = baseAmount;
        if (bonusPercentage !== undefined) updateData.bonusPercentage = bonusPercentage;
        if (totalAmount !== undefined) updateData.totalAmount = totalAmount;
        if (priceUSD !== undefined) updateData.priceUSD = priceUSD;
        if (typeof isActive !== 'undefined') updateData.isActive = isActive;
        if (imageUrl) updateData.image = imageUrl;

        const updated = await ItemPackage.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Package not found after update attempt' });
        }

        res.status(200).json({
            success: true,
            message: 'Package updated successfully',
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating package',
            error: error.message
        });
    }
};


const deletePackage = async (req, res) => {
    try {
        const deleted = await ItemPackage.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Package not found' });
        res.status(200).json({ success: true, message: 'Package deleted', data: deleted });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting package', error: error.message });
    }
};

module.exports = {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage,
};
