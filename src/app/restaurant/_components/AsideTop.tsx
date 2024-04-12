interface AsideTopProps {
  title: string;
  children?: React.ReactNode;
}

const AsideTop: React.FC<AsideTopProps> = ({ title, children }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xl">
          <span className="animate-pulse"></span>
          <span className="dark:text-slate-300">{title}</span>
        </h3>
        <div>{children}</div>
      </div>
      <hr className="mb-3 mt-1.5 border-slate-300 lg:mb-6 lg:mt-3 dark:border-slate-700" />
    </>
  );
};

export default AsideTop;
