import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth-store";
import { sendEmailVerification } from "firebase/auth";

import { useEffect, useState } from "react";

const Verification = () => {
  const [_counter, setCounter] = useState(0);
  const [error, setError] = useState("");

  const handleResendCode = async () => {
    try {
      const user = auth.currentUser;
      console.log("Authenticated user data:", user);
      if (!user) return;
      await sendEmailVerification(user);
      setCounter(60);
    } catch (error) {
      console.log(error);
      setError("Error sending verification email");
    }
  };

  useEffect(() => {}, []);

  return (
    <main className="relative min-h-dvh w-full bg-muted">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-sm px-2">
          <CardHeader>
            <CardTitle className="text-center h5-bold">
              Verify your email address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="p-regular-16 text-neutral-800 text-center ">
              Click the link on your email{" "}
              {auth.currentUser?.email ?? useAuthStore().user?.email} to verifiy
              your account
            </p>
            <p className="p-regular-14 text-muted-foreground">
              Check your spam if you did not see the email.
            </p>
          </CardContent>
          <CardAction>
            <Button variant={"link"} onClick={() => handleResendCode()}>
              Resend email
            </Button>
          </CardAction>
          <div>
            <p className="p-medium-14">{error}</p>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Verification;
