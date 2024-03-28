"use client";

import { ISelectOption } from "@/common/interface/optionSelect";
import { SearchBarProps } from "@/common/interface/search";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import Select, { PropsValue } from "react-select";
import TopPageTitle from "./TopPageTitle";
import SearchBar from "./SearchBar";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface TopPageProps extends SearchBarProps {
  options?: ISelectOption[];
  readonly label?: string;
  title: string;
  placeholder?: string;
  selectedOption?: PropsValue<ISelectOption>;
  setSelectedOption?: Dispatch<SetStateAction<ISelectOption>>;
  link?: string;
  linkText?: string;
  linkStyle?: string;
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
  link,
  linkText,
  linkStyle = "btn-primary",
}) => {
  return (
    <div
      className={twMerge(
        "my-2.5 flex flex-wrap justify-between gap-4 md:items-center",
        `${options && "max-md:flex-col"}`,
      )}
    >
      {/* Right Side */}
      <div className="flex md:items-center lg:w-fit lg:gap-5 xl:px-5">
        <div className="hidden items-center xl:flex xl:gap-4">
          {search === undefined && <span className="size-3 animate-pulse rounded-full bg-cyan-600"></span>}
          <TopPageTitle title={title} />
        </div>
        {search !== undefined && <SearchBar search={search} setSearch={setSearch} searchHandler={searchHandler} />}
      </div>

      {/* Left Side */}
      {options && (
        <Select
          className="text-base md:w-64 dark:text-black"
          classNamePrefix="react-select"
          placeholder={placeholder ?? title}
          defaultValue={selectedOption}
          onChange={e => setSelectedOption && setSelectedOption({ value: e!.value, label: e!.label })}
          options={options}
        />
      )}

      {link && (
        <Link
          href={link}
          className={twMerge("btn h-11", `${linkStyle}`, `${linkText ? "min-w-28" : "w-12 rounded-full p-0"}`)}
        >
          {linkText ? linkText : <HiArrowSmallLeft className="size-5" />}
        </Link>
      )}
    </div>
  );
};

export default TopPage;
