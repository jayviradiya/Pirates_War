const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    EP: {
        type: Number,
        default: 0
    },
    ELP: {
        type: Number,
        default: 0
    },
    league: {
        type: String,
    },
    BP: {
        type: Number,
        default: 0
    },
    rank: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
