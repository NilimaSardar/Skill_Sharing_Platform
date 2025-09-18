import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import ChatList from "./pages/Dashboard/Chat/ChatList"
import ChatRoom from "./pages/Dashboard/Chat/ChatRoom"


function App() {

  return (
    <>
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home/>} />
          <Route path="home" element={<Home />} />
          <Route path="request" element={<Request/>} />
          <Route path="create" element={<Create />} />

          <Route path="chat" element={<Chat />}>
            <Route index element={<ChatList />} />
            <Route path=":chatId" element={<ChatRoom />} />
            {/* <Route path="settings" element={<ChatSettings />} /> */}
          </Route>

          <Route path="profile" element={<Profile/>} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
    </>
  )
}

export default App
