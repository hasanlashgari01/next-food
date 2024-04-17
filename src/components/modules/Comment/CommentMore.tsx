import { HiOutlineChevronDown } from "react-icons/hi2";
import ThreeDotLoading from "../Loading/ThreeDotLoading";

interface ICommentMoreProps {
  isLoading: boolean;
  onMore: () => void;
}

const CommentMore: React.FC<ICommentMoreProps> = ({ isLoading, onMore }) => {
  return (
    <div className="flex items-center justify-center">
      <span
        className="mt-4 flex w-48 cursor-pointer items-center justify-center gap-4 rounded-full bg-teal-600 px-6 py-1.5 text-white transition-colors duration-300 ease-in-out hover:bg-teal-700"
        onClick={onMore}
      >
        {isLoading ? (
          <ThreeDotLoading width="36" height="36" />
        ) : (
          <>
            <span className="leading-9">نمایش بیشتر</span>
            <HiOutlineChevronDown className="size-5" />
          </>
        )}
      </span>
    </div>
  );
};

export default CommentMore;
