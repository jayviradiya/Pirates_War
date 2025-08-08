const requireRole = (role) => {
    return(req, res, next) => {
        if(req.user && req.user.role === role) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                massage: "Access Denied"
            })
        }
    };
};

module.exports = {
    requireRole
}