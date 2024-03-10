"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface Province {
  _id: string;
  name: string;
  englishTitle: string;
}

interface Restaurant {
  _id: string;
  name: string;
  score: string;
}

const PanelAdmin = () => {
  const [cookie, setCookie] = useCookies(["user_province"]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    getRestaurants(cookie.user_province);
  }, [cookie.user_province]);

  const changeProvince = (province: string) => {
    setCookie("user_province", province);
  };

  const getProvinces = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/province`)
      .then(res => res.json())
      .then(data => setProvinces(data.provinces));

    return data;
  };

  const getRestaurants = async (province: string) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/home/list/restaurants/best?province=${province}`)
      .then(res => res.json())
      .then(data => setRestaurants(data.restaurants));

    return data;
  };

  return (
    <div className="pt-6 pr-6 2xl:px-8">
      <h1>ادمین</h1>
      <ul>
        {provinces.map(province => (
          <li key={province._id} onClick={() => changeProvince(province.englishTitle)}>
            {province.name}
          </li>
        ))}
        <hr />
        {restaurants ? (
          restaurants.map(restaurant => <li key={restaurant._id}>{restaurant.name}</li>)
        ) : (
          <h1>در حال بارگذاری</h1>
        )}
      </ul>
    </div>
  );
};

export default PanelAdmin;
