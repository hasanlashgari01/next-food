import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface IProps {
  showText?: boolean;
  showImage?: boolean;
  text?: string;
  svgLink?: string;
  height?: string;
}

const Empty: React.FC<IProps> = ({ showText = true, text, showImage = true, svgLink = "/empty.webp", height }) => {
  return (
    <div
      className={twMerge("relative flex flex-col items-center justify-center gap-5", height ? height : "min-h-[50dvh]")}
    >
      {showImage && (
        <div className="size-64">
          <Image src={svgLink} alt="empty" width={1000} height={1000} priority className="h-full object-cover" />
        </div>
      )}
      {showText && <span className="z-0 text-center font-Dana text-base text-amber-500 md:text-xl">{text}</span>}
    </div>
  );
};
export default Empty;
