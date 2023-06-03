import { FC } from "react";
import { SideBarItemType } from "./Sidebar";

const SidebarItem: FC<SidebarItemProps> = ({ item }) => {
  return (
    <div className="flex flex-row items-center">
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
  onClick?: () => void;
}

export default SidebarItem;
