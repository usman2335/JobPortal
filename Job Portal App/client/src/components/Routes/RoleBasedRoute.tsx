import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

type Role = "admin" | "candidate" | "recruiter";

interface RoleBasedRouteProps {
  allowedRoles: Role[];
}

const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default RoleBasedRoute;
