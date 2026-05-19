import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("gym_logged_in");

  if (!auth) {
    return <Navigate to="/" />;
  }

  return children;
}