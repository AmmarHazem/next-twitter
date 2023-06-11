import { FC } from "react";
import useUser from "../../hooks/useUser";
import Image from "next/image";
import Avatar from "../Avatar";

const UserHero: FC<UserHeroProps> = ({ userName }) => {
  const { data } = useUser({ userName: userName });
  const user = data?.user;

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && <Image src={user.coverImage} fill={true} alt={user.name} style={{ objectFit: "cover" }} />}
        <div className="absolute -bottom-16 left-4">
          <Avatar userName={userName} isLarge={true} hasBorder={true} />
        </div>
      </div>
    </div>
  );
};

interface UserHeroProps {
  userName: string;
}

export default UserHero;
