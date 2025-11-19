import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const Create = () => {
  const { API } = useAuth();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    postType: "exchange",
    category: "",
    skillOffered: "",
    skillWanted: "",
    duration: "",
    fees: "",
    addLessons: [],
    lessonInput: "",
  });

  // Fetch categories and subcategories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API}/api/skills`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const data = await res.json();
        setCategories(data.categories || []);

        // Flatten all subcategories for Skill Wanted (exchange)
        const allSubs = data.categories ? data.categories.flatMap(c => c.subcategories) : [];
        setAllSubcategories(allSubs);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, [API]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      // Update skillOffered options when category changes
      const selectedCategory = categories.find(c => c._id === value);
      setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
      setFormData({
        ...formData,
        category: value,
        skillOffered: "", // reset selected skillOffered
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleLessonInput = (e) => {
    setFormData({ ...formData, lessonInput: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      return toast.error("Title & description are required");
    }

    if (formData.postType === "share") {
      if (!formData.skillOffered || !formData.duration || !formData.fees) {
        return toast.error("For share: skill offered, duration & fees are required");
      }
    }

    if (formData.postType === "exchange") {
      if (!formData.skillOffered || !formData.skillWanted) {
        return toast.error("For exchange: skill offered & skill wanted are required");
      }
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      type: formData.postType,
      category: formData.category,
      skillsOffered: formData.skillOffered ? [formData.skillOffered] : [],
      skillsInterested:
        formData.postType === "exchange" && formData.skillWanted
          ? [formData.skillWanted]
          : [],
      duration: formData.duration,
      fees: formData.fees,
      addLessons: formData.postType === "share" ? formData.addLessons : [],
    };

    try {
      const response = await fetch(`${API}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Post created successfully");
        setFormData({
          title: "",
          description: "",
          postType: "exchange",
          category: "",
          skillOffered: "",
          skillWanted: "",
          duration: "",
          fees: "",
          addLessons: [],
          lessonInput: "",
        });
      } else {
        toast.error(data.message || "Failed to create post");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className='mb-20'>
      <div className='flex items-center justify-start py-5 bg-primary text-white'>
        <h3 className='font-serif w-full text-center text-[18px]'>Create Post</h3>
      </div>

      <form className='flex flex-col py-3 mx-[28px]' onSubmit={handleSubmit}>

        {/* Profile */}
        <div className='flex items-center gap-2'>
          <div className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
            <img
              src="../../profile/Nilima.jpeg"
              alt="user"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className='font-serif text-[16px]'>Shikshya Nepal</h3>
            <p className='font-serif text-[13px] text-[#7B7676]'>28, Biratnagar</p>
          </div>
        </div>

        {/* Title + Description */}
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

        {/* Category */}
        <div className="mt-3 w-full">
          <p className="text-text text-[14px] font-serif">Category</p>
          <select
            name="category"
            value={formData.category}
            onChange={handleInput}
            className="w-full border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px] text-[#737373]"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Skill Offered / Skill Wanted */}
        <div className="flex items-start gap-2 mt-3 w-full">
          <div className={`relative transition-all duration-300 ${formData.postType === "share" ? "w-full" : "w-1/2"}`}>
            <p className="text-text text-[14px] font-serif">Skill You Offer</p>
            <select
              name="skillOffered"
              value={formData.skillOffered}
              onChange={handleInput}
              className="w-full border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px] text-[#737373]"
            >
              <option value="">Select Skill Offered</option>
              {subcategories.map(sub => (
                <option key={sub._id} value={sub._id}>{sub.name}</option>
              ))}
            </select>
          </div>

          {formData.postType === "exchange" && (
            <div className="relative w-1/2">
              <p className="text-text text-[14px] font-serif">Skill You Want</p>
              <select
                name="skillWanted"
                value={formData.skillWanted}
                onChange={handleInput}
                className="w-full border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px] text-[#737373]"
              >
                <option value="">Select Skill Wanted</option>
                {allSubcategories.map(sub => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Add Lessons — ONLY FOR SHARE */}
        {formData.postType === "share" && (
          <div className="mt-3 w-full transition-all duration-300">

            <p className="text-text text-[14px] font-serif">Add Lessons</p>

            {/* Input + Add button */}
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

            {/* Added lessons list */}
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.addLessons.map((lesson, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[12px] flex items-center gap-1"
                >
                  {lesson}
                  <button
                    onClick={() => removeLesson(index)}
                    className="text-red-500 text-xs ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

          </div>
        )}

        {/* Duration + Fees — ONLY FOR SHARE */}
        {formData.postType === "share" && (
          <div className="flex items-start gap-2 mt-3 w-full">

            <div className="relative w-1/2">
              <p className="text-text text-[14px] font-serif">Duration</p>

              <select
                name="duration"
                value={formData.duration}
                onChange={handleInput}
                className="w-full appearance-none border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px] text-[#737373]"
              >
                <option value="">Eg: 15 days</option>
                <option value="20days">20 Days</option>
                <option value="30days">30 Days</option>
                <option value="2month">2 Month</option>
                <option value="3month">3 Month</option>
              </select>

              <img
                src="../../create/dropdown.svg"
                alt=""
                className="w-3 h-3 absolute right-1 top-10 opacity-70"
              />
            </div>

            <div className="w-1/2">
              <p className="text-text text-[14px] font-serif">Fees</p>

              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleInput}
                className='w-full border border-border bg-white px-3 py-2 mt-2 rounded-lg text-[12px]'
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className='flex flex-col gap-2 mt-4'>
          <button type="submit" className='bg-primary text-white text-[12px] font-medium px-2 py-2 rounded-lg w-full'>
            Post
          </button>
          <Link to="/dashboard/home" type="button" className='border border-border text-center text-[#737373] text-[12px] font-medium px-2 py-2 rounded-lg w-full'>
            Cancel
          </Link>
        </div>

      </form>
    </div>
  );
};

export default Create;