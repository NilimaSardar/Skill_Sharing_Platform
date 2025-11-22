import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    // Generate token
    const token = jwt.sign(
        {userId: admin._id, email: admin.email, role: admin.role },
        process.env.JWT_SECRET_KEY,
        {expiresIn: "7d"}
    );

    res.status(200).json({
      message: "Admin logged in",
      token,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin dashboard example protected endpoint
export const getAdminDashboard = async (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
};