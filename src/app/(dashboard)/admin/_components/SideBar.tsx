import Link from "next/link";
import {
  HiArrowRightOnRectangle,
  HiOutlineBuildingStorefront,
  HiOutlineCog6Tooth,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineMapPin,
  HiOutlineQueueList,
  HiOutlineReceiptPercent,
  HiOutlineSquares2X2,
  HiOutlineUsers,
} from "react-icons/hi2";
import { IoFastFoodOutline } from "react-icons/io5";

interface SideBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const logoutHandler = () => {
    console.log(1);
  };

  return (
    <div className="h-dvh pt-2">
      <div
        className={`fixed inset-0 bg-slate-900/40 transition-all duration-200 ease-linear lg:hidden ${isSidebarOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div
        className={`sticky top-0 h-full w-64 bg-white py-6 pl-2 pr-7 transition-all duration-200 ease-linear max-lg:absolute lg:translate-x-0 lg:bg-transparent ${isSidebarOpen ? "translate-x-0" : "translate-x-64"}`}
      >
        <div className="border-2 p-6">
          <h3>لوگو</h3>
        </div>
        <ul className="sidebar__nav mt-8 flex flex-col gap-1.5">
          <Link href="/admin/home" className="bg-[#F0F8FF]">
            <HiOutlineHome className="size-4 lg:size-5" />
            صفحه اصلی
          </Link>
          <Link href="/admin/users">
            <HiOutlineUsers className="size-4 lg:size-5" />
            کاربران
          </Link>
          <Link href="/admin/restaurants">
            <HiOutlineBuildingStorefront className="size-4 lg:size-5" />
            رستوران ها
          </Link>
          <Link href="/admin/food">
            <IoFastFoodOutline className="size-4 lg:size-5" />
            غذا ها
          </Link>
          <Link href="/admin/users">
            <HiOutlineSquares2X2 className="size-4 lg:size-5" />
            دسته بندی ها
          </Link>
          <Link href="/admin/orders">
            <HiOutlineQueueList className="size-4 lg:size-5" />
            سفارش ها
          </Link>
          <Link href="/admin/orders">
            <HiOutlineReceiptPercent className="size-4 lg:size-5" />
            کد تخفیف
          </Link>
          <Link href="/admin/provinces">
            <HiOutlineMapPin className="size-4 lg:size-5" />
            استان ها
          </Link>
          <Link href="/admin/wishlists">
            <HiOutlineHeart className="size-4 lg:size-5" />
            علاقه مندی ها
          </Link>
          <Link href="/admin/settings">
            <HiOutlineCog6Tooth className="size-4 lg:size-5" />
            تنظیمات
          </Link>
          <span className="" onClick={logoutHandler}>
            <HiArrowRightOnRectangle className="size-4 lg:size-5" />
            خروج
          </span>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
