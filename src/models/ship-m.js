const mongoose = require('mongoose');
 
const EquipmentSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  // Optional fields depending on game design
  level: Number,
  durability: Number
}, { _id: false });
 
const StatsSchema = new mongoose.Schema({
  criticalDamage: { type: Number, default: 0 },             // %
  criticalDamagePrevention: { type: Number, default: 0 },   // %
  critHitProbability: { type: Number, default: 0 },         // %
  critHitPrevention: { type: Number, default: 0 },          // %
  harpoonDamage: { type: Number, default: 0 },
  harpoonRange: { type: Number, default: 0 },
  vp: { type: Number, default: 0 },                         // Voodoo Points
  hp: { type: Number, default: 0 },                         // Hit Points
  bp: { type: Number, default: 0 },                         // Battle Points
  ep: { type: Number, default: 0 }                          // Elite Points
}, { _id: false });
 
const ShipInventorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true
  },
 
  equipped: {
    cannons: [EquipmentSchema],
    harpoons: [EquipmentSchema],
    armor: [EquipmentSchema],
    repairItems: [EquipmentSchema],
    boosters: [EquipmentSchema],
    sails: [EquipmentSchema]
  },
 
  inStorage: {
    cannons: [EquipmentSchema],
    harpoons: [EquipmentSchema],
    armor: [EquipmentSchema],
    repairItems: [EquipmentSchema],
    boosters: [EquipmentSchema],
    sails: [EquipmentSchema]
  },
 
  shipStats: StatsSchema,
},{ timestamps: true });
 
module.exports = mongoose.model('ShipInventory', ShipInventorySchema);