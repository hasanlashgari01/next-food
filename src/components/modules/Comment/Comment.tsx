import { IMainComment } from "@/common/interface/restaurant";
import Head from "./Head";
import Like from "./Like";

interface ICommentProps extends IMainComment {
  isLiked?: boolean;
  isRestaurant?: boolean;
  refetch: () => void;
}

const Comment: React.FC<ICommentProps> = ({
  isLiked = false,
  _id,
  authorId,
  rate,
  likes,
  body,
  createdAt,
  isRestaurant = true,
  refetch,
}) => {
  return (
    <div className="rounded-lg bg-neutral-100 p-1.5 font-Dana md:p-2.5 dark:bg-slate-700">
      <Head avatar={authorId.avatar} fullName={authorId.fullName} createdAt={new Date(createdAt)} rate={rate} />

      <hr className="my-0.5 inline-block w-full border-slate-200 md:my-1 lg:my-2 dark:border-slate-600" />

      <div className="flex gap-2 px-1.5 pb-2 md:gap-4 md:px-2">
        <div className="comment__profile flex shrink-0 justify-center">
          <Like
            key={_id}
            isLiked={isLiked}
            likeCount={likes}
            commentId={_id}
            isRestaurant={isRestaurant}
            refetch={refetch}
          />
        </div>
        <div className="flex-1">
          <p className="text-xs/5 text-slate-500 md:text-sm/6 dark:text-slate-100">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
