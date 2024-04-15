import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import { HiOutlineStar } from "react-icons/hi2";

interface IHeadProps {
  avatar: string;
  fullName: string;
  createdAt: Date;
  rate: number;
}

const Head: React.FC<IHeadProps> = ({ avatar, fullName, createdAt, rate }) => {
  return (
    <div className="flex items-center justify-between px-1 font-Dana md:px-2">
      <div className="mt-1 flex shrink-0 items-center gap-2.5 md:gap-4">
        <div className="comment__profile shrink-0 overflow-hidden rounded-full p-0.5 outline outline-2 outline-amber-600">
          <Image
            src={avatar ? `${fileRoute}user/${avatar}` : "/Auth.png"}
            alt=""
            width={100}
            height={100}
            priority
            className="h-full rounded-full object-cover"
          />
        </div>
        <div className="comment__box-rate">
          <h3 className="leading-5 max-md:text-sm md:leading-6">{fullName}</h3>
          <h6 className="font-Dana-Regular text-xs text-slate-400 sm:text-sm">{createdAt.toLocaleDateString("fa")}</h6>
        </div>
      </div>

      <div>
        <div className="comment__box-rate h-fit w-8 items-center">
          <HiOutlineStar className="size-5 shrink-0 fill-amber-500 stroke-amber-500 transition-colors delay-75 duration-300 ease-linear md:size-6" />
          <span className="cursor-default text-xs md:text-sm">{rate}</span>
        </div>

        <span></span>
      </div>
    </div>
  );
};

export default Head;
