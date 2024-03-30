interface ICartItemDiscountProps {
  amount: string | number | undefined;
  percent: number | undefined;
}

const CartItemDiscount: React.FC<ICartItemDiscountProps> = ({ amount, percent }) => {
  return (
    <span className="flex shrink-0 flex-row items-center justify-end gap-2">
      <span className="inline-block text-sm text-slate-400 line-through dark:text-slate-400">{Number(amount)}</span>
      <span className="inline-block rounded-lg bg-[#FFF2F2] px-1.5 py-0.5 text-xs font-semibold text-red-500 dark:bg-pink-500/10">
        %{percent}
      </span>
    </span>
  );
};

export default CartItemDiscount;
