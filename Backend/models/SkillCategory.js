import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }
});

const skillCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },

    subcategories: [subcategorySchema],

    isActive: { type: Boolean, default: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("SkillCategory", skillCategorySchema);
