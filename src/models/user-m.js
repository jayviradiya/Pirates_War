const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String
    },
    image: {
        type: String
    },
    role: {
        type: Number,
        enum: [1, 2], // 1 = User, 2 = Admin
        required: true,
        default: 1
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerifyToken: {
        type: String
    },
    provider: {
        type: String,
        enum: ['google', 'facebook', 'user'],
        required: true,
        default: 'user'
    },
    provider_account_id: {
        type: String,
        default: null
    },
    userId: {
        type: String,
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
