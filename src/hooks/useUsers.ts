import axios from "axios";
import useSWR from "swr";
import { UserModel } from "../models";

const url = "/api/users";

async function getUsers(): Promise<UserModel[] | null> {
  try {
    const res = await axios.get<UserModel[]>(url);
    return res.data;
  } catch (e) {
    console.log("--- getCurrentUser error", e);
    return null;
  }
}

export default function useUsers() {
  const response = useSWR(url, getUsers);
  return response;
}
