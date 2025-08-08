const BattlePoint = require('../models/battlePoints-m');

const createBattlePoint = async (req, res) => {
  try {
    const { rankBadge, title, points, userId } = req.body;

    if (!rankBadge || !title || !points || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'rankBadge, title, points, and userId are required'
      });
    }

    const battle = new BattlePoint({ rankBadge, title, points, userId });
    await battle.save();

    res.status(201).json({
      success: true,
      message: 'Battle Point created successfully',
      data: battle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create battle point',
      error: error.message
    });
  }
};

const getAllBattlePoints = async (req, res) => {
  try {
    const data = await BattlePoint.find().populate('userId');
    res.status(200).json({
      success: true,
      message: 'Battle Points fetched successfully',
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch battle points',
      error: error.message
    });
  }
};

const getBattlePointById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await BattlePoint.findById(id).populate('userId');
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Battle Point not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Battle Point fetched successfully',
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch battle point',
      error: error.message
    });
  }
};

const updateBattlePoint = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format',
        error: 'Provided ID is not a valid MongoDB ObjectId'
      });
    }

    const updated = await BattlePoint.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Battle Point not found for update'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Battle Point updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update battle point',
      error: error.message
    });
  }
};

const deleteBattlePoint = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format',
        error: 'Provided ID is not a valid MongoDB ObjectId'
      });
    }

    const deleted = await BattlePoint.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Battle Point not found for deletion'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Battle Point deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete battle point',
      error: error.message
    });
  }
};

module.exports = {
  createBattlePoint,
  getAllBattlePoints,
  getBattlePointById,
  updateBattlePoint,
  deleteBattlePoint
};
