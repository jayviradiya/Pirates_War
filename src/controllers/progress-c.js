const Progress = require('../models/progress-m');
// Create
const createOrUpdateProgress = async (req, res) => {
    try {
        const { userId, level, EP, ELP, league, BP, rank } = req.body;

        const updatedProgress = await Progress.findOneAndUpdate(
            { userId },
            { userId, level, EP, ELP, league, BP, rank },
            { new: true, upsert: true, runValidators: true } 
        );

        res.status(200).json({ success: true, data: updatedProgress });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get All
const getAllProgress = async (req, res) => {
    try {
        const progresses = await Progress.find().populate('userId');
        res.status(200).json({ success: true, data: progresses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get By ID
const getProgressById = async (req, res) => {
    try {
        const progress = await Progress.findById(req.params.id).populate('userId');
        if (!progress) return res.status(404).json({ success: false, message: "Progress not found" });
        res.status(200).json({ success: true, data: progress });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update
const updateProgress = async (req, res) => {
    try {
        const { level, EP, ELP, league, BP, rank } = req.body;
        const userId = req.params.id;
        const progress = await Progress.findOneAndUpdate(
            { userId },
            { userId, level, EP, ELP, league, BP, rank },
            { new: true, runValidators: true }
        );
        if (!progress) return res.status(404).json({ success: false, message: "Progress not found" });
        res.status(200).json({ success: true, data: progress });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete
const deleteProgress = async (req, res) => {
    try {
        const progress = await Progress.findByIdAndDelete(req.params.id);
        if (!progress) return res.status(404).json({ success: false, message: "Progress not found" });
        res.status(200).json({ success: true, message: "Progress deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createOrUpdateProgress,
    getAllProgress,
    getProgressById,
    updateProgress,
    deleteProgress
};
