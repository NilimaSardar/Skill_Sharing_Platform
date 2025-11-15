const User = require("../models/User");

// Home route
const home = async (req, res) => {
  res.status(200).send({ message: "Welcome from controllers" });
};

// User register
const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Full name, email, and password are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: "Email already exists" });

    const newUser = await User.create({ fullName, email, password });

    return res.status(201).json({
      message: "User registered successfully",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get current user data
const user = async (req, res) => {
  try {
    const userData = req.user; // set by auth middleware
    return res.status(200).json({ userData });
  } catch (error) {
    console.error(`Error fetching user: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, register, login, user };