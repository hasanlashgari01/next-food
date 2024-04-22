"use client";

import Slider from "@/components/modules/Slider/Slider";
import { useGetNewRestaurants, useGetPopularRestaurants } from "@/hooks/usePublic";
import { useEffect, useState } from "react";

const Restaurant = () => {
  const provinceLS: { name: string; englishTitle: string } = JSON.parse(localStorage.getItem("province") || "{}");
  const [province, setProvince] = useState(provinceLS.englishTitle || "tehran");
  const { data: popularRestaurants } = useGetPopularRestaurants(province || "tehran");
  const { data: newRestaurants } = useGetNewRestaurants(province || "tehran");

  useEffect(() => {
    setProvince(provinceLS.englishTitle || "tehran");
  }, [localStorage.getItem("province")]);

  return (
    <div className="child:rounded-xl child:bg-slate-100 child:p-3 child:lg:p-6 dark:child:bg-slate-950">
      <Slider title="محبوب ترین رستوران ها" data={popularRestaurants || []} />
      <Slider title="جدیدترین رستوران ها" data={newRestaurants || []} />
    </div>
  );
};

export default Restaurant;
