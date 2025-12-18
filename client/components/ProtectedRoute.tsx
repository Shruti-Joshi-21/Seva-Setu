import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role-based restriction
  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
