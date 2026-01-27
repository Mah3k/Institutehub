import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, role, loading } = useAuth();

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Checking authentication...
      </div>
    );
  }

  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  
  if (allowedRoles && (!role || !allowedRoles.includes(role.toLowerCase()))) {
    return <Navigate to="/login" replace />;
  }

  
  return children;
}
