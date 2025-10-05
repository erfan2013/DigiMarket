import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = useSelector(s => s?.user?.user);
  const loc = useLocation();
  if (!user?._id) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }
  return children;
}
