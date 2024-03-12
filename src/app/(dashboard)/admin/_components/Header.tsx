import Image from "next/image";
import { HiBars3, HiOutlineBell } from "react-icons/hi2";
import WelcomeText from "./WelcomeText";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="transition-all duration-200 ease-linear max-lg:-mx-6 max-lg:bg-white max-lg:px-6 max-lg:dark:bg-slate-800">
      <div className="flex justify-between max-lg:py-5 lg:mt-6">
        <div className="flex items-center justify-between gap-6 sm:gap-14">
          <div
            className="flex size-12 items-center justify-center rounded-full border border-slate-100 dark:border-slate-700 lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <HiBars3 className="size-6 dark:text-slate-100 sm:size-7" />
          </div>
          <span className="hidden gap-2 font-bold dark:text-slate-100 sm:flex md:text-lg lg:text-2xl">
            حسن لشگری عزیز؛{" "}
            <span className="">
              <WelcomeText />
            </span>
          </span>
        </div>
        <div className="flex gap-[18px]">
          <span className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white dark:bg-slate-700 dark:text-slate-100 lg:size-14 lg:bg-white">
            <HiOutlineBell className="size-6 lg:size-7" />
          </span>
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
