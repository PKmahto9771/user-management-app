const mongoose = require('mongoose')

// ■ name (String, required)
// ■ email (String, unique, required)
// ■ age (Number, optional)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    age: {
        type: Number,
        min: [0, "Age must be a positive number"]
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User