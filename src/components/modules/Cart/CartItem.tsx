import { ICartItem } from "@/common/interface/cart";
import Image from "next/image";
import CartItemAction from "./CartItemAction";
import CartItemDetail from "./CartItemDetail";

interface Props {
  food: ICartItem;
  refetch: () => void;
}

const CartItem: React.FC<Props> = ({ food, refetch }) => {
  const total = Number(food?.kindId?.price) * Number(food?.quantity);

  return (
    <li className="flex flex-1 gap-4 border-b px-6 py-2 text-xs transition-colors last:border-none sm:text-sm md:text-base dark:border-slate-700">
      <Image
        src="/auth-food.jpg"
        width={1000}
        height={1000}
        alt={food?.kindId?.title as string}
        loading="lazy"
        className="h-20 w-20 shrink-0 rounded-lg sm:h-28 sm:w-28"
      />
      <div className="flex flex-1 flex-col justify-between">
        <CartItemDetail title={food?.kindId?.title as string} total={total} />
        <CartItemAction foodId={food._id} quantity={food.quantity} refetch={refetch} />
      </div>
    </li>
  );
};

export default CartItem;