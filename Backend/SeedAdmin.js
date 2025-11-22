import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Delete old admin
    await User.deleteMany({ role: "admin" });

    // Create admin (PLAIN PASSWORD)
    const admin = new User({
      fullName: "Super Admin",
      email: "admin@example.com",
      password: "Admin12345",   // ❗don't hash here
      role: "admin"
    });

    await admin.save();

    console.log("Admin created with password: Admin12345");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();