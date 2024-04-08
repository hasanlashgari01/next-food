import { HiNoSymbol, HiShieldCheck, HiShieldExclamation } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface ICommentActionProps {
  isAccepted: boolean;
  commentId: string;
  banHandler: (commentId: string) => void;
  banUserAndRejectCommentHandler?: (commentId: string) => void;
}

const CommentAction: React.FC<ICommentActionProps> = ({
  isAccepted,
  banHandler,
  banUserAndRejectCommentHandler,
  commentId,
}) => {
  return (
    <div className="flex w-fit min-w-20 items-center gap-2 lg:gap-5">
      <span
        className={twMerge(
          "table-btn",
          `${!isAccepted ? "bg-green-300 dark:bg-green-500" : "bg-amber-300 dark:bg-amber-700"}`,
        )}
        onClick={() => banHandler(commentId)}
      >
        {!isAccepted ? <HiShieldCheck /> : <HiShieldExclamation />}
      </span>
      {banUserAndRejectCommentHandler && (
        <span
          className="table-btn bg-red-300 dark:bg-red-500"
          onClick={() => banUserAndRejectCommentHandler(commentId)}
        >
          <HiNoSymbol />
        </span>
      )}
    </div>
  );
};
export default CommentAction;
