import { IMainComment, IMenu, IRestaurant } from "@/common/interface/restaurant";
import Bookmark from "@/components/modules/Action/Bookmark";
import Like from "@/components/modules/Action/Like";
import Food from "@/components/modules/Food/Food";
import { getComment, getRestaurant } from "@/server-actions/restaurantAction";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AsideTop from "../_components/AsideTop";
import Info from "../_components/Info";
import MenuItem from "../_components/MenuItem";
import ModalMoreInfo from "../_components/ModalMoreInfo";
import Comment from "../_components/Comment/Comment";

interface IData {
  menus: IMenu[];
  restaurant: IRestaurant;
}

interface IProps {
  params: { slug: string };
}

interface ICommentData {
  count: number;
  comments: IMainComment[];
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: { slug } }: IProps) {
  const { restaurant }: IData = await getRestaurant({ slug });

  return {
    title: restaurant?.name,
  };
}

const page: React.FC<IProps> = async ({ params: { slug } }) => {
  const { restaurant, menus }: IData = await getRestaurant({ slug });
  if (!restaurant) redirect("/not-found");
  const { count, comments }: ICommentData = await getComment({ id: restaurant._id });

  return (
    <>
      <div className="min-h-dvh py-8 dark:bg-slate-900">
        <div className="container">
          <section className="grid grid-cols-3 gap-4 child:space-y-4">
            {/* Aside */}
            <aside className="child:restaurant__card sticky -top-28 bottom-8 z-10 col-span-3 h-fit font-Dana lg:top-24 lg:col-span-1 max-lg:child:dark:bg-slate-950">
              {/* Information */}
              <div>
                <AsideTop title="مشخصات">
                  <div className="flex gap-2">
                    <Like isLiked={restaurant?.isLiked} id={restaurant._id} status="restaurant" />
                    <Bookmark isBookmarked={restaurant?.isBookmarked} id={restaurant._id} status="restaurant" />
                  </div>
                </AsideTop>
                <div className="flex items-start justify-between gap-4 lg:flex-col">
                  <Info
                    logo={restaurant?.logo}
                    cover={restaurant?.cover}
                    name={restaurant?.name}
                    score={restaurant?.score}
                    count={1}
                  />
                  <ModalMoreInfo {...restaurant} />
                </div>
              </div>
              {/* Menus */}
              <div className="top-80 shadow-lg max-lg:sticky" id="menus">
                <nav className="select-none">
                  <ul className="hideScrollbar flex items-center justify-between gap-4 overflow-x-scroll">
                    {menus.length > 0 ? (
                      menus.map(
                        item =>
                          item.foods.length > 0 && (
                            <MenuItem key={item._id} id={item._id} title={item.title as string} />
                          ),
                      )
                    ) : (
                      <span className="mx-auto">منو وجود ندارد</span>
                    )}
                  </ul>
                </nav>
              </div>
            </aside>
            {/* Main */}
            <main className="child:restaurant__card col-span-3 lg:col-span-2">
              <div className="-z-10">
                <ul id="menu" className="space-y-10">
                  {menus.length > 0 ? (
                    menus.map(
                      item =>
                        item.foods.length > 0 && (
                          <li key={item._id} id={item._id}>
                            <AsideTop title={item.title as string} />
                            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                              {item.foods.map(food => (
                                <Food key={food._id} {...food} />
                              ))}
                            </div>
                          </li>
                        ),
                    )
                  ) : (
                    <div className="p-10 text-center">
                      <span>منو وجود ندارد</span>
                    </div>
                  )}
                </ul>
              </div>
              <div className="space-y-4">
                {count > 0 ? (
                  comments.map(comment => <Comment key={comment._id} {...comment} />)
                ) : (
                  <span className="text-center">نظری برای این رستوران وجود ندارد</span>
                )}
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
