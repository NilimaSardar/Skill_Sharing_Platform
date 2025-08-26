import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"


function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
    
          <Route path="/login" element={<Login/>}/>
  
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  )
}

export default App
