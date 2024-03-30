import { ICart } from "@/common/interface/cart";
import CartItem from "./CartItem";
import { IData } from "@/common/interface/getData";

const CartList: React.FC<IData<ICart>> = ({ isLoading, data, refetch }) => {
  return (
    <div className="box flex max-h-[554px] flex-col gap-1 overflow-y-auto sm:p-6 md:gap-4">
      {data &&
        data.foods?.map(food => (
          <>
            <CartItem isLoading={isLoading} key={food._id} data={food} refetch={refetch} />
            <hr className="sm:hidden dark:border-slate-700" />
          </>
        ))}
    </div>
  );
};

export default CartList;
