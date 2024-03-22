import { SearchBarProps } from "@/common/interface/search";
import { FaSearch } from "react-icons/fa";
import { HiMiniBackspace } from "react-icons/hi2";
import { Tooltip as ReactTooltip } from "react-tooltip";

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, searchHandler }) => {
  const clearSearch = () => setSearch && setSearch("");

  return (
    <form
      className="flex h-[38px] flex-1 gap-2 rounded bg-white px-3 py-1 dark:bg-slate-800"
      onSubmit={e => searchHandler && searchHandler(e)}
    >
      <input
        type="text"
        placeholder="جستجو"
        value={search}
        className="inline-block h-full flex-1 bg-transparent dark:text-white"
        onChange={e => setSearch && setSearch(e.target.value)}
        onKeyUp={e => e.key === "Escape" && clearSearch()}
      />
      <div className="flex gap-2">
        <button
          className="search-btn"
          disabled={search === ""}
          type="reset"
          onClick={clearSearch}
          data-tooltip-id="clear-button"
        >
          <HiMiniBackspace className="size-4 rotate-180" />
          <ReactTooltip className="z-10" id="clear-button" place="bottom" content="Esc" />
        </button>
        <button className="search-btn" disabled={search === ""} type="submit" data-tooltip-id="search-button">
          <FaSearch className="size-4" />
          <ReactTooltip className="z-10" id="search-button" place="bottom" content="Enter" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
