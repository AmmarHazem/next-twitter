import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import { UserModel } from "../models";

function useFollow(userName: string) {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser, data: user } = useUser({ userName: userName });
  const loginModal = useLoginModal();

  const isFollowing = useMemo<boolean>(() => {
    const followingIDs = currentUser?.followingIDs ?? [];
    return followingIDs.includes(user?.user.id ?? "");
  }, [currentUser?.followingIDs, user?.user.id]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request: () => Promise<AxiosResponse<UserModel>>;
      const payload = { userName };
      if (isFollowing) {
        request = () => axios.delete<UserModel>("/api/follow", { data: payload });
      } else {
        request = () => axios.post<UserModel>("/api/follow", payload);
      }
      const res = await request();
      if (res.data.id) {
        console.log(res.data);
        mutateCurrentUser();
        mutateFetchedUser();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("--- useFollow error", error);
      toast.error("Something went wrong");
    }
  }, [currentUser, isFollowing, loginModal, mutateCurrentUser, mutateFetchedUser, userName]);

  return { isFollowing, toggleFollow };
}

export default useFollow;
