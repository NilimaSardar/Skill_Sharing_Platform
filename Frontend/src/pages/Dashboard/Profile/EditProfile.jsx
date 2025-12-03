import React, { useState, useEffect } from "react";
import { useAuth } from "../../../store/auth";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
  const navigate = useNavigate();
  
  const { API, user, setUser } = useAuth();
  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  age: "",
  location: "",
  profilePhoto: null,
  });
  const [skills, setSkills] = useState([]);
  const [preview, setPreview] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
  if (user) {
  setFormData({
  fullName: user.fullName || "",
  email: user.email || "",
  phone: user.phone || "",
  age: user.age || "",
  location: user.location || "",
  profilePhoto: null,
  });

  setSkills(user.skills || []);

  setPreview(
    user.profilePhoto
      ? user.profilePhoto.startsWith("http")
        ? user.profilePhoto
        : `${API}/uploads/${user.profilePhoto}`
      : `${API}/uploads/Profile.jpeg`
  );
}

}, [user]);

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleFileChange = (e) => {
const file = e.target.files[0];
if (file) {
setFormData((prev) => ({ ...prev, profilePhoto: file }));
setPreview(URL.createObjectURL(file));
}
};

const handleDeletePhoto = async () => {
if (!window.confirm("Are you sure you want to remove your profile photo?")) return;

try {
  const data = new FormData();
  data.append("removePhoto", true);

  const res = await fetch(`${API}/api/auth/user/${user._id}`, {
    method: "PUT",
    body: data,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to remove photo");
  }

  const updatedUser = await res.json();
  setUser(updatedUser);
  setPreview(`${API}/uploads/Profile.jpeg`);
  setFormData((prev) => ({ ...prev, profilePhoto: null }));

  alert("Profile photo removed and set to default!");
} catch (err) {
  console.error(err);
  alert("Error removing photo: " + err.message);
}

};

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("fullName", formData.fullName);
  data.append("email", formData.email);
  data.append("phone", formData.phone);
  data.append("age", formData.age);
  data.append("location", formData.location);
  if (formData.profilePhoto) data.append("profilePhoto", formData.profilePhoto);
  data.append("skills", JSON.stringify(skills));

  try {
    const res = await fetch(`${API}/api/auth/user/${user._id}`, {
      method: "PUT",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to update profile");
    }

    const updatedUser = await res.json();
    setUser(updatedUser);
    alert("Profile updated successfully!");

    // Navigate to Profile Settings page
    navigate("/dashboard/profile");
  } catch (err) {
    console.error(err);
    alert("Error updating profile: " + err.message);
  }

};

return ( 
  <div className='mb-20 sm:mb-0'>
    <div className='flex items-center justify-start pl-[20px] py-5 sm:pl-0 bg-primary text-white sm:text-text sm:bg-gray-200'>
      <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer sm:hidden">
          <img src="../../images/BackArrow.svg" alt="Back" className='w-[25px] h-[25px]'/>
      </div>
      <h3 className=' w-full text-center text-[18px] sm:text-start pr-40 sm:pl-4 sm:text-xl'>
        Change Password
      </h3>
    </div>
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl border border-border border-border-blue-100">

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={preview}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            {user?.profilePhoto && (
              <button
                type="button"
                onClick={handleDeletePhoto}
                className="absolute top-0 right-1 bg-red-500 hover:bg-red-600 transition text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md"
              >
                &times;
              </button>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-3 border border-border rounded-lg px-3 py-2 text-sm hover:bg-blue-100 transition"
          />
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border border-border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:border-none focus:ring-primary shadow-sm transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:border-none focus:ring-primary shadow-sm transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border border-border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:border-none focus:ring-primary shadow-sm transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:border-none focus:ring-primary shadow-sm transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border border-border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:border-none focus:ring-primary shadow-sm transition"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
);
};

export default EditProfile;
