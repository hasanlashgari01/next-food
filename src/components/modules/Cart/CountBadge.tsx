const CountBadge = ({ count = 0 }) => {
  return (
    <span className="absolute bottom-0 right-0 flex min-h-5 min-w-5 items-center justify-center rounded-md bg-sky-600/80 px-1.5 text-xs text-white">
      {count}
    </span>
  );
};

export default CountBadge;
