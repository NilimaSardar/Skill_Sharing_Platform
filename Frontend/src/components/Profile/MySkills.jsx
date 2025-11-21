import React, { useState, useEffect } from "react";

const MySkills = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

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

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/user/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          category: formData.category,
          subcategory: formData.subcategory, // now sending string name
          expertLevel: formData.level,
          yearsOfExperience: parseInt(formData.experience) || 0
        })
      });

      const data = await res.json();
      if (res.ok) {
        setShowForm(false);
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
          <div key={skill._id} className="flex gap-4 p-2 border border-border bg-white rounded-lg">
            <div className="w-[130px] h-[70px]">
              <img src="../../skillCover/graphic.svg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="text-[14px]">
              <h4 className="text-[15px] font-medium">{skill.category}</h4>
              <p className="text-[#737373] mb-1">{skill.subcategory}</p>
              <p className="bg-yellow-100 text-yellow-500 inline p-1 rounded-lg">{skill.expertLevel}</p>
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