import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PublicRoute from "./routes/PublicRoutes"
import { useEffect } from "react"
import { checkAuth } from "./context/CheckAuth"

function App() {

  useEffect(() => {
    checkAuth();
  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
    </>
  )
}

export default App
