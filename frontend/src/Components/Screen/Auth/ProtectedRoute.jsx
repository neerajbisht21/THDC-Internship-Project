import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useSelector((state) => state.login);
    console.log("ProtectedRoute state:", { isLoggedIn, user });

  if (!isLoggedIn || !user || !user.employee_role) {
    // Not logged in or user data missing — redirect to employee auth (or you can customize)
    return <Navigate to="/authEmployee" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.employee_role)) {
    // User logged in but role is not authorized
    return <Navigate to="/authEmployee" replace />;
  }

  // User is logged in and authorized
  return <Outlet />;
};

export default ProtectedRoute;
