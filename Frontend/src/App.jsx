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
import ProfilePage from "./pages/Dashboard/Profile/ProfilePage"
import MySkills from "./components/Profile/MySkills"
import TradeHistory from "./components/Profile/TradeHistory"
import ProfileSetting from "./pages/Dashboard/Profile/ProfileSetting"
import PrivateRoute from "./components/PrivateRoute"
import AllCategories from "./pages/Dashboard/Home/AllCategories"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />

          {/* /dashboard/home */}
          <Route path="home" element={<Home />}/>
          {/* /dashboard/home/allcategories */}
          <Route path="home/allcategories" element={<AllCategories />} />

          <Route path="request" element={<Request/>} />

          <Route path="create" element={<Create />} />

          <Route path="chat" element={<Chat />} />
          <Route path="chat/:chatId" element={<ChatRoom />} />


          <Route path="profile" element={<Profile/>}>
            <Route element={<ProfilePage />}>
              <Route index element={<Navigate to="mySkills" replace />} />     
              <Route path="mySkills" element={<MySkills/>} />
              <Route path="trade-history" element={<TradeHistory />} />
            </Route>
            <Route path="profileSettings" element={<ProfileSetting />} />
          </Route>

          <Route path="logout" element={<Logout />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
