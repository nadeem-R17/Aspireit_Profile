import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login"
import SignUp from "./components/Signup"
import Home from "./components/Home"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/home" element={<Home />} />
        </Routes>
        </Router>
    </>
  )
}

export default App
