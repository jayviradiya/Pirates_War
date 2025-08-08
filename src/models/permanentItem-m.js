const mongoose = require('mongoose');

const PermanentItemSchema = new mongoose.Schema({
  itemName: {
    type: String
  },
  price: {
    type: Number
  },
  quentity: {  
    type: Number
  },
  discription: {
    type: String
  },
  image: {
    type: String
  },
  bonus: {
    type: String
  },
  category: {
    type: String
  }
}, {timestamps: true}); 

module.exports = mongoose.model('PermanentItem', PermanentItemSchema);
