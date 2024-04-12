import { IMenu, IRestaurant } from "@/common/interface/restaurant";
import Food from "@/components/modules/Food/Food";
import { getRestaurant } from "@/server-actions/restaurantAction";
import AsideTop from "../_components/AsideTop";
import Info from "../_components/Info";
import MenuItem from "../_components/MenuItem";
import ModalMoreInfo from "../_components/ModalMoreInfo";
import Like from "@/components/modules/Action/Like";
import Bookmark from "@/components/modules/Action/Bookmark";
import { Toaster } from "react-hot-toast";

interface IData {
  menu: IMenu[];
  restaurant: IRestaurant;
}

interface IProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: { slug } }: IProps) {
  const { restaurant }: IData = await getRestaurant({ slug });

  return {
    title: restaurant.name,
  };
}

const page: React.FC<IProps> = async ({ params: { slug } }) => {
  const { restaurant, menu }: IData = await getRestaurant({ slug });

  return (
    <>
      <div className="min-h-dvh py-8 dark:bg-slate-900">
        <div className="container">
          <section className="grid grid-cols-3 gap-4 child:space-y-4">
            <aside className="child:restaurant__card sticky -top-40 bottom-8 col-span-3 h-fit font-Dana lg:top-8 lg:col-span-1 max-lg:child:dark:bg-slate-950">
              <div>
                <AsideTop title="مشخصات">
                  <div className="flex gap-2">
                    <Like isLiked={restaurant.isLiked} id={restaurant._id} status="restaurant" />
                    <Bookmark isBookmarked={restaurant.isBookmarked} id={restaurant._id} status="restaurant" />
                  </div>
                </AsideTop>
                <div className="flex items-start justify-between gap-4 lg:flex-col">
                  <Info
                    logo={restaurant.logo}
                    cover={restaurant.cover}
                    name={restaurant.name}
                    score={restaurant.score}
                    count={1}
                  />
                  <ModalMoreInfo {...restaurant} />
                </div>
              </div>
              <div className="sticky top-8 shadow-lg backdrop-blur-2xl">
                <AsideTop title="منو" />
                <nav className="select-none">
                  <ul className="hideScrollbar flex items-center justify-between gap-4 overflow-x-scroll">
                    {menu.map(item => (
                      <MenuItem key={item._id} id={item._id} title={item.title as string} />
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
            <main className="child:restaurant__card col-span-3 lg:col-span-2">
              <div>
                <ul id="menu" className="space-y-10">
                  {menu.map(item => (
                    <li key={item._id} id={item._id}>
                      <AsideTop title={item.title as string} />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-6">
                        {item.foods.map(food => (
                          <Food key={food._id} {...food} />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </main>
          </section>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default page;
