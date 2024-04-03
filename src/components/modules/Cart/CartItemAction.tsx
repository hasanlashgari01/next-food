import { useDecrementFood, useIncrementFood } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { HiMinus, HiOutlineShoppingBag, HiPlus } from "react-icons/hi2";

interface ICartItemActionProps {
  foodId: string;
  quantity: number | undefined;
  refetch: () => void;
}

const CartItemAction: React.FC<ICartItemActionProps> = ({ foodId, quantity = 0, refetch }) => {
  const { mutateAsync: mutateAsyncIncrement } = useIncrementFood();
  const { mutateAsync: mutateAsyncDecrement } = useDecrementFood();

  const incrementCart = async () => {
    try {
      const { message } = await mutateAsyncIncrement(foodId);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const decrementCart = async () => {
    try {
      const { message } = await mutateAsyncDecrement(foodId);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center gap-3 pb-1">
      <button disabled={false} className="cart-btn" onClick={incrementCart}>
        {quantity > 0 ? <HiPlus className="text-white" /> : <HiOutlineShoppingBag className="text-white" />}
      </button>

      <span className="md:text-lg">{quantity}</span>

      <button disabled={quantity === 0} className="cart-btn" onClick={decrementCart}>
        <HiMinus className="text-white" />
      </button>
    </div>
  );
};

export default CartItemAction;
