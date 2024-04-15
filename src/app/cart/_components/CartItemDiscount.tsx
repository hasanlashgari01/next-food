interface ICartItemDiscountProps {
  amount: string | number | undefined;
  percent: number | undefined;
}

const CartItemDiscount: React.FC<ICartItemDiscountProps> = ({ amount, percent }) => {
  return (
    <span className="discount">
      <span className="amount">{Number(amount)}</span>
      <span className="percent">%{percent}</span>
    </span>
  );
};

export default CartItemDiscount;
