import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PublicRoute from "./routes/PublicRoutes"
import { useEffect } from "react"
import { checkAuth } from "./context/CheckAuth"
import { useAuth } from "./context/AuthContext"
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {

  const {login} = useAuth();

  useEffect(() => {
    checkAuth(login);
  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
    </>
  )
}

export default App
