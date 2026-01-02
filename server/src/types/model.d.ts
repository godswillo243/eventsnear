import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  firebaseUid?: string;
  photoURL?: string;
  emailVerified: boolean;
}
export interface IEvent extends Document {
  user: ObjectId | IUser;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  categoryId: string;
  price: string;
  isFree: false;
  url: string;
  capacity: number;
  booked: number;
}
