import { IComment } from "@/common/interface/comment";
import { getCommentById } from "@/services/restaurantService";
import { useState } from "react";
import toast from "react-hot-toast";
import ModalLayout from "../../Modal/ModalLayout";

const CommentBody = ({ body, commentId }: { body: string; commentId: string }) => {
  const [comment, setComment] = useState({} as IComment);
  const [isShow, setIsShow] = useState(false);

  const showCommentModal = async (commentId: string) => {
    setIsShow(true);
    try {
      const res = await getCommentById(commentId);
      setComment(res);
      console.log(comment);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="line-clamp-1 min-w-32 max-w-20 cursor-pointer" onClick={() => showCommentModal(commentId)}>
        {body}
      </div>
      <ModalLayout isShow={isShow} setIsShow={setIsShow} className="h-fit">
        <div>
          <p>{comment?.body}</p>
        </div>
      </ModalLayout>
    </>
  );
};
export default CommentBody;
