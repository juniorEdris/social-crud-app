import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../hooks/useAuthStore";

const PrivateRoute = () => {
  const { auth } = useAuthStore((state) => state);
  const location = useLocation();

  return auth?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ form: location }} replace />
  );
};

export default PrivateRoute;
