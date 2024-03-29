interface Props {
  isLoading?: boolean;
  data?: any[];
  message?: string;
}

const NotFound: React.FC<Props> = ({ isLoading, data, message = "لیست خالی است" }) => {
  return (
    <>
      {!isLoading && data?.length == 0 && (
        <div className="col-span-2 flex min-h-40 w-full flex-col justify-center rounded-2xl text-center outline-dashed outline-2 outline-current md:min-h-72 xl:text-2xl">
          {message}
        </div>
      )}
    </>
  );
};

export default NotFound;
