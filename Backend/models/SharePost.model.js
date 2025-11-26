import mongoose from "mongoose";

const SharePostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subcategory: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    images: [
      {
        type: String,
      }
    ],

    // If anyone wants to learn the shared skill
    interestedUsers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: { type: String },
        createdAt: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
);

export const SharePost = mongoose.model("SharePost", SharePostSchema);
