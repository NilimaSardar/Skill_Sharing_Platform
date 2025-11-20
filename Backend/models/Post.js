import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["share", "exchange"],
      required: true,
    },

    // SKILLS OFFERED
    skillsOffered: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SkillCategory",
          required: true,
        },
        subcategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SkillSubcategory",
          required: true,
        },
      },
    ],

    // SKILLS INTERESTED
    skillsInterested: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SkillCategory",
        },
        subcategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SkillSubcategory",
        },
      },
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