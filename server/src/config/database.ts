import { connect } from "mongoose";
import "dotenv/config";

export const connectToDatabase = () => {
  try {
    const mongoUri = process.env.MONGO_URI as string;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    return connect(mongoUri);
  } catch (error) {
    throw error;
  }
};
