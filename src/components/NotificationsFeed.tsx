import { FC, useEffect } from "react";
import useNotifications from "../hooks/useNotifications";
import useCurrentUser from "../hooks/useCurrentUser";
import { BsTwitter } from "react-icons/bs";

const NotificationsFeed: FC<NotificationsFeedProps> = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (!fetchedNotifications?.length) {
    return <div className="text-neutral-600 text-center p-6 text-xl">No Notifications</div>;
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification) => {
        return (
          <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
            <BsTwitter color="white" size="32" />
            <p className="text-white">{notification.body}</p>
          </div>
        );
      })}
    </div>
  );
};

interface NotificationsFeedProps {}

export default NotificationsFeed;
