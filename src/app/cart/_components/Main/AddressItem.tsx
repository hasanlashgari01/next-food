import { IAddress } from "@/common/interface/cart-page";
import { useEditAddress, useGetAddressById, useRemoveAddress } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";
import CompletionAddressModal from "./CompletionAddressModal";
import { getAddress } from "@/services/cartService";

interface IProps extends IAddress {
  refetch: () => void;
}

const AddressItem: React.FC<IProps> = ({ _id, detail, title, mobile, refetch }) => {
  const { isLoading, data } = useGetAddressById(_id);
  const { mutateAsync: mutateEdit } = useEditAddress();
  const { mutateAsync: mutateRemove } = useRemoveAddress();
  const [addressInfo, setAddressInfo] = useState({ title: "", detail: "", mobile: "" });
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    if (isShowModal && !isLoading && data) {
      setAddressInfo({ title: data.title, detail: data.detail, mobile: data.mobile });
    }

    // setAddressInfo(data);
  }, [isShowModal]);

  const editAddressHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { message } = await mutateEdit({ id: _id, data: addressInfo });
      setIsShowModal(false);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const removeAddressHandler = async () => {
    try {
      const { message } = await mutateRemove(_id);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="box col-span-2 bg-neutral-100 p-4 transition-colors duration-300 hover:bg-slate-200 xl:col-span-1 dark:bg-slate-800">
      <div className="flex justify-between gap-2">
        <h4 className="h-[72px] w-56 text-xs/6 sm:w-64 lg:h-24 lg:text-base/8">{detail}</h4>
        <div className="flex shrink-0 gap-3 child:h-fit">
          <button onClick={() => setIsShowModal(true)}>
            <HiOutlinePencilAlt className="text-base sm:text-2xl" />
          </button>
          <button onClick={removeAddressHandler}>
            <HiOutlineTrash className="text-base sm:text-2xl" />
          </button>
        </div>
      </div>

      <div className="mt-2 flex justify-between text-xs/6 text-slate-500 lg:text-base/8">
        <span>{title}</span>
        <span>{mobile.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")}</span>
      </div>

      <CompletionAddressModal
        data={addressInfo}
        setData={setAddressInfo}
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        submitHandler={editAddressHandler}
      />
    </div>
  );
};

export default AddressItem;
