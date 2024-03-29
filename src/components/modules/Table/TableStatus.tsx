interface TableStatusProps {
  status: boolean;
  acceptMsg?: string;
  rejectMsg?: string;
}

const TableStatus: React.FC<TableStatusProps> = ({ status, acceptMsg = "تایید شده", rejectMsg = "در حال بررسی" }) => {
  return (
    <div className="min-w-28 max-w-fit">
      {status ? (
        <span className="rounded-md bg-green-400/20 px-2.5 py-1 text-xs font-medium text-green-600 sm:text-sm dark:bg-green-600/15 dark:text-green-500">
          {acceptMsg}
        </span>
      ) : (
        <span className="rounded-md bg-amber-400/20 px-2.5 py-1 text-xs font-medium text-amber-600 sm:text-sm dark:bg-amber-600/15 dark:text-amber-500">
          {rejectMsg}
        </span>
      )}
    </div>
  );
};
export default TableStatus;
