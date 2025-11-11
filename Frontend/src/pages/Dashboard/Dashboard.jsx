import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import MobileMenu from "../../components/MobileMenu";

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
    <>
      <Outlet/>
      {/* <MobileMenu/> */}
    </>
  );
};

export default Dashboard;
