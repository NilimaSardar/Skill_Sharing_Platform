import React, { useState, useEffect } from "react";
import { useAuth } from "../../../store/auth";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { API, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // Ensure user ID exists
  useEffect(() => {
    if (!user || !user._id) {
      alert("User not loaded. Please log in again.");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const current = formData.currentPassword.trim();
    const newPw = formData.newPassword.trim();
    const confirm = formData.confirmPassword.trim();

    if (!current || !newPw || !confirm) {
      alert("All fields are required.");
      return;
    }

    if (newPw !== confirm) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (!user || !user._id) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      setLoading(true);

      console.log("Changing password for:", user._id);

      const res = await fetch(
        `${API}/api/auth/user/${user._id}/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            currentPassword: current,
            newPassword: newPw,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Password changed successfully!");
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Change password error:", err);
      alert("Internal server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mb-20'>
      <div className='flex items-center justify-start pl-[20px] py-5 sm:pl-0 bg-primary text-white sm:text-text sm:bg-gray-200'>
        <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer sm:hidden">
            <img src="../../images/BackArrow.svg" alt="Back" className='w-[25px] h-[25px]'/>
        </div>
        <h3 className=' w-full text-center text-[18px] sm:text-start pr-40 sm:pl-4 sm:text-xl'>
          Change Password
        </h3>
      </div>

      <form className='flex flex-col py-3 mx-[28px]' onSubmit={handleSubmit}>

        {/* Title & Description */}
        <div className='flex flex-col gap-2 mt-2'>
        <label className="block mb-1 font-medium">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className='border border-border px-4 py-2 w-full rounded-lg placeholder:text-[14px]'
            placeholder=''
            required
          />

          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className='border border-border px-4 py-2 w-full rounded-lg placeholder:text-[14px]'
            placeholder=''
            required
          />

          <label className="block mb-1 font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className='border border-border px-4 py-2 w-full rounded-lg placeholder:text-[14px]'
            placeholder=''
            required
          />
        </div>

        {/* Buttons */}
        <div className='flex flex-col gap-2 mt-4'>
          <button 
            type="submit" 
            disabled={loading}
            className='bg-primary text-white text-[16px] font-medium px-2 py-2 rounded-lg w-full'>
          {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
