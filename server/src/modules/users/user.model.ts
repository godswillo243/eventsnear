import { model, Schema } from "mongoose";
import type { IUser } from "../../types/model";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firebaseUid: { type: String, required: false },
    photoURL: { type: String, required: false },
    emailVerified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", userSchema);

export default User;
