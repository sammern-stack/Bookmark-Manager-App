import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes";

import { useEffect } from "react";
import { useAuthStore, useThemeStore } from "./stores";

import {
  Login,
  Signup,
  ForgotPassword,
  ResetPassword,
  Home,
  Profile,
} from "./pages";

import "./App.scss";

export default function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
