import { FC, useMemo } from "react";
import useUser from "../../hooks/useUser";
import useCurrentUser from "../../hooks/useCurrentUser";
import dayjs from "dayjs";
import TButton from "../TButton";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "../../hooks/useEditModal";

const UserBio: FC<UserBioProps> = ({ userName }) => {
  const editModal = useEditModal();
  const { data: currentUserData } = useCurrentUser();
  const { data: userData } = useUser({ userName: userName });
  const user = userData?.user;

  const createdAt = useMemo(() => {
    if (!user?.createdAt) return null;
    return dayjs(user.createdAt).format("MMMM YYYY");
  }, [user?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUserData?.userName === userName ? (
          <TButton
            secondary={true}
            label="Edit"
            onClick={() => {
              editModal.onOpen();
            }}
          />
        ) : (
          <TButton secondary={true} label="Follow" onClick={() => {}} />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{user?.name}</p>
          <p className="text-md text-neutral-500">@{user?.userName}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{user?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center my-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followingIDs.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{userData?.followersCount}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface UserBioProps {
  userName: string;
}

export default UserBio;
