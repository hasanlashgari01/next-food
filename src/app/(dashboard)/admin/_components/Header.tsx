import NotificationDropdown from "@/components/modules/Header/NotificationDropdown";
import { NotificationProps } from "@/ts/interface/notification";
import Image from "next/image";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import WelcomeText from "../../../../components/modules/Header/WelcomeText";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  return (
    <div className="transition-all duration-200 ease-linear max-lg:-mx-6 max-lg:bg-white max-lg:px-6 max-lg:dark:bg-slate-800">
      <div className="flex justify-between max-lg:py-5 lg:mt-6">
        <div className="flex items-center justify-between gap-6 sm:gap-14">
          <div
            className="flex size-12 items-center justify-center rounded-full border border-slate-100 lg:hidden dark:border-slate-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <HiBars3 className="size-6 sm:size-7 dark:text-slate-100" />
          </div>
          <WelcomeText />
        </div>
        <div className="flex gap-[18px]">
          <NotificationDropdown notifications={notifications} />
          <Image
            src="/profile.jpg"
            alt="پروفایل"
            width={100}
            height={100}
            priority={true}
            className="size-12 cursor-pointer rounded-full object-cover object-top lg:size-14"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
