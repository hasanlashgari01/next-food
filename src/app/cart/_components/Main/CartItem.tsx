import CartItemAction from "@/components/modules/Cart/CartItemAction";
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi2";
import CartItemDiscount from "../CartItemDiscount";
import { IData } from "@/common/interface/getData";
import { ICartItem } from "@/common/interface/cart";
import { calcFoodDiscount } from "@/utils/func";
import { useRemoveFoodFromCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { fileRoute } from "@/services/routeService";

const CartItem: React.FC<IData<ICartItem>> = ({ isLoading, data, refetch }) => {
  const { _id, food, quantity } = data;
  const { mutateAsync } = useRemoveFoodFromCart();
  const discount = food?.discount?.percent;
  const price = food?.discount && discount ? calcFoodDiscount(food.price ? food.price : 0, discount ?? 0) : food?.price;

  const removeFoodFromCart = async () => {
    try {
      const { message } = await mutateAsync(_id);
      toast.success(message);
      refetch && refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-lg border-neutral-300 px-6 py-3 xs:flex-row sm:items-center sm:border md:py-6 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex basis-32 max-xs:flex-1 max-xs:justify-center xl:basis-44">
        <Image
          src={food?.image ? `${fileRoute}food/${food.image}` : "/Auth.png"}
          width={1000}
          height={1000}
          alt="auth-food"
          loading="lazy"
          className="shrink-0 rounded-lg max-xs:w-1/2 sm:h-full sm:w-full"
        />
      </div>
      <div className="flex h-full flex-1 flex-col justify-between py-2.5">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="line-clamp-1 flex-1 text-base font-semibold leading-8 md:text-lg lg:text-xl dark:text-white">
              {food?.title}
            </h3>
            <button
              className="shrink-0 rounded-md p-1 transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-opacity-65 lg:rounded-xl"
              onClick={removeFoodFromCart}
            >
              <HiOutlineTrash className="dark:text-white" size={20} />
            </button>
          </div>
          <div className="mt-1 hidden w-2/3 items-center justify-between md:flex">
            <span className="line-clamp-2 flex-1 text-sm leading-6 text-neutral-400 dark:text-slate-300">
              {food?.description}
            </span>
          </div>
        </div>

        <div className="flex min-h-[68px] items-end justify-between dark:text-white">
          <CartItemAction quantity={quantity} foodId={_id} refetch={refetch as any} />
          <div className="mb-1 mt-4">
            {discount && discount > 0 && <CartItemDiscount amount={food?.price} percent={discount ?? 0} />}
            <span className="mt-1 inline-flex gap-1 text-neutral-900 max-md:mt-1 dark:text-white">
              {price?.toLocaleString()}
              <span>تومان</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
