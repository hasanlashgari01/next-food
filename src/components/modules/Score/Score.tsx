import { HiStar } from "react-icons/hi2";

export interface IScore {
  score: number;
}

const Score: React.FC<IScore> = ({ score }) => {
  return (
    <div className="flex items-center gap-1">
      <HiStar className="mb-1 text-yellow-500 md:mb-1.5" />
      <span className="text-sm md:text-base dark:text-slate-100">{score}</span>
    </div>
  );
};

export default Score;
