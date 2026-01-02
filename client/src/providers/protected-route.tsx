import { useAuthStore } from "@/store/auth-store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuthStore();

  // if (!user) {
  //   console.log("User not authenticated, redirecting to sign-in.");
  //   return <Navigate to={"/sign-in"} />;
  // }
  return <>{children}</>;
};

export default ProtectedRoute;
