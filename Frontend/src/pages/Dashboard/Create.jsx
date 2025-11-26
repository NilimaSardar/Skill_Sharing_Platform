import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const Create = () => {
  const { API } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;  
  const editingPost = state?.post || null;
  const isEditing = Boolean(editingPost);

  // User Skills for Skill You Offer
  const [userSkills, setUserSkills] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // All Categories for Skill You Want
  const [allCategories, setAllCategories] = useState([]);
  const [wantedSubcategories, setWantedSubcategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    postType: "exchange",
    skillOffered: { category: "", subcategory: "", expertLevel: "" },
    skillWanted: { category: "", subcategory: "" },
    duration: "",
    fees: "",
    addLessons: [],
    lessonInput: "",
    startDate: "",
  });   

  // Fetch user's skills for Skill You Offer
  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const res = await fetch(`${API}/api/user/skills`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (data.skills) setUserSkills(data.skills);
      } catch (err) {
        console.error("Error fetching user skills:", err);
      }
    };
    fetchUserSkills();
  }, [API]);

  // Fetch all categories for Skill You Want
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await fetch(`${API}/api/skills`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (data.categories) setAllCategories(data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchAllCategories();
  }, [API]);

  // Pre-fill if editing
  useEffect(() => {
    if (isEditing && editingPost) {
      setFormData({
        title: editingPost.title || "",
        description: editingPost.description || "",
        postType: editingPost.type || "exchange",
        skillOffered: {
          category: editingPost.skillsOffered?.[0]?.category || "",
          subcategory: editingPost.skillsOffered?.[0]?.subcategory || "",
          expertLevel: editingPost.skillsOffered?.[0]?.expertLevel || "",
        },
        skillWanted: {
          category: editingPost.skillsInterested?.[0]?.category || "",
          subcategory: editingPost.skillsInterested?.[0]?.subcategory || "",
        },
        duration: editingPost.duration || "",
        fees: editingPost.fees || "",
        addLessons: editingPost.addLessons || [],
        lessonInput: "",
      });
      

      // Pre-fill subcategories for offered
      if (editingPost.skillsOffered?.[0]?.category) {
        const offeredSkill = editingPost.skillsOffered[0];
        setSubcategories(offeredSkill.subcategory ? [offeredSkill.subcategory] : []);
      }

      // Pre-fill subcategories for wanted
      if (editingPost.skillsInterested?.[0]?.category) {
        const wantedCat = editingPost.skillsInterested?.[0]?.category;
        const selectedCat = allCategories.find(c => c.name === wantedCat);
        setWantedSubcategories(selectedCat ? selectedCat.subcategories : []);
      }
    }
  }, [isEditing, editingPost, allCategories]);

  // Handle Input Changes
  const handleInput = (e) => {
    const { name, value } = e.target;

    // Skill You Offer
    if (name === "skillOfferedCategory") {
      const selectedSkill = userSkills.find(s => s.category === value && s.subcategory === formData.skillOffered.subcategory);
      setSubcategories(userSkills.filter(s => s.category === value).map(s => s.subcategory));
      
      setFormData({
        ...formData,
        skillOffered: { category: value, subcategory: "", expertLevel: "" }
      });
      return;
    }
    if (name === "skillOfferedSubcategory") {
      // Find the skill object with matching category + subcategory
      const skill = userSkills.find(
        s => s.category === formData.skillOffered.category && s.subcategory === value
      );

      setFormData({
        ...formData,
        skillOffered: {
          ...formData.skillOffered,
          subcategory: value,
          expertLevel: skill ? skill.expertLevel : ""
        }
      });
      return;
    }

    // Skill You Want
    if (name === "skillWantedCategory") {
      const selectedCat = allCategories.find(c => c._id === value);
      setWantedSubcategories(selectedCat ? selectedCat.subcategories : []);
      setFormData({ ...formData, skillWanted: { category: value, subcategory: "" } });
      return;
    }
    if (name === "skillWantedSubcategory") {
      setFormData({
        ...formData,
        skillWanted: { ...formData.skillWanted, subcategory: value }
      });
      return;
    }

    // Other inputs
    setFormData({ ...formData, [name]: value });
  };

  // Lesson input handlers
  const handleLessonInput = (e) => setFormData({ ...formData, lessonInput: e.target.value });
  const addLesson = () => {
    if (!formData.lessonInput.trim()) return;
    setFormData({
      ...formData,
      addLessons: [...formData.addLessons, formData.lessonInput.trim()],
      lessonInput: "",
    });
  };
  const removeLesson = (index) => {
    const updated = formData.addLessons.filter((_, i) => i !== index);
    setFormData({ ...formData, addLessons: updated });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare Skills Offered
    const offeredSkills = formData.skillOffered.category && formData.skillOffered.subcategory
      ? [{
          category: formData.skillOffered.category,
          subcategory: formData.skillOffered.subcategory,
          expertLevel: formData.skillOffered.expertLevel || "",
        }]
      : [];
  
    // Prepare Skills Wanted
    const interestedSkills = formData.postType === "exchange" &&
                             formData.skillWanted.category && formData.skillWanted.subcategory
      ? [{
          category: formData.skillWanted.category,
          subcategory: formData.skillWanted.subcategory,
        }]
      : [];
  
    // Prepare Lessons (ensure it's always an array)
    const lessons = formData.postType === "share"
      ? formData.addLessons.filter(l => l.trim() !== "")
      : [];
  
    const payload = {
      title: formData.title,
      description: formData.description,
      type: formData.postType,
      skillsOffered: offeredSkills,
      skillsInterested: interestedSkills,
      duration: formData.duration,
      fees: formData.fees,
      addLessons: formData.postType === "share" ? formData.addLessons : [],
      startDate: formData.postType === "share" ? new Date(formData.startDate) : null,
    };
  
    try {
      const url = isEditing
        ? `${API}/api/posts/update/${editingPost._id}`
        : `${API}/api/posts`;
      const method = isEditing ? "PATCH" : "POST";
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success(isEditing ? "Post updated successfully!" : "Post created!");
        navigate("/dashboard/profile");
      } else {
        toast.error(data.message || "Failed to save post");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Internal Server Error");
    }
  };   

  return (
    <div className='mb-20'>
      <div className='flex items-center justify-start py-5 bg-primary text-white'>
        <h3 className=' w-full text-center text-[18px]'>
          {isEditing ? "Edit Post" : "Create Post"}
        </h3>
      </div>

      <form className='flex flex-col py-3 mx-[28px]' onSubmit={handleSubmit}>

        {/* Title & Description */}
        <div className='flex flex-col gap-2 mt-2'>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInput}
            className='border border-border px-4 py-2 w-full rounded-lg placeholder:text-[14px]'
            placeholder='Type a descriptive title...'
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInput}
            className='border border-border px-4 py-2 h-25 w-full rounded-lg placeholder:text-[14px]'
            placeholder='Enter the body text here...'
            required
          />
        </div>

        {/* Post Type */}
        <div className='flex flex-col mt-2'>
          <p className='text-text text-[14px]'>Choose Post Type (Required)</p>
          <label className='flex items-center gap-2'>
            <input
              type="radio"
              name="postType"
              value="exchange"
              checked={formData.postType === "exchange"}
              onChange={handleInput}
              className='h-3'
            />
            <span className='text-[13px] text-[#737373]'>Exchange</span>
          </label>
          <label className='flex items-center gap-2'>
            <input
              type="radio"
              name="postType"
              value="share"
              checked={formData.postType === "share"}
              onChange={handleInput}
              className='h-3'
            />
            <span className='text-[13px] text-[#737373]'>Share</span>
          </label>
        </div>

        {/* Skill You Offer */}
        <fieldset className='border border-border rounded-lg p-3 mt-3'>
          <legend className="text-text text-[15px] font-[550]">Skill You Offer</legend>
          <div className='flex w-full items-center gap-2'>
            <div>
              <p className="text-text text-[14px]">Category</p>
              <select
                name="skillOfferedCategory"
                value={formData.skillOffered.category || ""}
                onChange={handleInput}
                className="w-full border border-border px-3 py-2 mt-2 rounded-lg text-[12px]"
              >
                <option value="">Select Category</option>
                {userSkills.map((skill, idx) => (
                  <option key={idx} value={skill.category}>{skill.category}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-text text-[14px] ">Subcategory</p>
              <select
                name="skillOfferedSubcategory"
                value={formData.skillOffered.subcategory}
                onChange={handleInput}
                className="w-full border border-border px-3 py-2 mt-2 rounded-lg text-[12px]"
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Proficiency Level */}
        <div className="w-1/2">
        <div>
          <p className="text-text text-[14px]">Proficiency Level</p>
          <input
            type="text"
            value={formData.skillOffered.expertLevel}
            readOnly
            className="w-full border border-border px-3 py-2 mt-2 rounded-lg text-[12px] bg-gray-100"
          />
        </div>
        </div>

        {/* Skill You Want */}
        {formData.postType === "exchange" && (
          <fieldset className='border border-border rounded-lg p-3 mt-3'>
            <legend className="text-text text-[15px] font-[550]">Skill You Want</legend>
            <div className='flex w-full items-center gap-2'>
              <div>
                <p className="text-text text-[14px] ">Category</p>
                <select
                  name="skillWantedCategory"
                  value={formData.skillWanted.category}
                  onChange={handleInput}
                  className="w-full border border-border px-3 py-2 mt-2 rounded-lg text-[12px]"
                >
                  <option value="">Select Category</option>
                  {allCategories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-text text-[14px] ">Subcategory</p>
                <select
                  name="skillWantedSubcategory"
                  value={formData.skillWanted.subcategory}
                  onChange={handleInput}
                  className="w-full border border-border px-3 py-2 mt-2 rounded-lg text-[12px]"
                >
                  <option value="">Select Subcategory</option>
                  {wantedSubcategories.map(sub => (
                    <option key={sub._id} value={sub._name}>{sub.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
        )}

        {/* Share Lessons */}
        {formData.postType === "share" && formData.addLessons && (
          <div className="mt-3 w-full transition-all duration-300">
            <p className="text-text text-[14px] ">Add Lessons</p>
            <div className="relative flex items-center mt-2">
              <input
                type="text"
                value={formData.lessonInput}
                onChange={handleLessonInput}
                className="w-full border border-border bg-white px-3 py-2 rounded-lg text-[12px]"
                placeholder="Type lesson name..."
              />
              <img
                src="../../create/add.svg"
                onClick={addLesson}
                className="w-6 h-6 absolute right-2 cursor-pointer opacity-80"
                alt="add"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.addLessons.map((lesson, index) => (
                <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[12px] flex items-center gap-1">
                  {lesson}
                  <button type="button" onClick={() => removeLesson(index)} className="text-red-500 text-xs ml-1">✕</button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Duration & Fees */}
        {formData.postType === "share" && (
          <div>
            <div className="flex flex-col items-start mt-3 w-full">
              <p className="text-text text-[14px]">Start Date</p>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInput}
                className="w-full border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px]"
                required
              />
            </div>
            
            <div className="flex items-start gap-2 mt-3 w-full">
              <div className="relative w-1/2">
                <p className="text-text text-[14px] ">Duration</p>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInput}
                  placeholder="Eg: 15 days"
                  className="w-full border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px] text-[#737373]"
                />
              </div>

              <div className="w-1/2">
                <p className="text-text text-[14px] ">Fees</p>
                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInput}
                  className='w-full border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px]'
                />
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className='flex flex-col gap-2 mt-4'>
          <button type="submit" className='bg-primary text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full'>
            {isEditing ? "Update Post" : "Post"}
          </button>
          <Link to="/dashboard/home" className='border border-border text-center text-[#737373] text-[12px] font-medium px-2 py-2 rounded-lg w-full'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Create;