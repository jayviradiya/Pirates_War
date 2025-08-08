const mongoose = require("mongoose");

const categories = [
  "Paid",
  "Received",
  "Boarding",
  "Cauldron of Aruba",
  "Ship castle",
  "Treasure Chests",
  "Battles",
  "NPCs",
  "Monsters",
  "Guild",
  "Bonus Maps",
  "Cauldron of Saba",
  "Greater Rift",
  "Quests"
];

const logbookSchema = new mongoose.Schema({
//   dateTime: {
//     type: Date,
//     required: true
//   },
  eventName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: categories,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Logbook", logbookSchema);
module.exports.categories = categories;
