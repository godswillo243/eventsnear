import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInDefaultValues, signUpDefaultValues } from "@/constants";
import { Link, useNavigate } from "react-router-dom";
import { createUser, signInUser } from "@/actions/auth.actions";
import apiClient from "@/api/client";
import { useState } from "react";
import { parseFirebaseSignUpError } from "@/lib/utils";
import { sendEmailVerification } from "firebase/auth";
import { LucideLoader2 } from "lucide-react";
import { auth } from "@/lib/firebase";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
});

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const isSignIn = mode === "sign-in";
  const defaultValues = !isSignIn ? signUpDefaultValues : signInDefaultValues;
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      if (isSignIn) {
        await signInUser(values.email, values.password);
      } else if (mode === "sign-up") {
        const user = await createUser(values.email, values.password);
        const idToken = await user.getIdToken();
        await auth.updateCurrentUser({ ...user, displayName: values.name! });
        await apiClient.post(
          "/users/create",
          {
            name: values.name,
            email: values.email,
            password: values.password,
          },
          { headers: { Authorization: `Bearer ${idToken}` } }
        );
        await sendEmailVerification(user);
      }
    } catch (error) {
      setError(
        isSignIn ? "Invalid email or password" : parseFirebaseSignUpError(error)
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 wrapper mt-6 max-w-sm mx-auto"
      >
        <h3 className="h4-medium text-center">
          {isSignIn ? "Sign In" : "Create an Account"}
        </h3>
        {Object.keys(defaultValues).map((key) => {
          return (
            <FormField
              key={key}
              control={form.control}
              name={key as keyof z.infer<typeof formSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{key}</FormLabel>
                  <FormControl>
                    <Input
                      type={
                        key === "password"
                          ? "password"
                          : key === "email"
                          ? "email"
                          : "text"
                      }
                      placeholder={`Enter ${key}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button type="submit" className="w-full mx-auto">
          {isPending ? (
            <LucideLoader2 className="animate-spin" />
          ) : isSignIn ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </Button>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <p className="p-medium-16 text-center">
          {isSignIn ? "Don't have an account? " : "Already have an account?"}{" "}
          <Link
            to={isSignIn ? "/sign-up" : "/sign-in"}
            className="text-blue-600 hover:underline"
          >
            {isSignIn ? "Create one" : "Sign In"}
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default AuthForm;
