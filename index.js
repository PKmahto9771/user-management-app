const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/authUser");
const connectDB = require("./connection");
const cookieParser = require("cookie-parser");
const isAuthenticated = require("./middlewares/auth");
if (process.env.NODE_ENV !== "production") { 
    require("dotenv").config(); 
}

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Database Connection
connectDB(MONGO_URI);

// Middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Test Route
app.get("/api/ping", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

// Routes
app.use("/api/users", isAuthenticated, userRoute);
app.use("/api/auth", authRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
