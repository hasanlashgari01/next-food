import { ICart } from "@/common/interface/cart";

interface Props {
  data: ICart;
  refetch: () => void;
}

const CartList: React.FC<Props> = ({ data, refetch }) => {
  return <div className="flex h-full flex-col overflow-y-auto rounded-lg border border-neutral-300 p-6"></div>;
};

export default CartList;
