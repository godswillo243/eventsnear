import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { FirebaseError } from "firebase/app";

export const parseFirebaseSignUpError = (error: unknown): string => {
  if (!(error instanceof FirebaseError)) {
    return "Something went wrong. Please try again.";
  }

  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/missing-password":
      return "Please enter a password.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return "Unable to create account. Please try again.";
  }
};
