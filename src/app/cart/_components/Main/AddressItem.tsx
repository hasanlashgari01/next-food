import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";

const AddressItem = () => {
  return (
    <div className="box col-span-2 bg-neutral-100 p-4 transition-colors duration-300 hover:bg-slate-200 xl:col-span-1 dark:bg-slate-800">
      <div className="flex justify-between gap-2">
        <h4 className="h-[72px] w-56 text-xs/6 sm:w-64 lg:h-24 lg:text-base/8">
          تهران: اقدسیه، بزرگراه ارتش، مجتمع شمیران سنتر، طبقه ۱۰
        </h4>
        <div className="flex shrink-0 gap-3">
          <HiOutlinePencilAlt className="text-base sm:text-2xl" />
          <HiOutlineTrash className="text-base sm:text-2xl" />
        </div>
      </div>

      <div className="mt-2 flex justify-between text-xs/6 text-slate-500 lg:text-base/8">
        <span>محل کار</span>
        <span>۰۹۱۴ ۸۶۴ ۳۳۵۰</span>
      </div>
    </div>
  );
};

export default AddressItem;
