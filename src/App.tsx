import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthForm from "./auth/AuthForm";
import Dashboard from "./pages/Dashboard";
import { getCurrentUser, signOut } from "./auth/AuthService";
import type { User } from "@supabase/supabase-js"; // ✅ Richtiger Import!

export default function App() {
  // 🔹 Fix: useState korrekt mit `User | null` initialisieren
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      if (currentUser) navigate("/dashboard");
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={user ? <Dashboard onLogout={handleLogout} /> : <AuthForm />} />
      <Route path="/dashboard" element={user ? <Dashboard onLogout={handleLogout} /> : <AuthForm />} />
    </Routes>
  );
}
