import ScoreCount, { IScoreCount } from "@/components/modules/Score/ScoreCount";
import { fileRoute } from "@/services/routeService";
import Image from "next/image";

export interface IInfoProps extends IScoreCount {
  logo: string;
  cover: string;
  name: string;
}

const Info: React.FC<IInfoProps> = ({ logo, cover, name, score, count }) => {
  const logoUrl = logo || cover;

  return (
    <div className="flex gap-4">
      <div className="size-20 overflow-hidden rounded-lg bg-neutral-200">
        <Image
          src={logoUrl ? `${fileRoute}restaurant/${logoUrl}` : "/Auth.png"}
          alt={name}
          width={100}
          height={100}
          priority
          className="w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between py-3.5 md:py-3">
        <ScoreCount score={score} count={count} />
        <h3 className="font-Dana text-base md:text-lg">{name}</h3>
      </div>
    </div>
  );
};

export default Info;
