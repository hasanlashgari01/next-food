import {
  HiOutlineBuildingStorefront,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineCog6Tooth,
  HiOutlineCurrencyDollar,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineListBullet,
  HiOutlineMapPin,
  HiOutlineQueueList,
  HiOutlineReceiptPercent,
  HiOutlineSquares2X2,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineFoodBank } from "react-icons/md";

export interface INavLinks {
  name: string;
  path: string;
  icon: any;
}

const adminPanelLinks: INavLinks[] = [
  { name: "صفحه اصلی", path: "home", icon: HiOutlineHome },
  { name: "کاربران", path: "users", icon: HiOutlineBuildingStorefront },
  { name: "فروشندگان", path: "sellers", icon: HiOutlineCurrencyDollar },
  { name: "رستوران ها", path: "restaurants", icon: HiOutlineBuildingStorefront },
  { name: "غذا ها", path: "foods", icon: IoFastFoodOutline },
  { name: "دسته بندی ها", path: "categories", icon: HiOutlineSquares2X2 },
  { name: "دیدگاه ها", path: "comments", icon: HiOutlineChatBubbleLeftEllipsis },
  { name: "سفارش ها", path: "orders", icon: HiOutlineQueueList },
  { name: "کد تخفیف", path: "discount", icon: HiOutlineReceiptPercent },
  { name: "استان ها", path: "provinces", icon: HiOutlineMapPin },
  { name: "علاقه مندی ها", path: "wishlists", icon: HiOutlineHeart },
  { name: "تنظیمات", path: "settings", icon: HiOutlineCog6Tooth },
];

const userPanelLinks: INavLinks[] = [
  { name: "صفحه اصلی", path: "home", icon: HiOutlineHome },
  { name: "سفارش ها", path: "orders", icon: HiOutlineQueueList },
  { name: "دیدگاه ها", path: "comments", icon: HiOutlineChatBubbleLeftEllipsis },
  { name: "تخفیف ها", path: "offs", icon: HiOutlineReceiptPercent },
  { name: "لیست های من", path: "lists", icon: HiOutlineHeart },
  { name: "اطلاعات حساب کاربری", path: "personal-info", icon: HiOutlineUserCircle },
];

const restaurantPanelLinks: INavLinks[] = [
  { name: "صفحه اصلی", path: "home", icon: HiOutlineHome },
  { name: "منو ها", path: "menus", icon: HiOutlineListBullet },
  { name: "غذا ها", path: "foods", icon: MdOutlineFoodBank },
  { name: "سفارش ها", path: "orders", icon: HiOutlineQueueList },
  { name: "دیدگاه ها", path: "comments", icon: HiOutlineChatBubbleLeftEllipsis },
  { name: "تخفیف ها", path: "offs", icon: HiOutlineReceiptPercent },
  { name: "تنظیمات رستوران", path: "settings", icon: HiOutlineCog6Tooth },
];

export { adminPanelLinks, restaurantPanelLinks, userPanelLinks };
