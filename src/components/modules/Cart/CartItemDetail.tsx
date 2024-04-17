import Price from "../Food/Price";

interface Props {
  title: string;
  price: number | undefined;
  discount?: {
    percent: number | null | undefined;
  };
}

const CartItemDetail: React.FC<Props> = ({ title, price, discount }) => {
  return (
    <div>
      <p className="line-clamp-1 leading-6 sm:leading-8 dark:text-slate-100">{title}</p>
      <p className="line-clamp-1 flex gap-1 font-semibold sm:leading-8 dark:text-slate-100">
        {/* <span>{price?.toLocaleString()}</span> */}
        {/* <span>تومان</span> */}
        <Price price={price} discount={discount} />
      </p>
    </div>
  );
};

export default CartItemDetail;
