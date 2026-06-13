import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import Home from "./components/Home";
import AllProjects from "./components/AllProjects";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="dark min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
