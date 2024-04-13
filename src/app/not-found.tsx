import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - صفحه یافت نشد",
  description: "صفحه یافت نشد",
};

const NotFound = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 dark:bg-slate-900">
      <h1 className="text-2xl xs:text-3xl lg:text-5xl dark:text-white">صفحه مورد نظر یافت نشد</h1>
      <Link href="/" className="redirect">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

export default NotFound;
