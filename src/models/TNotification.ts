import { UserModel } from "./UserModel";

export interface TNotification {
  id?: string;
  body?: string;
  userID?: string;
  user?: UserModel;
  createdAt?: string;
}
