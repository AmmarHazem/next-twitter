import { UserModel } from "./UserModel";

export interface PostModel {
  id?: string;
  body?: string;
  updatedAt?: Date;
  createdAt?: Date;
  userID?: string;
  likedIDs?: string[];
  user?: UserModel;
  comments?: PostCommentModel[];
}

interface PostCommentModel {
  text?: string;
}
