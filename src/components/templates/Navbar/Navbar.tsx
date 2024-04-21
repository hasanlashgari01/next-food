import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div className="py-3 font-Dana">
      <div className="container">
        <div className="flex h-10 items-center justify-between child:h-full md:h-12">
          <Link href="/" className="aspect-square overflow-hidden rounded-full">
            <Image src="/Auth.png" width={1000} height={1000} alt="logo" />
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <Link
              href="/auth/seller"
              className="auth__btn rounded-full border border-teal-600 px-3 text-teal-600 ease-in-out hover:bg-teal-600 hover:text-teal-50 max-xs:text-xs/8 md:px-6"
            >
              ثبت نام فروشگاه
            </Link>
            <div className="child:auth__btn flex shrink-0 items-center overflow-hidden rounded-full bg-slate-100">
              <Link
                href="/auth/login"
                className="hidden flex-initial bg-transparent px-8 hover:bg-slate-200 md:inline-block"
              >
                ورود
              </Link>
              <Link
                href="/auth/register"
                className="flex flex-1 items-center justify-center rounded-full bg-teal-500 text-white hover:bg-teal-600 max-md:size-10 md:-mr-3.5 md:px-8"
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
