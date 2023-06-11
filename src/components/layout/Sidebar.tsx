import { FC, useMemo } from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "../../hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar: FC = () => {
  const { data: currentUser } = useCurrentUser();

  const items = useMemo<SideBarItemType[]>(
    () => [
      {
        label: "Home",
        href: "/",
        icon: <BsHouseFill size={28} color="white" />,
      },
      {
        label: "Notifications",
        href: "/notifications",
        isAuth: true,
        icon: <BsBellFill size={28} color="white" />,
      },
      {
        label: "Profile",
        href: "/user/123",
        isAuth: true,
        icon: <FaUser size={28} color="white" />,
      },
    ],
    []
  );

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => {
            return <SidebarItem key={item.href} item={item} isAuth={item.isAuth} />;
          })}
          {currentUser && (
            <SidebarItem
              key="logout"
              item={{
                href: "",
                icon: <BiLogOut size={28} color="white" />,
                label: "Logout",
              }}
              onClick={() => {
                signOut();
              }}
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export type SideBarItemType = {
  label: string;
  href: string;
  isAuth?: boolean;
  icon: React.ReactNode;
};

export default Sidebar;
