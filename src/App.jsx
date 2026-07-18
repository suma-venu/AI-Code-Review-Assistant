

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

function App() {
 return (
  <>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route
  path="/dashboard"
   element={
   <ProtectedRoute>
    <Dashboard />
    </ProtectedRoute> 
  }
  />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>
    </Routes>
  </>
);
}

export default App;