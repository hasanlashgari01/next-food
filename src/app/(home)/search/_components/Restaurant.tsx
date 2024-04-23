import { IRestaurant } from "@/common/interface/restaurant";
import Score from "@/components/modules/Score/Score";
import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import Link from "next/link";

const Restaurant: React.FC<IRestaurant> = ({ slug, name, score, logo, categories }) => {
  return (
    <div className="col-span-full rounded-xl bg-slate-50 p-3 xs:col-span-3 md:col-span-2 dark:bg-slate-800">
      <div className="mx-auto h-36 w-3/5 overflow-hidden rounded-lg xs:size-48">
        <Image
          src={logo ? `${fileRoute}restaurant/${logo}` : "/Auth.png"}
          alt={name}
          width={200}
          height={200}
          className="size-full object-cover object-center"
        />
      </div>
      <div className="mt-5 px-5">
        <h3 className="line-clamp-2 h-[3.1rem] max-w-full leading-6 md:leading-7 lg:h-14">
          <Link href={`/restaurant/${slug}`} className="inline-block transition-colors hover:text-sky-500">
            {name}
          </Link>
        </h3>
        <div className="mt-2 flex flex-col gap-2.5">
          {categories.length > 0 && (
            <div className="flex items-center gap-x-2 pb-1">
              {categories.slice(0, 3).map(category => {
                return (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug}`}
                    className="rounded-md border border-sky-600 bg-sky-600 px-3 py-1 text-xs text-white transition-colors hover:border-sky-500 hover:bg-sky-500 dark:hover:border-sky-700 dark:hover:bg-sky-700"
                  >
                    {category.title}
                  </Link>
                );
              })}
            </div>
          )}
          <span className="shrink-0 font-Dana">
            <Score score={Number(score)} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
