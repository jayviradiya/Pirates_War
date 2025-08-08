const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user-m');
const bcrypt = require('bcryptjs');
const { default: axios } = require('axios');
const { logging } = require('googleapis/build/src/apis/logging');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const validator = require("validator");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (user) => {
    return jwt.sign({ id: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateToken = (id, role, expiresIn = '1h') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn });
};

const generate8DigitUserId = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    }

    let hashString = hash.toString();

    while (hashString.length < 8) {
        hashString += Math.floor(Math.random() * 10);
    }

    return hashString.slice(0, 8);
}

//menualy User Create 
const signUp = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        if (!email || !password || !userName) {
            return res.status(400).json({
                success: false,
                message: "userName, email and password are required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please Enter Valid Email"
            });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {

            if (existUser.isVerified === false) {
                const emailVerifyToken = createToken(email);
                existUser.emailVerifyToken = emailVerifyToken;

                existUser.save();

                const verifyUrl = `${process.env.CLIENT_URL}/api/users/verify-email?token=${emailVerifyToken}`;
                await sendEmail(
                    email,
                    'Verify Your Email',
                    `<div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2>Verify Your Email</h2>
                        <p>Please click the button below to verify your email address:</p>
                        <a href="${verifyUrl}" 
                            style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; 
                                    text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Verify Email
                        </a>
                    </div>`
                );

                return res.status(403).json({
                    success: false,
                    message: "Please verify your email before logging in. Verify link sent"
                });
            }

            return res.status(409).json({
                success: false,
                message: "User with this email already exists."
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const userId = generate8DigitUserId(userName);

        const emailVerifyToken = createToken(email);

        const newUser = new User({
            userId,
            name: userName,
            email,
            password: hashPassword,
            role: 1,
            provider: "user",
            emailVerifyToken,
            isVerified: false
        });

        await newUser.save();

        // Send verification email
        const verifyUrl = `${process.env.CLIENT_URL}/api/users/verify-email?token=${emailVerifyToken}`;
        await sendEmail(
            email,
            'Verify Your Email',
            `<div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Verify Your Email</h2>
                <p>Please click the button below to verify your email address:</p>
                <a href="${verifyUrl}" 
                    style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; 
                            text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Verify Email
                </a>
            </div>`
        );

        res.status(201).json({
            success: true,
            message: "User created successfully. Please check your email to verify your account."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to register user",
            error: error.message
        });
    }
};

//menualy User Login
const login = async (req, res) => {

    const { userName, password } = req.body;
    try {

        if (!userName || !password) {
            res.status(400).json({
                success: false,
                message: "userName And Password are required"
            });
        }

        const existUser = await User.findOne({ name: userName });

        if (!existUser) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const comparePass = await bcrypt.compare(password, existUser.password)

        if (!comparePass) {
            res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = createToken(existUser);

        res.cookie('token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // only over HTTPS in prod
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "User login successfully",
            userToken: token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User login failed",
            error: error.message
        });
    }
}

//google login
const googleLogin = async (req, res) => {

    const { token } = req.body

    try {

        const ticket = googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = await ticket.getPayload();
        const { email, name, picture, sub } = payload;

        let newUser = await User.findOne({ email });

        if (!newUser) {

            const userId = generate8DigitUserId(name);

            newUser = await User.create({
                userId,
                email,
                name,
                profile_Pic: picture,
                provider: "google",
                provider_account_id: sub,
                role: 1
            });
        }

        const token = createToken(newUser);

        res.status(200).json({
            success: true,
            message: "User login successfully",
            userToken: token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User login failed",
            error: error.message
        });
    }
}

//facebook login
const facebookLogin = async (req, res) => {

    const { accessToken, userId } = req.body;

    try {

        const url = `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${accessToken}`;

        const response = await axios.get(url);

        const { email, name, id, picture } = response.data;

        let newUser = await User.findOne({ email });

        if (!newUser) {

            const userId = generate8DigitUserId(name);

            newUser = await User.create({
                userId,
                email,
                name,
                profile_Pic: picture,
                provider: "facebook",
                provider_account_id: id,
                role: 1
            });
        }

        const token = await createToken(newUser);

        res.status(200).json({
            success: true,
            message: "User login successfully",
            userToken: token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User login failed",
            error: error.message
        });
    }
}

//get user by id
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -_id -provider -provider_account_id -updatedAt');
        res.status(200).json({
            success: true,
            data: user
        });
    } catch {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user',
            error: error.message
        });
    }
};

//update profile data 
const updateUserProfile = async (req, res) => {
    try {

        if (req.body.userName) {
            req.body.name = req.body.userName
        }

        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password -_id -provider -provider_account_id -updatedAt');
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: 'Profile updated',
            user
        });
    } catch {
        res.status(500).json({
            success: false,
            message: 'Update failed',
            error: error.message
        });
    }
};

// Change password
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(400).json({ message: 'Old password incorrect' });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({ message: 'Password changed' });
    } catch {
        res.status(500).json({ message: 'Password change failed' });
    }
};

// Forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = generateToken(user._id, user.role, '15m');
        // const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        try {
            await sendEmail(user.email, 'Password Reset', `Token: ${resetToken}`);
        } catch (err) {
            return res.status(500).json({ message: 'Email send failed', error: err.message });
        }

        res.status(200).json({ success: true, message: 'Reset link sent' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Reset link failed', error: error.message });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password reset successful'
        });
    } catch {
        res.status(400).json({
            success: false,
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};

// logoute
const logoutUser = async (req, res) => {

    res.clearCookie('token');

    res.status(200).json({
        success: true,
        message: 'Logged out (client should delete token)'
    });
};

//verify mail
const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.id;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "User already verified" });
        }

        user.isVerified = true;
        user.emailVerifyToken = null;
        await user.save();

        res.status(200).json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid or expired token", error: error.message });
    }
};

module.exports = {
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
}