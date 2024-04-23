"use client";

import ThreeDotLoading from "@/components/modules/Loading/ThreeDotLoading";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface IProps {
  onFetchData: () => void;
}

const InfiniteScroll: React.FC<IProps> = ({ onFetchData }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      onFetchData();
    }
  }, [inView]);

  return (
    <div className="mx-auto mt-10 flex flex-1 items-center justify-center">
      <div ref={ref}>
        <ThreeDotLoading />
      </div>
    </div>
  );
};

export default InfiniteScroll;
