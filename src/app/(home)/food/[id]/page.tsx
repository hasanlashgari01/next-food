import { IFood } from "@/common/interface/food";
import { IMainComment } from "@/common/interface/restaurant";
import CommentListHead from "@/components/modules/Comment/CommentListHead";
import FoodSlider from "@/components/modules/Slider/FoodSlider";
import {
  getComment,
  getFoodById,
  getNewFoodById,
  getPopularFoodById,
  getSimilarFoodById,
} from "@/server-actions/foodAction";
import CommentList from "../_components/CommentList";
import Head from "../_components/Head";

interface IProps {
  params: { id: string };
}

interface ICommentData {
  count: number;
  comments: IMainComment[];
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: { id } }: IProps) {
  const food: IFood = await getFoodById({ id });

  return {
    title: food?.title,
  };
}

const page: React.FC<IProps> = async ({ params: { id } }) => {
  const food: IFood = await getFoodById({ id });
  const { count }: ICommentData = await getComment({ id: food._id });
  const popularFoods = await getPopularFoodById({ id });
  const similarFoods = await getSimilarFoodById({ id });
  const newsFoods = await getNewFoodById({ id });

  return (
    <div>
      <div className="bg-slate-100 py-8 font-Dana dark:bg-slate-900">
        <div className="container">
          <Head {...food} />
          <section className="grid grid-cols-3 gap-4 child:space-y-4">
            <main className="child:restaurant__card col-span-3 lg:col-span-2">
              <div className="space-y-6">
                <CommentListHead foodId={food._id} count={count} />
                <CommentList foodId={food._id} emptyText="نظری برای غذا ثبت نشده" />
              </div>
              {popularFoods.length > 0 && <FoodSlider title="غذا های محبوب" data={popularFoods} />}
              {similarFoods.length > 0 && <FoodSlider title="غذا های مشابه" data={similarFoods} />}
              {newsFoods.length > 0 && <FoodSlider title="جدیدترین ها" data={newsFoods} />}
            </main>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
