import { IRadioValues, TPaymentRadio } from "@/constants/radioValues";

interface IRadioData {
  data: IRadioValues<any, any>[];
  radio: { value: string; label: string };
  setRadio: (data: any) => void;
  name: TPaymentRadio;
  icon: any;
  title: string;
}

const SelectRadio: React.FC<IRadioData> = ({ data, radio, setRadio, name, icon, title }) => {
  const Icon = icon;

  return (
    <div className="grid grid-cols-3 rounded-lg p-4 lg:p-6 xl:grid-cols-4">
      <div className="col-span-3 flex items-center gap-1 lg:w-fit lg:gap-2 xl:col-span-1 dark:text-slate-100">
        <Icon className="text-2xl" />
        <span className="text-sm leading-8 md:text-base">{title}</span>
      </div>

      <hr className="col-span-3 mb-4 mt-2 xl:hidden" />

      <div className="col-span-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-4 xl:col-span-3 xl:gap-10">
        {data.map(item => {
          const Icon = item.icon;

          return (
            <div key={item.id} className="col-span-3 flex items-center gap-2 sm:col-span-2">
              <input
                type="radio"
                name={name}
                id={item.value.toLowerCase()}
                value={item.value}
                checked={radio.value === item.value}
                className="accent-blue-500"
                onChange={() => setRadio({ value: item.value, label: item.text })}
              />
              <label
                htmlFor={item.value.toLowerCase()}
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

export default SelectRadio;
