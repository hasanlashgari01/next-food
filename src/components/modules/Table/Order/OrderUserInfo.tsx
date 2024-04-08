const OrderUserInfo = ({ fullName, mobile }: { fullName: string; mobile: string }) => {
  return (
    <div className="flex w-fit min-w-32 flex-col gap-1">
      <span>{fullName}</span>
      <span>{mobile.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")}</span>
    </div>
  );
};

export default OrderUserInfo;
