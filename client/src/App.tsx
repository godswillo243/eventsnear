import { Route, Routes } from "react-router-dom";
import Home from "./app/onboarding/home";
import AuthLayout from "./app/auth/layout";
import SignIn from "./app/auth/sign-in";
import SignUp from "./app/auth/sign-up";
import { useEffect } from "react";
import { auth } from "./lib/firebase";
import { getIdToken } from "./actions/auth.actions";
import apiClient from "./api/client";
import { useAuthStore } from "./store/auth-store";
import Verification from "./app/protected/verification";
import Events from "./app/protected/events";
import ProtectedRoute from "./providers/protected-route";
import ProtectedLayout from "./app/protected/layout";
import Profile from "./app/protected/profile";

const App = () => {
  useEffect(() => {
    const unsubscibe = auth.onAuthStateChanged((user) => {
      if (!user) return;
      (async () => {
        const idToken = await getIdToken();

        const res = await apiClient.get("/users/me", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        useAuthStore.setState({ user: res.data.user });
        console.log("Authenticated user data:", res.data);
      })();
    });
    return () => unsubscibe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/events" element={<Events />} />
        <Route path="/events/create" element={<Events />} />
        <Route path="/profile" element={<Profile />}></Route>
      </Route>
      <Route
        path="/verification"
        element={
          <ProtectedRoute>
            <Verification />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
