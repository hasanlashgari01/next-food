import { restaurantData } from "@/server-actions/restaurantAction";
import queryString from "query-string";
import { cookies } from "next/headers";
import Aside from "./_components/Aside";
import Main from "./_components/Main";

export const revalidate = 0;

const INITIAL_NUMBER_OF_USERS = 10;

const Search = async ({ searchParams }: { searchParams: { q: string } }) => {
  const province = cookies().get("province")?.value;
  const search = { ...searchParams, province };
  const data = await restaurantData(queryString.stringify(search), INITIAL_NUMBER_OF_USERS);

  return (
    <div className="container mb-5 mt-10">
      <section className="grid min-h-[80vh] grid-cols-12 max-lg:gap-y-8 lg:gap-x-8">
        <Aside />

        <Main initialData={data} qs={queryString.stringify(search)} limit={INITIAL_NUMBER_OF_USERS} />
      </section>
    </div>
  );
};

export default Search;
