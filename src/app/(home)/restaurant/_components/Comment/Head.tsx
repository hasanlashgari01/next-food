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
    <div className="flex items-center justify-between px-2">
      <div className="my-2 flex h-12 shrink-0 gap-4">
        <div className="size-12 shrink-0 overflow-hidden rounded-full p-1 outline outline-2 outline-amber-600">
          <Image
            src={avatar ? `${fileRoute}user/${avatar}` : "/Auth.png"}
            alt=""
            width={100}
            height={100}
            priority
            className="h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="text-base">{fullName}</h3>
          <h6 className="text-sm text-slate-400">{createdAt.toLocaleDateString("fa")}</h6>
        </div>
      </div>

      <div>
        <div className="flex h-fit w-8 flex-col items-center justify-center gap-1">
          <HiOutlineStar className="h-6 w-6 shrink-0 fill-amber-500 stroke-amber-500 transition-colors delay-75 duration-300 ease-linear" />
          <span className="cursor-default text-sm">{rate}</span>
        </div>

        <span></span>
      </div>
    </div>
  );
};

export default Head;
