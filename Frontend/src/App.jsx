import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

import Login from "./pages/Login"
import Register from "./pages/Register"
import Welcome from "./pages/Welcome"
import LandingPage from "./pages/LandingPage"
import PageNotFound from "./pages/PageNotFound"


function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  )
}

export default App
