import axios from "axios";
import useSWR from "swr";
import { TNotification } from "../models";

function useNotifications(userID?: string) {
  const url = userID ? `/api/notifications/${userID}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, () => getUserNotifications(userID!));

  return { data, error, isLoading, mutate };
}

async function getUserNotifications(userID: string): Promise<TNotification[]> {
  const res = await axios.get<TNotification[]>(`/api/notifications/${userID}`);
  return res.data;
}

export default useNotifications;
