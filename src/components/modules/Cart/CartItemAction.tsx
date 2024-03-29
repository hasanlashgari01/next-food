import { HiMinus, HiOutlineShoppingBag, HiPlus } from "react-icons/hi2";

interface ICartItemActionProps {
  foodId: string;
  quantity: number | undefined;
}

const CartItemAction: React.FC<ICartItemActionProps> = ({ foodId, quantity = 0 }) => {
  return (
    <div className="flex items-center gap-3 pb-1">
      <button disabled={false} className="cart-btn">
        {quantity > 0 ? <HiPlus className="text-white" /> : <HiOutlineShoppingBag className="text-white" />}
      </button>

      <span className="md:text-lg">{quantity}</span>

      <button disabled={quantity === 0} className="cart-btn">
        <HiMinus className="text-white" />
      </button>
    </div>
  );
};

export default CartItemAction;
