import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";

import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Dashboard/Home";
import Request from "./pages/Dashboard/Request";
import Profile from "./pages/Dashboard/Profile";
import Chat from "./pages/Dashboard/Chat";
import ChatRoom from "./pages/Dashboard/Chat/ChatRoom";
import Create from "./pages/Dashboard/Create";
import ProfileSetting from "./pages/Dashboard/Profile/ProfileSetting";
import Logout from "./pages/Logout";

import AllCategories from "./pages/Dashboard/Home/AllCategories";
import Categories from "./pages/Dashboard/Home/Categories";
import ProposeExchange from "./pages/Dashboard/Home/ProposeExchange";
import ViewShareDetails from "./pages/Dashboard/Home/ViewShareDetails";

import PrivateRoute from "./components/PrivateRoute";

import AdminProtected from "./components/AdminProtected";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLogout from "./pages/Admin/AdminLogout";
import AdminLayout from "./Layout/AdminLayout";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddCategory from "./pages/Admin/AddCategory";
import AddSubcategory from "./pages/Admin/AddSubcategory";
import Reports from "./pages/Admin/Reports";
import UserManagement from "./pages/Admin/UserManagement";
import Settings from "./pages/Admin/Settings";
import EditProfile from "./pages/Dashboard/Profile/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN PUBLIC */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminLayout />
            </AdminProtected>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="addSubcategory" element={<AddSubcategory />} />
          <Route path="reports" element={<Reports />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<AdminLogout />} />
        </Route>

        {/* USER PROTECTED DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="home/allcategories" element={<AllCategories />} />
          <Route path="home/categories" element={<Categories />} />
          <Route path="home/propose-exchange" element={<ProposeExchange />} />
          <Route path="home/view-share-details" element={<ViewShareDetails />} />

          <Route path="request" element={<Request />} />
          <Route path="create" element={<Create />} />

          {/* Chat */}
          <Route path="chat" element={<Chat />} />
          <Route path="chat/:chatId" element={<ChatRoom />} />

          {/* Profile */}
          <Route path="profile" element={<Profile />} />
          <Route path="profile/profileSettings" element={<ProfileSetting />} />
          <Route path="profile/editprofile" element={<EditProfile />} />


          <Route path="logout" element={<Logout />} />
        </Route>

        {/* 404 FALLBACK */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;