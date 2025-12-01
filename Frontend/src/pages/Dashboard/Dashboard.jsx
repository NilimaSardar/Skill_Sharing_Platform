import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../store/auth";
import MobileMenu from "../../components/MobileMenu";
import UserLayout from "../../Layout/UserLayout";
import TopBar from "../../components/Topbar";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  // MobileMenu should show only on dashboard-level pages
  const showMobileMenu =
    path === "/dashboard" ||
    (path.startsWith("/dashboard/") && path.split("/").length === 3);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-4xl">
        Loading user...
      </div>
    );
  }

  return (
    <>
      <div className="sm:hidden">
        <Outlet />
        {showMobileMenu && <MobileMenu />}
      </div>

      <div className="hidden sm:block">
        <TopBar /> 
        <div className="pt-[80px]">
          <UserLayout>
            <Outlet />
          </UserLayout>
        </div>
      </div>

    </>
  );
};

export default Dashboard;
