import { ICart } from "@/common/interface/cart";
import { IData } from "@/common/interface/getData";
import CartItem from "./CartItem";

const CartList: React.FC<IData<ICart>> = ({ isLoading, data, refetch }) => {
  return (
    <div className="h-96 shrink-0 overflow-y-auto scroll-smooth">
      {!isLoading && data && data.foods.length > 0 ? (
        <ul className="flex min-w-72 flex-col py-2 xs:min-w-[27rem]">
          {data.foods?.map(food => <CartItem key={food._id} food={food} refetch={refetch as any} />)}
        </ul>
      ) : (
        <div className="flex h-72 items-center justify-center bg-blue-300/20">
          <span className="text-lg font-bold sm:text-2xl dark:text-white">سبد خرید شما خالی است</span>
        </div>
      )}
    </div>
  );
};

export default CartList;
