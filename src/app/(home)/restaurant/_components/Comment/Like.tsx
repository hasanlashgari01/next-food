import { HiOutlineHeart } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface ILikeProps {
  isLiked: boolean;
  likeCount: number;
}

const Like: React.FC<ILikeProps> = ({ isLiked = false, likeCount = 0 }) => {
  return (
    <div className="flex h-fit w-8 flex-col items-center justify-center gap-1">
      <span className="cursor-pointer">
        <HiOutlineHeart
          className={twMerge(
            "h-6 w-6 shrink-0 fill-transparent stroke-red-500 transition-colors delay-75 duration-300 ease-linear hover:stroke-red-600",
            `${isLiked && "fill-red-500 hover:fill-red-600"}`,
          )}
        />
      </span>
      <span className="cursor-default text-sm">{likeCount}</span>
    </div>
  );
};

export default Like;
