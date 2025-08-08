const Logbook = require("../models/logBook-m");
const { categories } = require("../models/logBook-m");

// Create a log entry
exports.createLog = async (req, res) => {
  try {
    const { eventName, category, userId } = req.body;

    if (!eventName || !category || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!categories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const log = await Logbook.create({
      eventName,
      category,
      userId
    });

    res.status(201).json({
      success: true,
      message: "Create successfully",
      data: log
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const {category , userId} = req.query;
    let filter = {};

    if(!userId) {
      res.status(404).json({
        success: false,
        message: "userId is required"
      })
    }

    if (category) {
      if (!categories.includes(category)) {
        return res.status(400).json({ error: "Invalid category filter" });
      }
      filter.category = category;
    }

    if (userId) filter.userId = userId;

    const logs = await Logbook.find(filter).sort({ dateTime: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getLogById = async (req, res) => {
//   try {

//     const { id } = req.params;
    
//     const log = await Logbook.find({ userId });
//     if (!log) return res.status(404).json({ error: "Log not found" });
//     res.json(log);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.updateLog = async (req, res) => {
  try {
    const { category } = req.body;

    if (category && !categories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const log = await Logbook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!log) return res.status(404).json({ error: "Log not found" });

    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const log = await Logbook.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
