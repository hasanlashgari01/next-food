import Button from "@/components/modules/Action/Button";
import { IFood } from "@/common/interface/food";
import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import Bookmark from "../Action/Bookmark";
import Like from "../Action/Like";
import Link from "next/link";
import Price from "./Price";

const Food: React.FC<IFood> = ({ _id, image, title, price, discount, description, isLiked, isBookmarked }) => {
  return (
    <div className="relative flex flex-col rounded border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-2 overflow-hidden lg:gap-6 lg:rounded-lg">
        <div className="mx-auto h-36 w-44 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={image ? `${fileRoute}food/${image}` : "/Auth.png"}
            alt={title}
            width={500}
            height={500}
            loading="lazy"
            className="h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col">
          <div className="contents">
            <Link href={`/food/${_id}`} className="max-w-56">
              {title}
            </Link>
            <p className="mt-2 line-clamp-3 max-w-56 text-xs/5 font-normal text-slate-400 dark:text-slate-400">
              {description}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <Button foodId={_id} />
            <Price price={price} discount={discount} />
          </div>
        </div>
        <div className="absolute left-4 top-4 space-y-2">
          <Like isLiked={isLiked} id={_id} status="food" />
          <Bookmark isBookmarked={isBookmarked} id={_id} status="food" />
        </div>
      </div>
    </div>
  );
};

export default Food;
