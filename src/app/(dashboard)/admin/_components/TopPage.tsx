import { SelectOption, UsersOption } from "@/common/interface/optionSelect";
import { Dispatch, SetStateAction } from "react";
import Select, { PropsValue } from "react-select";

interface TopPageProps {
  readonly options: readonly SelectOption[];
  readonly label?: string;
  title: string;
  placeholder?: string;
  selectedOption: PropsValue<SelectOption>;
  setSelectedOption: Dispatch<SetStateAction<SelectOption>>;
  children?: React.ReactNode;
}

const TopPage: React.FC<TopPageProps> = ({
  selectedOption,
  setSelectedOption,
  children,
  title,
  placeholder,
  options,
}) => {
  return (
    <div className="mt-5 flex flex-wrap justify-between gap-4 max-md:flex-col md:items-center">
      <div className="flex md:items-center md:gap-5 lg:w-2/5">
        <h1 className="hidden text-2xl xl:inline-block dark:text-white">{title}</h1>
        {children}
      </div>

      <Select
        className={`text-base md:w-64 dark:bg-slate-900`}
        classNamePrefix="react-select"
        placeholder={placeholder ?? title}
        defaultValue={selectedOption}
        onChange={e => setSelectedOption({ value: e!.value, label: e!.label })}
        options={options}
      />
    </div>
  );
};

export default TopPage;
