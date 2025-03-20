const bcrypt = require("bcrypt");
const AuthUser = require("../models/authUser");
const { setUser } = require("../service/auth");

async function handleRegisterUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "Error", message: "Email and password are required" });
        }

        const existingUser = await AuthUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "Error", message: "Email already registered" });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        await AuthUser.create({
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration Error:", err);
        return res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
}

async function handleLoginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "Error", message: "Email and password are required" });
        }

        const user = await AuthUser.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: "Error", message: "Email not registered" });
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: "Error", message: "Incorrect Password" });
        }

        const token = setUser(user);

        // Set JWT token in an HTTP-only cookie
        res.cookie("uid", token, {
            httpOnly: true, // Prevents JavaScript access (XSS protection)
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "Strict",
        });

        return res.status(200).json({ message: "User Logged In", token });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
}

module.exports = {
    handleRegisterUser,
    handleLoginUser,
};
