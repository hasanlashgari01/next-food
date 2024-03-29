interface Props {
  title: string;
  total: number;
}

const CartItemDetail: React.FC<Props> = ({ title, total }) => {
  return (
    <div>
      <p className="line-clamp-1 leading-6 sm:leading-8 dark:text-slate-100">{title}</p>
      <p className="line-clamp-1 flex gap-1 font-semibold sm:leading-8 dark:text-slate-100">
        <span>{total.toLocaleString()}</span>
        <span>تومان</span>
      </p>
    </div>
  );
};

export default CartItemDetail;
