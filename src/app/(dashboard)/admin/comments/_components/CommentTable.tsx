import { IComment, ICommentsData } from "@/common/interface/comment";
import { ICommentsOption, ISelectOption } from "@/common/interface/optionSelect";
import { IUser } from "@/common/interface/user";
import CommentAction from "@/components/modules/Table/Comment/CommentAction";
import CommentBody from "@/components/modules/Table/Comment/CommentBody";
import CommentRate from "@/components/modules/Table/Comment/CommentRate";
import Table from "@/components/modules/Table/Table";
import TableStatus from "@/components/modules/Table/TableStatus";
import UserInfo from "@/components/modules/Table/UserInfo";
import {
  useBanOrUnbanFoodComment,
  useBanOrUnbanRestaurantComment,
  useBanUserAndRejectFoodComment,
  useBanUserAndRejectRestaurantComment,
} from "@/hooks/useAdmin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { HiNoSymbol, HiShieldCheck, HiShieldExclamation } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface ITableProps {
  data: ICommentsData | undefined;
  selectedOption: ICommentsOption | ISelectOption;
  refetchRestaurantComments: () => void;
  refetchFoodComments: () => void;
}

const columnHelper = createColumnHelper();

const CommentTable: React.FC<ITableProps> = ({
  data,
  selectedOption,
  refetchRestaurantComments,
  refetchFoodComments,
}) => {
  const { mutateAsync: mutateAsyncBanOrUnbanFoodComment } = useBanOrUnbanFoodComment();
  const { mutateAsync: mutateAsyncBanUserAndRejectFoodComment } = useBanUserAndRejectFoodComment();
  const { mutateAsync: mutateAsyncBanOrUnbanRestaurantComment } = useBanOrUnbanRestaurantComment();
  const { mutateAsync: mutateAsyncBanUserAndRejectRestaurantComment } = useBanUserAndRejectRestaurantComment();
  const isRestaurant: boolean = selectedOption.value === "restaurantComments";

  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("body", {
      header: () => <span>متن نظر</span>,
      cell: info => {
        const { _id: commentId } = info.row.original as IComment;
        return <CommentBody body={info.getValue()} commentId={commentId} />;
      },
    }),
    columnHelper.accessor("authorId", {
      header: () => <span>کاربر</span>,
      cell: ({ getValue }: { getValue: () => IUser }) => (
        <UserInfo fullName={getValue().fullName || ""} mobile={getValue().mobile} />
      ),
    }),
    columnHelper.accessor(isRestaurant ? "restaurantId" : "foodId", {
      header: () => <span>{isRestaurant ? "رستوران" : "غذا"}</span>,
      cell: ({ getValue }: { getValue: () => IComment["restaurantId"] & IComment["foodId"] }) => {
        return (
          <div className="flex w-fit min-w-32 flex-col gap-1">
            <span>{isRestaurant ? getValue()?.name : getValue()?.title}</span>
            <span className="empty:hidden">
              {isRestaurant && getValue()?.phone.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")}
            </span>
          </div>
        );
      },
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
            banHandler={banHandler}
            banUserAndRejectCommentHandler={banUserAndRejectCommentHandler}
          />
        );
      },
    }),
  ];

  const banHandler = async (commentId: string) => {
    try {
      let msg: string = "";
      if (isRestaurant) {
        const { message } = await mutateAsyncBanOrUnbanRestaurantComment(commentId);
        refetchRestaurantComments();
        msg = message;
      } else {
        const { message } = await mutateAsyncBanOrUnbanFoodComment(commentId);
        refetchFoodComments();
        msg = message;
      }
      toast.success(msg);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const banUserAndRejectCommentHandler = async (commentId: string) => {
    try {
      let msg: string = "";
      if (isRestaurant) {
        const { message } = await mutateAsyncBanUserAndRejectRestaurantComment(commentId);
        refetchRestaurantComments();
        msg = message;
      } else {
        const { message } = await mutateAsyncBanUserAndRejectFoodComment(commentId);
        refetchFoodComments();
        msg = message;
      }
      toast.success(msg);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <Table columns={columns} count={data?.count} data={data?.comments || []} notFoundMsg="نظری" />
    </div>
  );
};

export default CommentTable;
