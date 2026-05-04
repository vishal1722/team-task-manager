import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function RoleRoute({ children, role }) {
  const user = getUser();

  if (!user || user.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}