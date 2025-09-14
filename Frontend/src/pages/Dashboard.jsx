import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const Dashboard = () => {
  const { user, isLoading } = useAuth();

  console.log("user from dashboard:", user.email ?? "no user yet");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading user...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen text-6xl font-medium">
      <h3>Dashboard</h3>
      {user ? (
        <p className="text-2xl">Welcome, {user.name || user.email} 🎉</p>
      ) : (
        <p className="text-2xl">No user logged in</p>
      )}
      <Link
        to="/logout"
        className="bg-blue-600 rounded-4xl text-white text-2xl px-5 py-2"
      >
        Logout
      </Link>
    </div>
  );
};

export default Dashboard;
