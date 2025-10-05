import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ROLE from "../common/role";

export default function AdminRoute({ children }) {
  const user = useSelector(s => s?.user?.user);
  const loc = useLocation();

  if (!user?._id) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }
  if (user?.role !== ROLE.ADMIN) {
    return <Navigate to="/" replace />;
  }
  return children;
}
