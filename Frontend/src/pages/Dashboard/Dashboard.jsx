import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../store/auth";
import MobileMenu from "../../components/MobileMenu";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  // Show MobileMenu only for "/dashboard" and its one-level child routes
  const showMobileMenu =
    path === "/dashboard" ||
    (path.startsWith("/dashboard/") && path.split("/").length === 3);

  console.log("user from dashboard:", user?.email ?? "no user yet");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading user...
      </div>
    );
  }

  return (
    <>
      <Outlet />
      {showMobileMenu && <MobileMenu />}
    </>
  );
};

export default Dashboard;
