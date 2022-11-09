import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ form: location }} replace />
  );
};

export default PrivateRoute;
