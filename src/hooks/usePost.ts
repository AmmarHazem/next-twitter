import { PostModel } from "../models";
import axios from "axios";
import useSWR from "swr";

async function getPost(postID?: string): Promise<PostModel | null> {
  try {
    const post = await axios.get<PostModel>(postID ? `/api/posts/${postID}` : "/api/posts");
    return post.data;
  } catch (error) {
    console.log("--- getPosts error", error);
    return null;
  }
}

function usePost(postID?: string) {
  const { data, error, isLoading, mutate } = useSWR(postID ? `/api/posts/${postID}` : null, () => getPost(postID));

  return { data, error, isLoading, mutate };
}

export default usePost;
