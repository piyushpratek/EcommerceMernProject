import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAdminOnlyRoute, children }) => {
  const { loading, isAuthenticated, user } = useAppSelector((state) => state.user);
  console.log("piy1: loading, isAuthenticated, user.role, user.email?", loading, isAuthenticated, user?.role, user?.email)
  if (loading) { return <Loader />; }
  // TODO
  if (!isAuthenticated) { return <Navigate to="/login" />; }
  const isAdmin = user?.role === "admin";
  console.log('piy2: isAdminOnlyRoute, !isAdmin', isAdminOnlyRoute, !isAdmin)
  if (isAdminOnlyRoute && !isAdmin) {
    return <div>You are Not Admin So dashboard Cannot be accessed</div>
  }

  return children;
};

export default ProtectedRoute;

