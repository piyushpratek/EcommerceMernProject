import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAdminOnlyRoute, children }) => {
  const { loading, isAuthenticated, user } = useAppSelector((state) => state.user);

  if (loading) { return <Loader />; }

  if (!isAuthenticated) { return <Navigate to="/login" />; }

  if (isAdminOnlyRoute && user?.role !== "admin") {
    return <div>You are Not Admin So dashboard Cannot be accessed</div>
  }

  return children;
};

export default ProtectedRoute;

