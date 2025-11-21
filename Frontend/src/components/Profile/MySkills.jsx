import React, { useState, useEffect } from "react";

const MySkills = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [editingSkillId, setEditingSkillId] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    experience: "",
    level: ""
  });

  const token = localStorage.getItem("token");

  // Load all skill categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/skills", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.categories) {
          setCategories(result.categories);
        }
      } catch (error) {
        console.log("Error loading categories:", error);
      }
    };
    loadCategories();
  }, [token]);

  // Load user's saved skills
  const loadUserSkills = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/skills", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.skills) setUserSkills(result.skills);
    } catch (error) {
      console.log("Error loading user skills:", error);
    }
  };

  useEffect(() => {
    loadUserSkills();
  }, []);

  // Update subcategories when category changes
  useEffect(() => {
    const selected = categories.find(cat => cat.name === formData.category);
    setSubcategories(selected?.subcategories.map(sub => sub.name) || []);
    setFormData(prev => ({ ...prev, subcategory: "" }));
  }, [formData.category, categories]);

 // Delete Skill
  const handleDelete = async (skillId) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/user/skills/${skillId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        alert("Skill deleted successfully");
        setUserSkills(userSkills.filter(skill => skill._id !== skillId));
      } else {
        alert(data.message || "Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // Edit Skill
  const handleEdit = (skill) => {
    setFormData({
      category: skill.category,
      subcategory: skill.subcategory,
      experience: skill.yearsOfExperience,
      level: skill.expertLevel
    });
    setShowForm(true);
    setEditingSkillId(skill._id); // store the id to know we are editing
  };

  // Handle submit for edit/add
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      category: formData.category,
      subcategory: formData.subcategory,
      expertLevel: formData.level,
      yearsOfExperience: parseInt(formData.experience) || 0
    };

    try {
      let url = "http://localhost:8000/api/user/skills";
      let method = "POST";

      if (editingSkillId) {
        url = `http://localhost:8000/api/user/skills/${editingSkillId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setShowForm(false);
        setEditingSkillId(null);
        loadUserSkills();
        setFormData({ category: "", subcategory: "", experience: "", level: "" });
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Network error");
    }
  };
  return (
    <div className="flex flex-col gap-3">

      {/* USER SKILLS LIST */}
      <div className="max-h-[260px] overflow-y-auto flex flex-col gap-3 pr-1 hide-scrollbar">
        {userSkills.length === 0 && (
          <p className="text-center text-sm text-gray-500">No skills added yet</p>
        )}

        {userSkills.map(skill => (
          <div key={skill._id} className="flex justify-between items-start gap-4 p-2 border border-border bg-white rounded-lg">
            <div className="text-[14px]">
              <h4 className="text-[15px] font-medium">{skill.category}</h4>
              <p className="text-[#737373] mb-1">{skill.subcategory}</p>
              {skill.expertLevel && (
                <p
                  className={`inline p-1 rounded-lg ${
                    skill.expertLevel === "Beginner"
                      ? "bg-green-100 text-green-500"
                      : skill.expertLevel === "Intermediate"
                      ? "bg-yellow-100 text-yellow-500"
                      : skill.expertLevel === "Expert"
                      ? "bg-red-100 text-red-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {skill.expertLevel}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center" onClick={() => handleDelete(skill._id)}>
                <img src="../../images/delete.svg" alt="" />
              </button>
              <button className="flex items-center" onClick={() => handleEdit(skill)}>
                <img src="../../images/tabler_edit.svg" alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD SKILL BUTTON */}
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="bg-primary text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full mt-4"
      >
        Add Skills +
      </button>

      {/* ADD SKILL MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-3">Add Skill</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <select
                className="border p-2 rounded"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>

              <select
                className="border p-2 rounded"
                value={formData.subcategory}
                onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                required
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Years of experience"
                className="border p-2 rounded"
                value={formData.experience}
                onChange={e => setFormData({ ...formData, experience: e.target.value })}
                required
              />

              <select
                className="border p-2 rounded"
                value={formData.level}
                onChange={e => setFormData({ ...formData, level: e.target.value })}
                required
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>

              <div className="flex gap-2">
                <button type="submit" className="bg-primary text-white w-full p-2 rounded">Save Skill</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-black w-full p-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySkills;