interface Props {
  count?: number;
  data?: string;
  message: string;
  children: React.ReactNode;
}

const Box: React.FC<Props> = ({ count, data, message, children }) => {
  return (
    <div className="group flex gap-3 rounded-xl bg-white p-5 font-Dana dark:bg-slate-800">
      <div className="flex w-1/5 justify-center self-center text-white child:rounded-full child:p-1 child:text-5xl child:transition-colors child:duration-300">
        {children}
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-primary-900 md:text-3xl dark:text-primary-300">
          {count !== undefined ? count : data}
        </h3>
        <span className="text-sm text-primary-900 md:text-lg dark:text-primary-300">{message}</span>
      </div>
    </div>
  );
};

export default Box;
