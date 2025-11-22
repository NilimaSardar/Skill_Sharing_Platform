import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.css'

import Login from "./pages/Login"
import Register from "./pages/Register"
import Welcome from "./pages/Welcome"
import LandingPage from "./pages/LandingPage"
import PageNotFound from "./pages/PageNotFound"
import Dashboard from "./pages/Dashboard/Dashboard"
import Logout from "./pages/Logout"
import Request from "./pages/Dashboard/Request"
import Home from "./pages/Dashboard/Home"
import Profile from "./pages/Dashboard/Profile"
import Chat from "./pages/Dashboard/Chat"
import Create from "./pages/Dashboard/Create"
import ChatRoom from "./pages/Dashboard/Chat/ChatRoom"
import ProfileSetting from "./pages/Dashboard/Profile/ProfileSetting"
import PrivateRoute from "./components/PrivateRoute"
import AllCategories from "./pages/Dashboard/Home/AllCategories"
import Categories from "./pages/Dashboard/Home/Categories"
import ProposeExchange from "./pages/Dashboard/Home/ProposeExchange"
import ViewShareDetails from "./pages/Dashboard/Home/ViewShareDetails"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminLogout from "./pages/Admin/AdminLogout"
import AdminProtected from "./components/AdminProtected"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/logout" element={<AdminLogout/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          }
        />

        {/* Admin Protected */}
        {/* <Route
          path="/admin/dashboard"
          element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          }
        />

        </Routes> */}

        {/* Dashboard Protected */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />

          {/* Home Routes */}
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

          {/* Profile Settings */}
          <Route path="profile/profileSettings" element={<ProfileSetting />} />

          <Route path="logout" element={<Logout />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
