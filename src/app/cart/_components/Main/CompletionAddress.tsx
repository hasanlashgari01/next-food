import { useAddAddress, useGetAddress } from "@/hooks/useCart";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import EmptyPage from "../EmptyPage";
import AddressItem from "./AddressItem";
import CompletionAddressModal from "./CompletionAddressModal";

const CompletionAddress = () => {
  const { isLoading, data, refetch } = useGetAddress();
  const { mutateAsync: mutateAsyncAddAddress } = useAddAddress();
  const [addressInfo, setAddressInfo] = useState({ title: "", detail: "", mobile: "" });
  const [isShowModal, setIsShowModal] = useState(false);

  const addAddressHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { message } = await mutateAsyncAddAddress(addressInfo);
      setIsShowModal(false);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="p-4 lg:px-6 dark:text-slate-100">
      <div className="flex items-center justify-between text-sm md:text-base">
        <span className="flex gap-1">
          <HiOutlineLocationMarker className="text-2xl" />
          <span>آدرس‌ها</span>
        </span>
        <button className="btn btn-default flex gap-1" onClick={() => setIsShowModal(true)}>
          <HiOutlinePlusCircle className="text-2xl" />
          <span>افزودن آدرس</span>
        </button>
      </div>

      <hr className="mb-4 mt-2 dark:border-slate-700" />

      <div className="min-h-fit lg:min-h-52">
        <div className="grid grid-cols-2 gap-4">
          {!isLoading && data?.address && data.address.length > 0 ? (
            data.address.map(address => <AddressItem key={address._id} {...address} refetch={refetch} />)
          ) : (
            <div className="col-span-2 h-52 child:border-none">
              <EmptyPage message="شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!" />
            </div>
          )}
        </div>
      </div>

      <CompletionAddressModal
        data={addressInfo}
        setData={setAddressInfo}
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        submitHandler={addAddressHandler}
      />
    </div>
  );
};

export default CompletionAddress;
