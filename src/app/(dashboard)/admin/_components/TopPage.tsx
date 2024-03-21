import { SelectOption } from "@/common/interface/optionSelect";
import { Dispatch, SetStateAction } from "react";
import Select, { PropsValue } from "react-select";
import TopPageRight from "./TopPageRight";
import { SearchBar } from "@/common/interface/search";

interface TopPageProps extends SearchBar {
  readonly options: readonly SelectOption[];
  readonly label?: string;
  title: string;
  placeholder?: string;
  selectedOption: PropsValue<SelectOption>;
  setSelectedOption: Dispatch<SetStateAction<SelectOption>>;
}

const TopPage: React.FC<TopPageProps> = ({
  selectedOption,
  setSelectedOption,
  title,
  placeholder,
  options,
  search,
  setSearch,
  searchHandler,
}) => {
  return (
    <div className="mt-5 flex flex-wrap justify-between gap-4 max-md:flex-col md:items-center">
      <TopPageRight title={title} search={search} setSearch={setSearch} searchHandler={searchHandler} />

      <Select
        className={`text-base md:w-64 dark:text-black`}
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
