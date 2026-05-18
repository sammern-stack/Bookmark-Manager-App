import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes";

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
