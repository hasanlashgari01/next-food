import { IMainComment } from "@/common/interface/restaurant";
import Empty from "../Error/Empty";
import Comment from "./Comment";

interface ICommentData {
  count: number;
  comments: IMainComment[];
  emptyText: string;
}

const CommentList: React.FC<ICommentData> = ({ count, comments, emptyText }) => {
  return (
    <>
      {comments.length > 0 ? (
        comments.map(comment => <Comment key={comment._id} {...comment} />)
      ) : (
        <Empty text={emptyText} svgLink="/no-comment.png" />
      )}
    </>
  );
};

export default CommentList;
