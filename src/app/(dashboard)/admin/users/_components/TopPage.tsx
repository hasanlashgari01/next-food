import Select, { PropsValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface TopPageProps {
  readonly options: readonly Option[];
  readonly label?: string;
  selectedOption: PropsValue<Option>;
  setSelectedOption: React.Dispatch<React.SetStateAction<PropsValue<Option>>>;
  children?: React.ReactNode;
}

const options: Option[] = [
  { value: "users", label: "لیست کاربران" },
  { value: "ban-users", label: "لیست کاربران بن شده" },
  { value: "active-users", label: "لیست کاربران فعال" },
];

const TopPage: React.FC<TopPageProps> = ({ selectedOption, setSelectedOption, children }) => {
  return (
    <div className="mt-5 flex flex-wrap justify-between gap-4 max-md:flex-col md:items-center">
      <div className="flex md:items-center md:gap-5 lg:w-2/5">
        <h1 className="hidden text-2xl xl:inline-block dark:text-white">لیست کاربران</h1>
        {children}
      </div>

      <Select
        className={`text-base md:w-64 dark:bg-slate-900`}
        classNamePrefix="react-select"
        placeholder="لیست کاربران"
        defaultValue={selectedOption}
        onChange={e => setSelectedOption(e?.label ? { value: e.value, label: e.label } : e)}
        options={options}
      />
    </div>
  );
};

export default TopPage;
