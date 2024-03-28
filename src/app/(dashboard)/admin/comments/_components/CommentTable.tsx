import { IComment, ICommentsData } from "@/common/interface/comment";
import { ICommentsOption, ISelectOption } from "@/common/interface/optionSelect";
import { IUser } from "@/common/interface/user";
import Table from "@/components/modules/Table/Table";
import TableStatus from "@/components/modules/Table/TableStatus";
import { useBanOrUnbanFoodComment, useBanOrUnbanRestaurantComment } from "@/hooks/useAdmin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { HiArchive } from "react-icons/hi";

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
  const { mutateAsync: mutateAsyncBanOrUnbanRestaurantComment } = useBanOrUnbanRestaurantComment();
  const isRestaurant: boolean = selectedOption.value === "restaurantComments";

  const columns: ColumnDef<unknown, never>[] = [
    columnHelper.accessor("body", {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>متن نظر</span>,
    }),
    columnHelper.accessor("authorId", {
      header: () => <span>کاربر</span>,
      cell: ({ getValue }: { getValue: () => IUser }) => (
        <div className="flex w-fit flex-col gap-1">
          <span>{getValue()?.fullName}</span>
          <span>{getValue()?.mobile.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")}</span>
        </div>
      ),
    }),
    columnHelper.accessor(isRestaurant ? "restaurantId" : "foodId", {
      header: () => <span>{isRestaurant ? "رستوران" : "غذا"}</span>,
      cell: ({ getValue }: { getValue: () => IComment["restaurantId"] & IComment["foodId"] }) => {
        return (
          <div className="flex w-fit flex-col gap-1">
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
        let { _id: commentId } = info.row.original as IComment;

        return (
          <div className="flex w-fit flex-col gap-1">
            <span onClick={() => banHandler(commentId)}>
              <HiArchive />
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

  return (
    <div>
      <Table columns={columns} count={data?.count} data={data?.comments || []} notFoundMsg={"هیچ نظری یافت نشد"} />
    </div>
  );
};

export default CommentTable;
