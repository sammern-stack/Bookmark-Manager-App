import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../stores"

export default function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />
}