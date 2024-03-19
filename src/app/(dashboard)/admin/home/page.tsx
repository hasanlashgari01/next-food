import AnalyticsCard from "./_components/AnalyticsCard";
import GenderChart from "./_components/GenderChart";
import RestaurantChart from "./_components/RestaurantChart";

const page = () => {
  return (
    <div className="mt-10">
      <div className="mb-5 flex items-center gap-4 pr-4">
        <span className="size-3 animate-pulse rounded-full bg-amber-600"></span>
        <h3 className="text-2xl font-semibold leading-loose text-primary-900 md:text-3xl dark:text-white">آمار کلی</h3>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-12 gap-6">
          <AnalyticsCard />
          <div className="col-span-12 grid grid-cols-1 gap-3 xs:grid-cols-2 lg:gap-6 xl:col-span-4">
            <GenderChart />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 lg:gap-6">
          <div className="col-span-12 rounded-xl bg-white p-5 lg:rounded-2xl xl:col-span-8 dark:bg-slate-800">
            <RestaurantChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
