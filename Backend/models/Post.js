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
        category: { type: String, required: true },
        subcategory: { type: String, required: true },
        expertLevel: {
          type: String,
          enum: ["Beginner", "Intermediate", "Expert"],
          default: "Beginner",
        },
      },
    ],

    // SKILLS INTERESTED
    skillsInterested: [
      {
        category: { type: String, required: true },
        subcategory: { type: String, required: true },
      },
    ],

    // LESSONS (new)
    addLessons: [
      { type: String }
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