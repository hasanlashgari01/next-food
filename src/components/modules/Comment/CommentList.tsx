"use client";

import useLoadMore from "@/hooks/useLoadMore";
import { getComments } from "@/services/restaurantService";
import Empty from "../Error/Empty";
import ThreeDotLoading from "../Loading/ThreeDotLoading";
import Comment from "./Comment";
import CommentMore from "./CommentMore";

interface ICommentData {
  restaurantId: string;
  emptyText: string;
}

const CommentList: React.FC<ICommentData> = ({ restaurantId, emptyText }) => {
  const { isLoading, isFetching, hideButtonMore, data, showMoreHandler } = useLoadMore({
    restaurantId,
    getData: getComments,
  });

  return (
    <>
      <div className="space-y-4 pb-4">
        {!isLoading && data.count > 0 && data?.comments.map(comment => <Comment key={comment._id} {...comment} />)}
        {isLoading && (
          <div className="flex min-h-64 items-center justify-center">
            <ThreeDotLoading />
          </div>
        )}
        {!isLoading && data.count === 0 && <Empty text={emptyText} />}
      </div>
      {!hideButtonMore && <CommentMore isLoading={isFetching} onMore={showMoreHandler} />}
    </>
  );
};

export default CommentList;
