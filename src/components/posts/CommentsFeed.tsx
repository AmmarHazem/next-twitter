import { FC } from "react";
import { PostCommentModel } from "../../models";
import CommentItem from "./CommentItem";

const CommentsFeed: FC<CommentsFeedProps> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </>
  );
};

interface CommentsFeedProps {
  comments: PostCommentModel[];
}

export default CommentsFeed;
