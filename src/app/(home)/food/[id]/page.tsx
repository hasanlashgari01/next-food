import { IFood } from "@/common/interface/food";
import { getFoodById } from "@/server-actions/foodAction";
import Head from "../_components/Head";

interface IProps {
  params: { id: string };
}

export const dynamic = "force-dynamic";

const page: React.FC<IProps> = async ({ params: { id } }) => {
  const food: IFood = await getFoodById({ id });
  const { _id, title, description, image, price, isLiked, isBookmarked, rate, menuId, category, discount } = food;

  return (
    <div>
      <div className="bg-slate-100 py-8 font-Dana dark:bg-slate-900">
        <div className="container">
          <Head {...food} />
        </div>
      </div>
    </div>
  );
};

export default page;
