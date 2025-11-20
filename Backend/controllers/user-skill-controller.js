import User from "../models/User.js";
import SkillCategory from "../models/SkillCategory.js";

// Add a new skill to user
export const addSkill = async (req, res) => {
  try {
    const { category, subcategory, expertLevel, yearsOfExperience } = req.body;

    if (!category || !subcategory || !expertLevel) {
      return res.status(400).json({ message: "Category, subcategory & expert level are required" });
    }

    // Validate category and subcategory
    const categoryData = await SkillCategory.findById(category);
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    const validSubIds = categoryData.subcategories.map(s => s._id.toString());
    if (!validSubIds.includes(subcategory)) {
      return res.status(400).json({ message: "Invalid subcategory for selected category" });
    }

    // Add skill to user
    const user = await User.findById(req.user._id);
    user.skills.push({
      category,
      subcategory,
      expertLevel,
      yearsOfExperience: yearsOfExperience || 0
    });

    await user.save();

    res.status(201).json({
      message: "Skill added successfully",
      skills: user.skills
    });
  } catch (error) {
    console.error("Add Skill Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get all skills of logged-in user
export const getSkills = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("skills.category", "name")
      .populate("skills.subcategory", "name");

    res.status(200).json({ skills: user.skills });
  } catch (error) {
    console.error("Get Skills Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Update a skill
export const updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { expertLevel, yearsOfExperience } = req.body;

    const user = await User.findById(req.user._id);

    const skill = user.skills.id(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (expertLevel) skill.expertLevel = expertLevel;
    if (yearsOfExperience !== undefined) skill.yearsOfExperience = yearsOfExperience;

    await user.save();

    res.status(200).json({
      message: "Skill updated successfully",
      skill
    });
  } catch (error) {
    console.error("Update Skill Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const user = await User.findById(req.user._id);

    const skill = user.skills.id(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.deleteOne(); // remove the skill
    await user.save();

    res.status(200).json({ message: "Skill removed successfully" });
  } catch (error) {
    console.error("Delete Skill Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
