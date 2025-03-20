const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET is not defined in the .env file");
}

// Generate JWT token for user
function setUser(user) {
    return jwt.sign(
        {   id: user._id,
            email: user.email },
        secret,
        { expiresIn: "24h" }
    );
}

// Verify JWT token
function getUser(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null; // Return null if token is invalid or expired
    }
}

module.exports = {
    setUser,
    getUser,
};
