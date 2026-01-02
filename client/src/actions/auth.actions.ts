import { app } from "@/lib/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAuth,
} from "firebase/auth";

const auth = getAuth(app);

export const createUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const signInUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};
export const signOutUser = async () => {
  await auth.signOut();
};
export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getIdToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
};

export const onAuthStateChanged = (callback: (user: any) => void) => {
  return auth.onAuthStateChanged(callback);
};
export const verifyEmail = async (user: any) => {
  if (user) {
    await user.sendEmailVerification();
  }
};

export const sendVerificationEmail = async () => {
  await sendEmailVerification(auth.currentUser!);
};

export const sendPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
