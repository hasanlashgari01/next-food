"use client";

import { RestaurantsOption, SelectOption } from "@/common/interface/optionSelect";
import { Restaurant } from "@/common/interface/restaurant";
import { api } from "@/config/axiosConfig";
import React, { useEffect, useState } from "react";
import TopPage from "../../_components/TopPage";
import RestaurantsTable from "./RestaurantsTable";

const options: SelectOption[] = [
  { value: "restaurants", label: "لیست رستوران" },
  { value: "ban-restaurants", label: "لیست رستوران بن شده" },
];

const Index = () => {
  const [selectedOption, setSelectedOption] = useState<RestaurantsOption | SelectOption>({
    value: "restaurants",
    label: "لیست رستوران",
  });
  const [restaurantList, setRestaurantList] = useState([] as Restaurant[]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedOption.value === "restaurants") {
      api(`/admin/restaurant`).then(({ data }) => setRestaurantList(data.restaurants));
    } else if (selectedOption.value === "ban-restaurants") {
      api(`/admin/restaurant/banned`).then(({ data }) => setRestaurantList(data.restaurantsBanned));
    }
  }, [selectedOption]);

  useEffect(() => {
    if (search === "") {
      api(`/admin/restaurant`).then(({ data }) => setRestaurantList(data.restaurants));
    }
  }, [search]);

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (search !== "") {
      api.post(`/search/restaurant`, { name: search }).then(({ data }) => setRestaurantList(data.result));
    }
  };

  return (
    <>
      <TopPage
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        title="لیست رستوران"
        options={options}
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
      />
      <RestaurantsTable restaurants={restaurantList ?? []} />
    </>
  );
};

export default Index;
