import { FC, useCallback } from "react";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import Image from "next/image";

const Avatar: FC<AvatarProps> = ({ userID, userName, hasBorder, isLarge }) => {
  const { data: user } = useUser({ userName: userName, userID: userID });
  const router = useRouter();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      event.stopPropagation();
      if (!user?.user.userName) return;
      const url = `/users/${user?.user.userName}`;
      router.push(url);
    },
    [router, user?.user.userName]
  );

  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""} ${
        isLarge ? "h-32 w-32" : "h-12 w-12"
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill={true}
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        onClick={onClick}
        src={user?.user.profileImage ?? "/images/placeholder.png"}
        alt={user?.user.name ?? ""}
      />
    </div>
  );
};

interface AvatarProps {
  userName?: string;
  userID?: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

export default Avatar;
