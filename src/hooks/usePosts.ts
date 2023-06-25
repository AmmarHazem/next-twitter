import { PostModel } from "../models";
import axios from "axios";
import useSWR from "swr";

async function getPosts(userID?: string) {
  try {
    const posts = await axios.get<PostModel[]>(userID ? `/api/posts/user/${userID}` : "/api/posts/user");
    return posts;
  } catch (error) {
    console.log("--- getPosts error", error);
    return null;
  }
}

function usePosts(userID?: string) {
  const { data, error, isLoading, mutate } = useSWR(userID ? `/api/posts/user/${userID}` : "/api/posts/user", () =>
    getPosts(userID)
  );

  return { data, error, isLoading, mutate };
}

export default usePosts;
