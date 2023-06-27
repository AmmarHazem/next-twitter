import { FC, useCallback, useMemo } from "react";
import { PostCommentModel } from "../../models";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Avatar from "../Avatar";

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/users/${comment.userID}`);
    },
    [comment.userID, router]
  );

  const createdAt = useMemo(() => {
    if (!comment.createdAt) return null;
    return dayjs(comment.createdAt).fromNow();
  }, [comment.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3">
        <Avatar userID={comment.userID} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline">
              {comment.user?.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">@{comment.user?.userName}</span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{comment.body}</div>
        </div>
      </div>
    </div>
  );
};

interface CommentItemProps {
  comment: PostCommentModel;
}

export default CommentItem;
