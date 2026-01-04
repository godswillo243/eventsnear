import bcrypt from "bcryptjs";
import { asyncHandler } from "../../utils/async-handler";
import { createUserValidator } from "../../utils/validators";
import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import User from "./user.model";

export const createUser = asyncHandler(async (req, res, next) => {
  const decodedToken = (req as any).decodedToken as DecodedIdToken;

  const { success, data, error } = createUserValidator.safeParse({
    email: decodedToken.email ?? req.body.email,
    name: req.body.name,
    password: req.body.password,
    firebaseUid: decodedToken.uid,
  });
  if (!success) {
    return res.status(400).json({ error: error.issues[0].message }); // Validation failed
  }

  const user = await User.create({
    ...data,
    password: await bcrypt.hash(data.password, 10),
  });
  res.status(201).json({ user });
});

export const getAuthUser = asyncHandler(async (req, res, next) => {
  const decodedToken = (req as any).decodedToken as DecodedIdToken;
  const user = await User.findOne({ firebaseUid: decodedToken.uid });
  if (!user) {
    User.create({
      email: decodedToken.email,
      name: decodedToken.name,
      firebaseUid: decodedToken.uid,
      password: "",
    });
    res.status(201).json({ user });
  }
  res.status(200).json({ user });
});
