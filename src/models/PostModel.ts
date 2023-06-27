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

export interface PostCommentModel {
  id?: string;
  body?: string;
  userID?: string;
  postID?: string;
  createdAt?: string;
  user?: UserModel;
}
