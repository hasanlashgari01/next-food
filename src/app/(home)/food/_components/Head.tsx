import { IFood } from "@/common/interface/food";
import Bookmark from "@/components/modules/Action/Bookmark";
import Like from "@/components/modules/Action/Like";
import Price from "@/components/modules/Food/Price";
import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import Button from "../../../../components/modules/Action/Button";
import { calulatedScore } from "@/utils/func";
import { IMainComment } from "@/common/interface/restaurant";
import { getComment } from "@/server-actions/foodAction";
import ScoreCount from "@/components/modules/Score/ScoreCount";

interface ICommentData {
  count: number;
  comments: IMainComment[];
}

const Head: React.FC<IFood> = async ({ _id, title, description, image, price, discount, isLiked, isBookmarked }) => {
  const { count, comments }: ICommentData = await getComment({ id: _id });

  const score = calulatedScore(comments);

  return (
    <div className="flex flex-col-reverse lg:h-[75dvh] lg:flex-row lg:justify-between">
      <div className="my-20 px-2.5 xs:px-20 lg:w-[512px] lg:px-0">
        <h1 className="text-4xl">{title}</h1>
        <p className="mt-5 line-clamp-4 h-28 w-full leading-7 dark:text-neutral-400">{description}</p>
        <ScoreCount score={isNaN(score) ? 0 : Number(score)} count={count} />
        <div className="flex w-full flex-1 flex-col-reverse gap-5 lg:mt-4 lg:flex-row lg:items-center lg:justify-between">
          <Button foodId={_id} />
          <div className="max-w-fit">
            <Price price={price} discount={discount} className="mt-0.5 text-xl" />
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Like isLiked={isLiked} id={_id} status="food" />
            <Bookmark isBookmarked={isBookmarked} id={_id} status="food" />
          </div>
        </div>
      </div>
      <div className="flex items-center max-lg:mx-auto">
        <div className="h-[450px] max-w-md justify-self-center overflow-hidden rounded-md lg:rounded-xl">
          <Image
            src={image ? `${fileRoute}food/${image}` : "/Auth.png"}
            alt={title}
            width={500}
            height={500}
            className="h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Head;
