import Link from "next/link";

const EmptyPage = () => {
  return (
    <div className="flex h-[70dvh] flex-col items-center justify-center rounded-lg border border-neutral-300 p-4">
      <h4 className="text-xs leading-7 md:text-xl">شما در حال حاضر هیچ سفارشی ثبت نکرده‌اید!</h4>
      <Link
        href="/food"
        className="btn mx-auto mt-4 inline-flex w-40 border-green-600 text-xs text-green-600 transition-colors duration-300 hover:bg-green-600 hover:text-green-50 md:w-44 md:py-[22px] md:text-base"
      >
        منوی رستوران
      </Link>
    </div>
  );
};

export default EmptyPage;
