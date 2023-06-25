import { FC } from "react";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import Header from "../../components/Header";
import useUser from "../../hooks/useUser";
import UserHero from "../../components/users/UserHero";
import UserBio from "../../components/users/UserBio";
import PostsFeed from "../../components/posts/PostsFeed";

const UserProfile: FC = () => {
  const router = useRouter();
  const { userName } = router.query;
  const { data: user, isLoading } = useUser({ userName: userName as string });

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={user.user.name} showBackArrow={true} />
      <UserHero userName={userName as string} />
      <UserBio userName={userName as string} />
      <PostsFeed userID={user.user.id} />
    </>
  );
};

export default UserProfile;
