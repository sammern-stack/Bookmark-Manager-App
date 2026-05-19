import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes";
import { useApp } from "./hooks";

import {
  Login,
  Signup,
  ForgotPassword,
  ResetPassword,
  Home,
  Profile,
} from "./pages";

export default function App() {
  useApp();

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Authorized routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
