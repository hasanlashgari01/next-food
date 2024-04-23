"use client";

import { IRestaurant } from "@/common/interface/restaurant";
import Empty from "@/components/modules/Error/Empty";
import Restaurant from "./Restaurant";
import { useState } from "react";
import { restaurantData } from "@/server-actions/restaurantAction";
import InfiniteScroll from "./InfiniteScroll";

interface IProps {
  initialData: {
    count: number;
    restaurants: IRestaurant[];
  };
  limit: number;
  qs: string;
}

const Main: React.FC<IProps> = ({ initialData, qs, limit }) => {
  const [limitParams, setLimitParams] = useState(limit);
  const [data, setData] = useState(initialData);

  const fetchData = async () => {
    setLimitParams(prev => prev + limit);
    const res = await restaurantData(qs, limitParams);
    setData({ ...res });
  };

  return (
    <main className="col-span-12 h-full lg:col-span-9">
      {data.count > 0 ? (
        <div className="grid grid-cols-6 gap-6 md:gap-8">
          {data.restaurants.map(restaurant => (
            <Restaurant key={restaurant._id} {...restaurant} />
          ))}
        </div>
      ) : (
        <div className="grid h-full place-items-center">
          <Empty text="نتیجه ای یافت نشد" />
        </div>
      )}
      {data.count > 0 && data.count >= limitParams && <InfiniteScroll onFetchData={fetchData} />}
    </main>
  );
};

export default Main;
