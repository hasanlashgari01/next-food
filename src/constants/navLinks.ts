import {
  HiOutlineBuildingStorefront,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineCog6Tooth,
  HiOutlineCurrencyDollar,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineMapPin,
  HiOutlineQueueList,
  HiOutlineReceiptPercent,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { IoFastFoodOutline } from "react-icons/io5";

const adminPanelLinks: { name: string; path: string; icon: any }[] = [
  { name: "صفحه اصلی", path: "home", icon: HiOutlineHome },
  { name: "کاربران", path: "users", icon: HiOutlineBuildingStorefront },
  { name: "فروشندگان", path: "sellers", icon: HiOutlineCurrencyDollar },
  { name: "رستوران ها", path: "restaurants", icon: HiOutlineBuildingStorefront },
  { name: "غذا ها", path: "foods", icon: IoFastFoodOutline },
  { name: "دسته بندی ها", path: "categories", icon: HiOutlineSquares2X2 },
  { name: "کامنت ها", path: "comments", icon: HiOutlineChatBubbleLeftEllipsis },
  { name: "سفارش ها", path: "orders", icon: HiOutlineQueueList },
  { name: "کد تخفیف", path: "discount", icon: HiOutlineReceiptPercent },
  { name: "استان ها", path: "provinces", icon: HiOutlineMapPin },
  { name: "علاقه مندی ها", path: "wishlists", icon: HiOutlineHeart },
  { name: "تنظیمات", path: "settings", icon: HiOutlineCog6Tooth },
];

export { adminPanelLinks };
