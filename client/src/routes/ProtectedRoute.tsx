import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../stores"

export default function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />
}