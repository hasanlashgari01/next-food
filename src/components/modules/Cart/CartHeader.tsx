import CartTotalPrice from "./CartTotalPrice";

interface ICartHeaderProps {
  count: number | undefined;
}

const CartHeader: React.FC<ICartHeaderProps> = ({ count }) => {
  return (
    <div className="flex w-full items-center justify-between self-end px-6 py-2.5 text-sm text-sky-600 lg:text-base">
      <div className="flex gap-1">
        <span>{count}</span>
        <span>مورد</span>
      </div>
      <CartTotalPrice isHide={false} />
    </div>
  );
};

export default CartHeader;
