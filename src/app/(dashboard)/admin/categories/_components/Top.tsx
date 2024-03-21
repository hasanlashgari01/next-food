import Link from "next/link";

interface TopProps {
  title: string;
}

const Top: React.FC<TopProps> = ({ title }) => {
  return (
    <div className="my-5 flex items-center justify-between gap-4 pl-8 pr-4">
      <div className="flex items-center gap-4">
        <span className="size-3 animate-pulse rounded-full bg-cyan-600"></span>
        <h3 className="text-base font-semibold leading-loose text-primary-900 max-xs:hidden md:text-3xl lg:text-2xl dark:text-white">
          {title}
        </h3>
      </div>
      <Link href="/admin/categories" className="btn btn-warning h-10 basis-28">
        بازگشت
      </Link>
    </div>
  );
};
export default Top;
