import SearchBar from "./SearchBar";

interface TopPageRightProps extends SearchBar {
  title: string;
}

const TopPageRight: React.FC<TopPageRightProps> = ({ title, search, setSearch, searchHandler }) => {
  return (
    <div className="flex md:items-center md:gap-5 lg:w-fit xl:px-5">
      <h1 className="hidden flex-1 text-2xl xl:inline-block dark:text-white">{title}</h1>
      {search !== undefined && <SearchBar search={search} setSearch={setSearch} searchHandler={searchHandler} />}
    </div>
  );
};

export default TopPageRight;
