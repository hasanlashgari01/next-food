import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import AddressItem from "./AddressItem";

const CompletionAddress = () => {
  return (
    <div className="p-4 lg:px-6">
      <div className="flex items-center justify-between text-sm md:text-base">
        <span className="flex gap-1">
          <HiOutlineLocationMarker className="text-2xl" />
          <span>آدرس‌ها</span>
        </span>
        <button className="btn btn-default flex gap-1">
          <HiOutlinePlusCircle className="text-2xl" />
          <span>افزودن آدرس</span>
        </button>
      </div>

      <hr className="mb-4 mt-2" />

      <div className="min-h-fit lg:max-h-52">
        {/* {[].length > 0 ? [] : <EmptyPage message="شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!" />} */}
        <div className="grid grid-cols-2 gap-4">
          <AddressItem />
          <AddressItem />
        </div>
      </div>
    </div>
  );
};

export default CompletionAddress;
