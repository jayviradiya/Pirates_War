const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    image: String,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    typeOfSlider: {
        type: String,
        enum: ['Main', 'Second'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

