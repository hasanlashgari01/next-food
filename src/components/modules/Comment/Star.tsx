import { Dispatch, SetStateAction, useState } from "react";
import { HiOutlineStar } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface IStarProps {
  maxRate?: number;
  rate: number;
  onRate: Dispatch<SetStateAction<number>>;
}

const Star: React.FC<IStarProps> = ({ maxRate = 5, rate, onRate }) => {
  const [defaultRate, setDefaultRate] = useState(rate ?? 5);

  const rateHandler = (rate: number) => {
    setDefaultRate(rate);
    onRate(rate);
  };

  return (
    <div className="flex flex-row-reverse items-center gap-0.5">
      {[...Array(maxRate)].map((_, index) => (
        <span
          key={index}
          className="cursor-pointer"
          onClick={() => rateHandler(index + 1)}
          onMouseEnter={() => setDefaultRate(index + 1)}
          onMouseLeave={() => onRate(index + 1)}
        >
          <HiOutlineStar
            className={twMerge(
              "size-5 shrink-0 fill-transparent stroke-amber-500 transition-colors delay-75 ease-in-out md:size-6",
              index < rate && "fill-amber-500",
            )}
          />
        </span>
      ))}
    </div>
  );
};

export default Star;
