const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    email: { 
        type: String,
        unique: true, 
        required: [true, "Email is required"]
    },
    password: { 
        type: String, 
        required: [true, "Password is required"]
    },
});

module.exports = mongoose.model("AuthUser", AuthSchema);
