import Link from "next/link";

type TRoute = "admin" | "p-restaurant";

const OrderId = ({ id, route }: { id: string; route: TRoute }) => {
  return (
    <div className="line-clamp-1 w-20 overflow-hidden">
      <Link href={`/${route}/orders/${id}`}>{id}</Link>
    </div>
  );
};

export default OrderId;
