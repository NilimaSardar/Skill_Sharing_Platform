import User from "../models/User.model.js";
import fs from "fs";
import path from "path";

// Home route
export const home = async (req, res) => {
  res.status(200).send({ message: "Welcome from controllers" });
};

// User register
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, email, and password are required",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "Email already exists" });

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
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist)
      return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {

      // Mark user as active
      await User.findByIdAndUpdate(userExist._id, {
        isActive: true,
        lastLogin: new Date(),
      });

      return res.status(200).json({
        message: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get current user data
export const user = async (req, res) => {
  try {
    const userData = req.user; // set by auth middleware
    return res.status(200).json({ userData });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { fullName, email, phone, age, location, skills, removePhoto } = req.body;

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (age) user.age = age;
    if (location) user.location = location;
    if (skills) user.skills = JSON.parse(skills);

    // Handle profile photo upload
    if (req.file) {
      if (user.profilePhoto) {
        const oldPath = path.join("uploads", user.profilePhoto);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      user.profilePhoto = req.file.filename;
    }

    // Remove profile photo if requested
    if (removePhoto && user.profilePhoto) {
      const oldPath = path.join("uploads", user.profilePhoto);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      user.profilePhoto = null;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: err.message });
  }
};

// User Logout
export const logout = async (req, res) => {
  try {
    const userId = req.userID; // from auth middleware

    await User.findByIdAndUpdate(userId, {
      isActive: false,
      lastLogin: new Date(),
    });

    return res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const getActiveUsers = async (req, res) => {
//   try {
//     const currentUserId = req.user._id;

//     const proposals = await Proposal.find({
//       status: "accepted",
//       $or: [
//         { senderId: currentUserId },
//         { receiverId: currentUserId }
//       ]
//     }).populate("senderId", "fullName profilePhoto _id")
//       .populate("receiverId", "fullName profilePhoto _id");

//     const usersSet = new Map();

//     proposals.forEach(p => {
//       const otherUser = p.senderId._id.toString() === currentUserId.toString()
//         ? p.receiverId
//         : p.senderId;
//       usersSet.set(otherUser._id.toString(), otherUser);
//     });

//     const users = Array.from(usersSet.values());

//     res.json({ users });
//   } catch (error) {
//     console.error("Active users error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// Get highly rated users
export const getHighlyRatedUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .sort({ averageRating: -1 })
      .limit(50); 

    // Map only required fields
    const result = users.map(u => ({
      _id: u._id,
      fullName: u.fullName,
      age: u.age,
      location: u.location,
      expertInfo: u.skills.length ? u.skills[0].subcategory : "", 
      interestedInfo: u.skills.length ? u.skills[0].category : "", 
      rating: u.averageRating,
      profilePhoto: u.profilePhoto,
    }));

    res.status(200).json({ users: result });
  } catch (err) {
    console.error("Get highly rated users error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const changePassword = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; 
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new passwords are required" });
    }

    if (req.params.id !== loggedInUserId.toString()) {
      return res.status(403).json({ message: "Unauthorized to change this password" });
    }

    const user = await User.findById(loggedInUserId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(401).json({ message: "Current password is incorrect" });

    user.password = newPassword; 
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

