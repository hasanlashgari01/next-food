import { twMerge } from "tailwind-merge";

interface IProps {
  price: number | undefined;
  discount?: {
    percent: number | null | undefined;
  };
  className?: string;
}

const Price: React.FC<IProps> = ({ price, discount, className }) => {
  return (
    <div>
      {price && discount && discount?.percent != (0 && undefined && null) && (
        <span className="discount">
          <span className="amount">{price - (price * Number(discount?.percent)) / 100}</span>
          <span className="percent">%{discount?.percent}</span>
        </span>
      )}
      <h3 className={twMerge("text-sm", className)}>{price?.toLocaleString()} تومان</h3>
    </div>
  );
};

export default Price;
