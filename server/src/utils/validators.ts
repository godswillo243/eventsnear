import z from "zod";

export const createUserValidator = z.object({
  name: z.string().min(2, "Name is must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firebaseUid: z.string().optional(),
});
