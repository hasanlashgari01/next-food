import { IMainComment, IMenu, IRestaurant } from "@/common/interface/restaurant";
import Bookmark from "@/components/modules/Action/Bookmark";
import Like from "@/components/modules/Action/Like";
import CommentList from "@/components/modules/Comment/CommentList";
import Empty from "@/components/modules/Error/Empty";
import { getComment, getRestaurant } from "@/server-actions/restaurantAction";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AsideTop from "../_components/AsideTop";
import FoodList from "../_components/FoodList";
import Info from "../_components/Info";
import MenuItem from "../_components/MenuItem";
import ModalMoreInfo from "../_components/ModalMoreInfo";
import CommentListHead from "@/components/modules/Comment/CommentListHead";
import { calulatedScore } from "@/utils/func";
import { twMerge } from "tailwind-merge";

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

  const score = calulatedScore(comments);

  return (
    <>
      <div className="min-h-dvh bg-slate-100 py-8 dark:bg-slate-900">
        <div className="container">
          <section className="grid grid-cols-3 gap-4 child:space-y-4">
            {/* Aside */}
            <aside
              className={twMerge(
                "child:restaurant__card sticky bottom-8 z-10 col-span-3 h-fit font-Dana lg:top-24 lg:order-1 lg:col-span-1 max-lg:child:dark:bg-slate-950",
                menus.length > 0 && "-top-28",
              )}
            >
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
                    score={isNaN(score) ? 0 : Number(score)}
                    count={comments.length}
                  />
                </div>
              </div>
              {/* Menus */}
              <div className="shadow-lg max-lg:sticky" id="menus">
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
                      <Empty showImage={false} height="h-full mx-auto text-center" text="منو یافت نشد" />
                    )}
                  </ul>
                </nav>
              </div>
            </aside>
            {/* Main */}
            <main className="child:restaurant__card col-span-3 lg:col-span-2">
              <FoodList menus={menus} />
              <div className="space-y-6">
                <CommentListHead restaurantId={restaurant._id} count={count} />
                <div className="space-y-4">
                  <CommentList count={count} comments={comments} emptyText="نظری برای رستوران ثبت نشده" />
                </div>
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
