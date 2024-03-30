import { ICompletionDelivery } from "@/common/interface/cart-page";
import { completionDeliveryValues } from "@/constants/radioValues";
import { HiOutlineTruck } from "react-icons/hi2";

interface ICompletionDeliveryProps {
  delivery: ICompletionDelivery;
  setDelivery: (delivery: ICompletionDelivery) => void;
}

const CompletionDelivery: React.FC<ICompletionDeliveryProps> = ({ delivery, setDelivery }) => {
  return (
    <div className="grid grid-cols-3 rounded-lg p-4 lg:p-6 xl:grid-cols-4">
      <div className="col-span-3 flex items-center gap-2 lg:w-fit xl:col-span-1 dark:text-slate-100">
        <HiOutlineTruck className="text-2xl" />
        <span className="text-sm leading-8 md:text-base">روش تحویل سفارش</span>
      </div>

      <hr className="col-span-3 mb-4 mt-2 xl:hidden" />

      <div className="col-span-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-4 xl:col-span-3 xl:gap-10">
        {completionDeliveryValues.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="col-span-3 flex items-center gap-2 sm:col-span-2">
              <input
                type="radio"
                name="delivery"
                id={item.value}
                value={item.value}
                checked={delivery.value === item.value}
                className="accent-blue-500"
                onChange={() => setDelivery({ value: item.value, label: item.text })}
              />
              <label
                htmlFor={item.value}
                className="flex flex-1 cursor-pointer items-center gap-1 text-sm md:text-base"
              >
                <div className="flex flex-col child:leading-8">
                  <span className="text-neutral-900 dark:text-slate-100">{item.text}</span>
                  <span className="text-neutral-300 empty:hidden max-lg:hidden dark:text-slate-400">
                    {item?.description}
                  </span>
                </div>
                <Icon className="text-2xl text-neutral-400" />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompletionDelivery;
