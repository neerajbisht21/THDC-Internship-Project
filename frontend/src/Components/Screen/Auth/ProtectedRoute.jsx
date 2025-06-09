import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useSelector((state) => state.login);
  console.log("ProtectedRoute state:", { isLoggedIn, user, allowedRoles });

  if (!isLoggedIn || !user || !user.employee_role) {
    console.log("Redirecting to auth: Not logged in or user data missing");
    return <Navigate to="/authEmployee" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.employee_role)) {
    console.log("Redirecting to auth: Role not authorized");
    return <Navigate to="/authEmployee" replace />;
  }

  console.log("User is authorized, rendering protected content");
  return <Outlet />;
};

export default ProtectedRoute;
