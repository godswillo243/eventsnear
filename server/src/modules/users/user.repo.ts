import type { IUser } from "../../types/model";
import UserModel from "./user.model";
import { isValidObjectId } from "mongoose";

class UserRepo {
  static getUserById(id: any) {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid ID");
    }
    return UserModel.findById(id);
  }
  static getUserByQuery(filter: Partial<IUser>) {
    return UserModel.findOne(filter as any);
  }
  static create(doc: Partial<IUser>) {
    return UserModel.create(doc);
  }
  static update(id: string, update: Partial<IUser>) {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid ID");
    }
    return UserModel.findByIdAndUpdate(id, update, { new: true });
  }
}

export default UserRepo;
