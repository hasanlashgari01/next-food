import Link from "next/link";

interface IEmptyPageProps {
  message: string;
  link?: string;
  linkText?: string;
}

const EmptyPage: React.FC<IEmptyPageProps> = ({ message, link, linkText }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border border-neutral-300 p-4">
      <h4 className="text-xs leading-7 md:text-xl">{message}</h4>
      {link && (
        <Link
          href={link}
          className="btn mx-auto mt-4 inline-flex w-40 border-green-600 text-xs text-green-600 transition-colors duration-300 hover:bg-green-600 hover:text-green-50 md:w-44 md:py-[22px] md:text-base"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default EmptyPage;
