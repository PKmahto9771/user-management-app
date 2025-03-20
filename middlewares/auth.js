const { getUser } = require("../service/auth");

function isAuthenticated(req, res, next) {
    const token = req.cookies?.uid;

    if (!token) {
        return res.status(401).json({ status: "Error", message: "Access Denied! No token provided." });
    }

    try {
        const decoded = getUser(token)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ status: "Error", message: "Invalid or expired token" });
    }
}

module.exports = isAuthenticated;
