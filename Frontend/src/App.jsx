import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

import Login from "./pages/Login"
import Register from "./pages/Register"


function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
    
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
  
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  )
}

export default App
