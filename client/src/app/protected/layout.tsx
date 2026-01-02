import { Navigate, Outlet } from "react-router-dom";
import Navbar from "@/components/shared/navbar";
import { auth } from "@/lib/firebase";

const ProtectedLayout = () => {
  if (!auth.currentUser?.emailVerified) {
    console.log("User email not verified, redirecting to verification page.");
    return <Navigate to={"/verification"} />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
