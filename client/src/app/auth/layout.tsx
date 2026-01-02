import Navbar from "@/components/shared/navbar";
import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <main className=" min-h-screen flex flex-col  ">
      <Navbar />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
