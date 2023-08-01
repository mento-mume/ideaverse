import { Outlet, Navigate, useLocation } from "react-router-dom";
import auth from "../firebase";

const PrivateRouteLayout = () => {
  const location = useLocation();
  return auth.currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRouteLayout;
