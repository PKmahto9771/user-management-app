const User = require('../models/user')

// ● Create User (POST /api/users) → Add a new user
// ● Get All Users (GET /api/users) → Fetch all users
// ● Get User by ID (GET /api/users/:id) → Fetch a single user
// ● Update User (PUT /api/users/:id) → Update user details

// ● Delete User (DELETE /api/users/:id) → Remove a user

async function handleCreateUser(req, res) {
    try{
        const {name, email, age} = await req.body

        if (!name || !email) {
            return res.status(400).json({ status: "Error", message: "Name and Email are required" });
        }

        const user = await User.create({
            name,
            email,
            age,
        })

        return res.status(201).json({ message: "User created successfully", id: user._id });
    }
    catch (err) {
        return res.status(400).json({ status: "Error", message: err.message });
    }
}

async function handleGetUsers(req, res) {
    try{
        const users = await User.find({})
        return res.status(200).json(users)
    }
    catch (err) {
        return res.status(400).json({ status: "Error", message: err.message });
    }
}

async function handleGetUser(req, res) {
    try{
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({Error: 'Invalid Id'})
        }

        return res.status(200).json(user)
    }
    catch (err) {
        return res.status(400).json({ status: "Error", message: err.message });
    }
}

async function handleUpdateUser(req, res) {
    try{
        const user = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        )

        if(!user){
            return res.status(404).json({Error: 'Invalid Id'})
        }

        return res.status(200).json({message: 'user upadated'})
    }
    catch (err) {
        return res.status(400).json({ status: "Error", message: err.message });
    }
}

async function handleDeleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).json({ status: "Error", message: "Invalid ID" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      return res.status(400).json({ status: "Error", message: err.message });
    }
  }
  

module.exports = {
    handleCreateUser,
    handleGetUsers,
    handleGetUser,
    handleUpdateUser,
    handleDeleteUser,
}
