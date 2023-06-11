import axios from "axios";
import useSWR from "swr";
import { UserModel } from "../models";

async function getCurrentUser(): Promise<UserModel | null> {
  try {
    const res = await axios.get<UserModel>("/api/current-user");
    return res.data;
  } catch (e) {
    console.log("--- getCurrentUser error", e);
    return null;
  }
}

function useCurrentUser() {
  const response = useSWR("/api/current-user", getCurrentUser);
  return response;
}

export default useCurrentUser;
