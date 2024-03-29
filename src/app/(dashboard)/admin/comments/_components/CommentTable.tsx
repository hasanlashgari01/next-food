import { IComment, ICommentsData } from "@/common/interface/comment";
import { ICommentsOption, ISelectOption } from "@/common/interface/optionSelect";
import { IUser } from "@/common/interface/user";
import Table from "@/components/modules/Table/Table";
import TableStatus from "@/components/modules/Table/TableStatus";
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
      cell: info => <div className="line-clamp-1 min-w-32 max-w-20">{info.getValue()}</div>,
    }),
    columnHelper.accessor("authorId", {
      header: () => <span>کاربر</span>,
      cell: ({ getValue }: { getValue: () => IUser }) => (
        <div className="flex w-fit min-w-32 flex-col gap-1">
          <span>{getValue()?.fullName}</span>
          <span>{getValue()?.mobile.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")}</span>
        </div>
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
      cell: info => <span className="w-96">{info.getValue() ? info.getValue() : 0}</span>,
    }),
    columnHelper.accessor("actions", {
      header: () => <span></span>,
      cell: info => {
        let { _id: commentId, isAccepted } = info.row.original as IComment;

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
            <span
              className="table-btn bg-red-300 dark:bg-red-500"
              onClick={() => banUserAndRejectCommentHandler(commentId)}
            >
              <HiNoSymbol />
            </span>
          </div>
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
      <Table columns={columns} count={data?.count} data={data?.comments || []} notFoundMsg={"هیچ نظری یافت نشد"} />
    </div>
  );
};

export default CommentTable;
