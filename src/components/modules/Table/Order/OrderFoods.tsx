import { IFood } from "@/common/interface/food";
import Link from "next/link";

const OrderFoods = ({ foods }: { foods: IFood[] }) => {
  return (
    <div className="flex min-w-72 flex-wrap gap-1.5">
      {foods.map(food => (
        <Link
          key={food._id}
          href={`/foods/${food._id}`}
          className="text-primary-700 rounded-lg bg-primary-300 px-1.5 py-1 text-xs transition-colors hover:bg-amber-300 dark:bg-primary-900"
        >
          {food.title}
        </Link>
      ))}
    </div>
  );
};

export default OrderFoods;
