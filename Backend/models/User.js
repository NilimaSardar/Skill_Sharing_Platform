import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Each USER's personal skill structure
const userSkillSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkillCategory",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  expertLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Expert"],
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    default: 0,
  },
});

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true }, // combined name

    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    phone: { type: String },
    role: { type: String, default: "user" }, // user / admin

    profilePhoto: { type: String },

    // EACH USER HAS SEPARATE SKILL SET
    skills: [userSkillSchema],

    // Ratings
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate JWT
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      userId: this._id.toString(),
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );
};

export default mongoose.model("User", userSchema);