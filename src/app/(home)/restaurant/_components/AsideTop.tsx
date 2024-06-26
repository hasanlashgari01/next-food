interface AsideTopProps {
  title: string;
  isShow?: boolean;
  children?: React.ReactNode;
}

const AsideTop: React.FC<AsideTopProps> = ({ title, isShow = true, children }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="md:text-xl">
          <span className="dark:text-slate-300">{title}</span>
        </h3>
        <div className="relative">{children}</div>
      </div>
      <hr className="mb-3 mt-1.5 border-slate-100 lg:mb-6 lg:mt-3 dark:border-slate-700" />
    </>
  );
};

export default AsideTop;
