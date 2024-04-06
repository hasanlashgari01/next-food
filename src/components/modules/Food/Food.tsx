import Button from "@/app/restaurant/_components/Button";
import { IFood } from "@/common/interface/food";
import { fileRoute } from "@/services/routeService";
import Image from "next/image";

const Food: React.FC<IFood> = ({ _id, image, title, description }) => {
  return (
    <div key={_id} className="flex flex-col rounded border p-4 dark:border-slate-700">
      <div className="flex flex-col gap-2 overflow-hidden lg:gap-6 lg:rounded-lg">
        <div className="mx-auto h-48 w-full shrink-0 overflow-hidden rounded-lg">
          <Image
            src={image ? `${fileRoute}food/${image}` : "/Auth.png"}
            alt={title}
            width={500}
            height={500}
            loading="lazy"
            className="h-full object-cover object-center"
          />
        </div>
        <div className="mt-2.5 flex flex-col">
          <div className="flex max-w-56 flex-col">
            <h3>{title}</h3>
            <p className="mt-2 line-clamp-3 text-xs dark:text-slate-400">{description}</p>
          </div>
          <div className="mt-4">
            <Button foodId={_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
