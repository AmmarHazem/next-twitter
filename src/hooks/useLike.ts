import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { toast } from "react-hot-toast";
import { PostModel } from "../models";
import axios, { AxiosResponse } from "axios";

function useLike({ postID, userID }: { userID: string; postID: string }) {
  const { data: currentUser } = useCurrentUser();
  const { data: post, mutate: mutateFetchedPost } = usePost(postID);
  const { mutate: mutateFetchedPosts } = usePosts(userID);
  const loginModal = useLoginModal();

  if (!postID) {
    console.log("--- useLike error no post ID");
  }

  if (!userID) {
    console.log("--- useLike error no user ID");
  }

  const hasLiked = useMemo<boolean>(() => {
    const list = post?.likedIDs ?? [];
    return list.includes(currentUser?.id ?? "");
  }, [currentUser?.id, post?.likedIDs]);

  const toggleLike = useCallback(async () => {
    if (!currentUser?.id) {
      return loginModal.onOpen();
    }
    try {
      let request: () => Promise<AxiosResponse<PostModel>>;
      if (hasLiked) {
        request = () => axios.delete<PostModel>("/api/like", { data: { postID } });
      } else {
        request = () => axios.post<PostModel>("/api/like", { postID });
      }
      const updatedPost = await request();
      if (updatedPost.data.id) {
        mutateFetchedPost();
        mutateFetchedPosts();
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      console.log("--- toggleLike error", e);
      toast.error("Something went wrong");
    }
  }, [currentUser?.id, hasLiked, loginModal, mutateFetchedPost, mutateFetchedPosts, postID]);

  return { toggleLike, hasLiked };
}

export default useLike;
