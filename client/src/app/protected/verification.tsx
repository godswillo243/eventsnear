import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";

const Verification = () => {
  const [counter, setCounter] = useState(0);

  const handleResendCode = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      await sendEmailVerification(user);
      setCounter(60);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <main className="relative min-h-dvh w-full bg-muted">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>
              Enter the verification code sent your email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="w-full max-w-sm space-y-4">
              <div className="w-full flex items-center justify-center">
                <InputOTP
                  maxLength={6}
                  className="flex items-center gap-8"
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  {[0, 1, 2, 3, 4, 5].map((key) => (
                    <InputOTPSlot
                      index={key}
                      key={key}
                      className="rounded-md! p-medium-18! size-10 bg-muted border-2 border-muted-foreground"
                    />
                  ))}
                </InputOTP>
              </div>
              <div className="p-2 flex items-center flex-col gap-2 w-full">
                <Button className="w-full">Submit</Button>
                <Button
                  variant={"link"}
                  type="button"
                  className="w-full"
                  onClick={() => handleResendCode()}
                >
                  Resend code
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Verification;
