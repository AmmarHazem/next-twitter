import { FC, useCallback, useMemo } from "react";
import { PostModel } from "../../models";
import { useRouter } from "next/router";
import useCurrentUser from "../../hooks/useCurrentUser";
import useLoginModal from "../../hooks/useLoginModal";
import dayjs from "dayjs";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

const PostItem: FC<PostItemProps> = ({ userID, post }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/users/${post.user?.userName}`);
    },
    [post.user?.userName, router]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${post.id}`);
  }, [post.id, router]);

  const onLike = useCallback(
    (e: any) => {
      e.stopPropagation();
      loginModal.onOpen();
    },
    [loginModal]
  );

  const createdAt = useMemo<string | null>(() => {
    if (!post.createdAt) return null;
    return dayjs(post.createdAt).fromNow();
  }, [post.createdAt]);

  return (
    <div onClick={goToPost} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3">
        <Avatar userName={post.user?.userName ?? ""} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline">
              {post.user?.name}
            </p>
            <span onClick={goToUser} className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{post.user?.userName}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{post.body}</div>
          <div className="flex flex-row- items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{post.comments?.length ?? 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <AiOutlineHeart size={20} />
              <p>{post.likedIDs?.length ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PostItemProps {
  userID?: string;
  post: PostModel;
}

export default PostItem;
