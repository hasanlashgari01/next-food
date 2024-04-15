import { IMainComment } from "@/common/interface/restaurant";
import Head from "./Head";
import Like from "./Like";

interface ICommentProps extends IMainComment {
  isLiked?: boolean;
}

const Comment: React.FC<ICommentProps> = ({ isLiked = false, _id, authorId, rate, likes, body, createdAt }) => {
  return (
    <div className="space-y-4 rounded-lg p-2 font-Dana dark:bg-slate-700">
      <Head
        avatar={authorId?.avatarUrl}
        fullName={authorId?.fullName as string}
        createdAt={new Date(createdAt)}
        rate={rate}
      />

      <hr className="border-slate-300 dark:border-slate-600" />

      <div className="flex gap-4 p-2 pt-0">
        <div className="flex shrink-0 basis-12 justify-center pt-1">
          <Like isLiked={isLiked} likeCount={likes} commentId={_id} />
        </div>
        <div className="flex-1">
          <p className="leading-7 text-slate-100 max-md:text-sm/6">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
