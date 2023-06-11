import { FC, useCallback } from "react";
import { SideBarItemType } from "./Sidebar";
import { useRouter } from "next/router";
import useCurrentUser from "../../hooks/useCurrentUser";
import useLoginModal from "../../hooks/useLoginModal";

const SidebarItem: FC<SidebarItemProps> = ({ item, isAuth, onClick }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();
    if (isAuth && !currentUser) {
      return loginModal.onOpen();
    }
    router.push(item.href);
  }, [currentUser, isAuth, item.href, loginModal, onClick, router]);

  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        {item.icon}
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        {item.icon}
        <p className="hidden lg:block text-white text-xl">{item.label}</p>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  item: SideBarItemType;
  isAuth?: boolean;
  onClick?: () => void;
}

export default SidebarItem;
