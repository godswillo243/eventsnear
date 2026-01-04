import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const verify = async () => {
      try {
        await auth.currentUser?.reload();

        if (auth.currentUser?.emailVerified) {
          await auth.currentUser.getIdToken(true);
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };

    verify();
  }, []);

  return <p>Verifying your email…</p>;
}
