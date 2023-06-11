export interface UserModel {
  id: string;
  name: string;
  userName: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  coverImage?: string;
  profileImage?: string;
  hashedPassword?: string;
  createdAt: Date;
  updatedAt: Date;
  followingIDs: string[];
  hasNotification: boolean;
  //   posts           Post[]
  //   comments        Comment[]
  //   notifications   Notification[]
}
