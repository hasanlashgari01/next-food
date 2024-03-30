import { HiOutlineExclamationCircle } from "react-icons/hi2";

interface FactorItemProps {
  text: string;
  value: string;
  message?: string;
  total?: boolean;
}

const FactorItem: React.FC<FactorItemProps> = ({ text, value, message, total }) => {
  return (
    <div className="my-3">
      <div className="flex items-center justify-between text-sm/8">
        <span className="text-[#353535]">{text}</span>
        <span className={total ? "text-lime-500" : "text-[#353535]"}>{value} تومان</span>
      </div>
      {message !== undefined && (
        <div className="mt-2 flex items-center gap-2 text-yellow-500">
          <HiOutlineExclamationCircle className="shrink-0 text-2xl" />
          <p className="flex-1 text-[10px]">{message}</p>
        </div>
      )}
    </div>
  );
};

export default FactorItem;
