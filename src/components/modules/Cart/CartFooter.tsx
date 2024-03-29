import Link from "next/link";
import { HiTrash } from "react-icons/hi2";
import CartTotalPrice from "./CartTotalPrice";
import { useEmptyCart } from "@/hooks/useCart";
import toast from "react-hot-toast";

interface CartFooterProps {
  count: number | undefined;
  total: number | undefined;
  refetch: () => void;
}

const CartFooter: React.FC<CartFooterProps> = ({ count, total, refetch }) => {
  const { mutateAsync } = useEmptyCart();

  const emptyCartHandler = async () => {
    try {
      const { message } = await mutateAsync();
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex w-full items-center justify-between self-end px-6 py-2.5 text-sm lg:text-base">
      <div className="flex gap-2">
        <Link
          href="/cart"
          className="inline-block cursor-pointer rounded-md bg-teal-600 px-6 py-2.5 text-center text-white transition-colors duration-300 hover:bg-teal-700 lg:rounded-xl"
        >
          ثبت سفارش
        </Link>
        <button
          disabled={count === 0}
          className="rounded-md bg-red-600 px-3 transition-colors duration-300 hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-opacity-65 lg:rounded-xl"
          onClick={emptyCartHandler}
        >
          <HiTrash className="text-white" size={20} />
        </button>
      </div>
      <CartTotalPrice isHide={true} total={total} />
    </div>
  );
};

export default CartFooter;
