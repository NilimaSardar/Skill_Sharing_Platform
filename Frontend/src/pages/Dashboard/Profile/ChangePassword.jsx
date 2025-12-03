import React, { useState, useEffect } from "react";
import { useAuth } from "../../../store/auth";

const ChangePassword = () => {
  const { API, user } = useAuth();
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
    
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
