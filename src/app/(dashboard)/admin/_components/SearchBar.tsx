import { FaSearch } from "react-icons/fa";
import { HiMiniBackspace } from "react-icons/hi2";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
  searchHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, searchHandler }) => {
  const clearSearch = () => setSearch("");

  return (
    <form
      className="flex h-[38px] flex-1 gap-2 rounded bg-white px-3 py-1 dark:bg-slate-800"
      onSubmit={e => searchHandler(e)}
    >
      <input
        type="text"
        placeholder="جستجو"
        value={search}
        className="inline-block h-full flex-1 bg-transparent text-white"
        onChange={e => setSearch(e.target.value)}
        onKeyUp={e => e.key === "Escape" && clearSearch()}
      />
      <div className="flex gap-2">
        <button
          className="flex aspect-square w-fit shrink-0 items-center justify-center rounded-md bg-sky-700 text-black transition-colors disabled:cursor-not-allowed disabled:bg-sky-700/50 dark:text-white"
          disabled={search === ""}
          onClick={() => clearSearch()}
          type="reset"
          data-tooltip-id="clear-button"
        >
          <HiMiniBackspace className="size-4 rotate-180" />
          <ReactTooltip className="z-10" id="clear-button" place="bottom" content="Esc" />
        </button>
        <button
          className="flex aspect-square w-fit shrink-0 items-center justify-center rounded-md bg-sky-700 text-black transition-colors disabled:cursor-not-allowed disabled:bg-sky-700/50 dark:text-white"
          disabled={search === ""}
          type="submit"
          data-tooltip-id="search-button"
        >
          <FaSearch className="size-4" />
          <ReactTooltip className="z-10" id="search-button" place="bottom" content="Enter" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
