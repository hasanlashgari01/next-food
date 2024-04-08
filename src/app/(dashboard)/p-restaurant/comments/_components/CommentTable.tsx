"use client";

import { IComment } from "@/common/interface/comment";
import { IUser } from "@/common/interface/user";
import CommentAction from "@/components/modules/Table/Comment/CommentAction";
import CommentBody from "@/components/modules/Table/Comment/CommentBody";
import CommentRate from "@/components/modules/Table/Comment/CommentRate";
import Table from "@/components/modules/Table/Table";
import TableStatus from "@/components/modules/Table/TableStatus";
import UserInfo from "@/components/modules/Table/UserInfo";
import { useGetUser } from "@/hooks/useAuth";
import { useBanOrUnbanComment, useGetCommentList } from "@/hooks/useRestaurant";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper();

const CommentTable = () => {
  const { data: user } = useGetUser();
  const restaurant: string | undefined = user?.restaurants.at(0);
  const { isLoading, data, refetch } = useGetCommentList(restaurant || "");
  const { mutateAsync } = useBanOrUnbanComment();

  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("body", {
      header: () => <span>متن نظر</span>,
      cell: info => <CommentBody body={info.getValue()} />,
    }),
    columnHelper.accessor("authorId", {
      header: () => <span>کاربر</span>,
      cell: ({ getValue }: { getValue: () => IUser }) => (
        <UserInfo fullName={getValue().fullName || ""} mobile={getValue().mobile} />
      ),
    }),
    columnHelper.accessor("isAccepted", {
      header: () => <span className="w-10">وضعیت</span>,
      cell: info => <TableStatus status={info.getValue()} rejectMsg="تایید نشده" />,
    }),
    columnHelper.accessor("rate", {
      header: () => <span className="w-fit">امتیاز</span>,
      cell: info => <CommentRate rate={info.getValue()} />,
    }),
    columnHelper.accessor("actions", {
      header: () => <span></span>,
      cell: info => {
        let { _id: commentId, isAccepted } = info.row.original as IComment;

        return (
          <CommentAction
            isAccepted={isAccepted}
            commentId={commentId}
            banHandler={(id: string) => changeCommentStatus(id)}
          />
        );
      },
    }),
  ];

  const changeCommentStatus = async (commentId: string) => {
    try {
      const { message } = await mutateAsync(commentId);
      refetch();
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      {!isLoading && <Table columns={columns} count={data?.count} data={data?.comments || []} notFoundMsg="نظری" />}
    </div>
  );
};

export default CommentTable;
