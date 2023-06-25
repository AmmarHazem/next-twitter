import { useRouter } from "next/router";
import { FC } from "react";
import usePost from "../../hooks/usePost";
import { ClipLoader } from "react-spinners";
import Header from "../../components/Header";
import PostItem from "../../components/posts/PostItem";
import PostForm from "../../components/PostForm";

const PostDetailView: FC = () => {
  const router = useRouter();
  const { postID } = router.query;

  const { data: post, isLoading } = usePost(postID as string | undefined);

  if (isLoading || !post) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={"Tweet"} showBackArrow={true} />
      <PostItem post={post} />
      <PostForm postID={postID as string} isComment={true} placeholder="Tweet your reply" />
    </>
  );
};

export default PostDetailView;
