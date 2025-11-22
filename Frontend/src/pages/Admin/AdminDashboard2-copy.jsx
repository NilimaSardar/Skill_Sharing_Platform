import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await fetch("http://localhost:8000/api/admin/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Unauthorized");
          navigate("/admin/login");
          return;
        }

        setAdmin(data.user);

      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    navigate("/admin/logout");  // <-- IMPORTANT
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-4">

          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Dashboard
          </li>

          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Users
          </li>

          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Services
          </li>

          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Ratings
          </li>

          {/* Logout Button */}
          <li
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 cursor-pointer font-semibold"
          >
            Logout
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Navbar */}
        <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-md mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-600">
            {admin ? admin.fullName : "Loading..."}
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-md shadow">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-3xl font-bold mt-2">42</p>
          </div>

          <div className="bg-white p-6 rounded-md shadow">
            <h3 className="text-gray-500 text-sm">Active Services</h3>
            <p className="text-3xl font-bold mt-2">15</p>
          </div>

          <div className="bg-white p-6 rounded-md shadow">
            <h3 className="text-gray-500 text-sm">Pending Approvals</h3>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;