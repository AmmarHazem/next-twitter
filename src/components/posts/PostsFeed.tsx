import { FC } from "react";
import usePosts from "../../hooks/usePosts";
import PostItem from "./PostItem";

const PostsFeed: FC<PostsFeedProps> = ({ userID }) => {
  const { data: posts } = usePosts(userID);

  return (
    <>
      {posts?.data?.map<JSX.Element>((post) => {
        return <PostItem key={post.id} userID={post.userID} post={post} />;
      })}
    </>
  );
};

interface PostsFeedProps {
  userID?: string;
}

export default PostsFeed;
