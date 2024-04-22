import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div className="py-6 font-Dana">
      <div className="container">
        <div className="flex h-10 items-center justify-between child:h-full md:h-12">
          <Link href="/" className="aspect-square h-full overflow-hidden rounded-full">
            <Image src="/Auth.png" width={1000} height={1000} alt="logo" className="size-full object-cover" />
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <Link
              href="/auth/seller"
              className="auth__btn rounded-full border border-blue-600 px-3 text-blue-600 ease-in-out hover:bg-blue-600 hover:text-blue-50 max-xs:text-xs/8 md:px-6 dark:text-white"
            >
              ثبت نام فروشگاه
            </Link>
            <div className="child:auth__btn flex shrink-0 items-center overflow-hidden rounded-full bg-white dark:bg-transparent">
              <Link
                href="/auth/login"
                className="hidden flex-initial bg-blue-100 pl-12 pr-8 hover:bg-blue-200 md:-ml-5 md:inline-block dark:bg-blue-800 dark:hover:bg-blue-600"
              >
                ورود
              </Link>
              <Link
                href="/auth/register"
                className="flex flex-1 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 max-md:size-10 md:px-10 dark:hover:bg-blue-600"
              >
                <span className="hidden md:inline-block">ثبت نام</span>
                <HiOutlineArrowLeftOnRectangle className="inline-block text-xl md:hidden" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
