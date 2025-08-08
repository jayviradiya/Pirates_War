const express = require('express');
const router = express.Router();

const {
    signUp,
    login,
    googleLogin,
    facebookLogin,
    getCurrentUser,
    updateUserProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    logoutUser,
    verifyEmail
} = require('../controllers/user-c');
const { authMiddleware } = require('../middleware/auth');


// Public
router.post('/register', signUp);
router.post('/login', login);
router.post('/oauth/google', googleLogin);
router.post('/oauth/facebook', facebookLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected
router.post('/logout', authMiddleware, logoutUser);
router.get('/me', authMiddleware, getCurrentUser);
router.patch('/update-profile', authMiddleware, updateUserProfile);
router.patch('/change-password', authMiddleware, changePassword);

//verify mail
router.get('/verify-email', verifyEmail);


module.exports = router;