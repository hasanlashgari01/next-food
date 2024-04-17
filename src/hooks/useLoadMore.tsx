import { IMainComment } from "@/common/interface/restaurant";
import { useEffect, useState } from "react";

interface IUseLoadMore {
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
  hideButtonMore: boolean;
  data: { count: number; comments: IMainComment[] };
  prevPageHandler: () => void;
  nextPageHandler: () => void;
  showMoreHandler: () => void;
  refetch: () => void;
}

const useLoadMore = ({
  defaultPage = 1,
  defaultLimit = 5,
  defaultHideButton = false,
  getData,
  restaurantId,
  foodId,
}: {
  defaultPage?: number;
  defaultLimit?: number;
  defaultHideButton?: boolean;
  getData: any;
  restaurantId?: string;
  foodId?: string;
}): IUseLoadMore => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(defaultPage);
  const [limit, setLimit] = useState(defaultLimit);
  const [hideButtonMore, setHideButtonMore] = useState(defaultHideButton);
  const [data, setData] = useState<{ count: number; comments: IMainComment[] }>({ count: 0, comments: [] });

  useEffect(() => {
    fetchData();
  }, [limit]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setIsFetching(true);
    const res = await getData(restaurantId || foodId, page, limit);
    setData(res);
    setIsLoading(false);
    setIsFetching(false);
    if (res.count >= 0 && limit >= res.count) {
      setHideButtonMore(true);
    }
  };

  const refetch = () => fetchData();

  const prevPageHandler = () => setPage(prev => prev - 1);
  const nextPageHandler = () => setPage(prev => prev + 1);
  const showMoreHandler = () => setLimit(prev => prev + 5);

  return {
    isLoading,
    isFetching,
    page,
    limit,
    hideButtonMore,
    data,
    prevPageHandler,
    nextPageHandler,
    showMoreHandler,
    refetch,
  };
};

export default useLoadMore;
