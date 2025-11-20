import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["share", "exchange"],
      required: true
    },

    // Parent category (e.g. Programming)
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillCategory",
      required: true
    },

    // Subcategories from chosen category
    skillsOffered: [
      {
        type: mongoose.Schema.Types.ObjectId, // refers to subcategory _id
        required: true
      }
    ],

    // All subcategories from all categories
    skillsInterested: [
      {
        type: mongoose.Schema.Types.ObjectId // refers to subcategory _id
      }
    ],

    duration: { type: String },
    fees: { type: Number, default: 0 },

    title: { type: String, required: true },
    description: { type: String, required: true },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },    
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);