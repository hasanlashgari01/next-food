"use client";

import Comment from "@/components/modules/Comment/Comment";
import CommentMore from "@/components/modules/Comment/CommentMore";
import Empty from "@/components/modules/Error/Empty";
import ThreeDotLoading from "@/components/modules/Loading/ThreeDotLoading";
import useLoadMore from "@/hooks/useLoadMore";
import { getComments } from "@/services/foodService";

interface ICommentData {
  foodId: string;
  emptyText: string;
}

const CommentList: React.FC<ICommentData> = ({ foodId, emptyText }) => {
  const { isLoading, isFetching, hideButtonMore, data, showMoreHandler, refetch } = useLoadMore({
    foodId,
    getData: getComments,
  });

  return (
    <>
      <div className="space-y-4 pb-4">
        {!isLoading &&
          data.count > 0 &&
          data?.comments.map(comment => (
            <Comment key={comment._id} {...comment} isRestaurant={false} refetch={refetch} />
          ))}
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
