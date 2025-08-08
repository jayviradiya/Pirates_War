const jwt = require('jsonwebtoken');
const User = require('../models/user-m');

const authMiddleware = async (req, res, next) => {

    const token = req.headers.authorization;

    if(!token) {
        res.status(401).json({
            success: false,
            message: "Token required"
        });
    }

    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET);        

        const userdata = await User.findById(decode.id).select('-password');        

        if(!userdata){
            res.status(401).json({
                success: false,
                message: "userdata not found"
            });
        }

        req.user = userdata
        next();
        
    } catch (error) {
        res.status(403).json({
            success: false,
            message: "Invalid or Expire token"
        })
    }
}

module.exports = {
    authMiddleware
}