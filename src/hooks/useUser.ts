import axios from "axios";
import useSWR from "swr";
import { UserModel } from "../models";

const url = "/api/users";

type GetUserReturnType = { user: UserModel; followersCount: number };

async function getUserWithID(userID?: string): Promise<GetUserReturnType | null> {
  if (!userID) return null;
  try {
    const res = await axios.get<GetUserReturnType>(`${url}/id/${userID}`);
    return res.data;
  } catch (e) {
    console.log("--- getUser error", e);
    return null;
  }
}

async function getUserWithUserName(userName?: string): Promise<GetUserReturnType | null> {
  if (!userName) return null;
  try {
    const res = await axios.get<GetUserReturnType>(`${url}/user-name/${userName}`);
    return res.data;
  } catch (e) {
    console.log("--- getUser error", e);
    return null;
  }
}

export default function useUser({ userID, userName }: { userID?: string; userName?: string }) {
  const response = useSWR(userID ? `${url}/id/${userID}` : `${url}/user-name/${userName}`, () => {
    if (userID) {
      return getUserWithID(userID);
    }
    return getUserWithUserName(userName);
  });
  return response;
}
