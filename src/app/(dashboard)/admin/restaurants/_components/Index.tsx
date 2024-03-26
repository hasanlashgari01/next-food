"use client";

import { RestaurantsOption, SelectOption } from "@/common/interface/optionSelect";
import { IRestaurant } from "@/common/interface/restaurant";
import { useGetBanRestaurantList, useGetRestaurantList } from "@/hooks/useAdmin";
import React, { useEffect, useState } from "react";
import TopPage from "../../_components/TopPage";
import RestaurantsTable from "./RestaurantsTable";
import { searchRestaurants } from "@/services/adminService";

const options: SelectOption[] = [
  { value: "restaurants", label: "لیست رستوران" },
  { value: "ban-restaurants", label: "لیست رستوران بن شده" },
];

const Index = () => {
  const [selectedOption, setSelectedOption] = useState<RestaurantsOption | SelectOption>({
    value: "restaurants",
    label: "لیست رستوران",
  });
  const { data: restaurantsResult, refetch: refetchRestaurant } = useGetRestaurantList();
  const { data: banRestaurantsResult, refetch: refetchBanRestaurant } = useGetBanRestaurantList();
  const [searchResult, setSearchResult] = useState([] as IRestaurant[]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedOption.value === "restaurants") {
      refetchRestaurant();
    } else if (selectedOption.value === "ban-restaurants") {
      refetchBanRestaurant();
    }
  }, [selectedOption]);

  useEffect(() => {
    if (search === "") {
      refetchRestaurant();
      setSearchResult([]);
    }
  }, [search]);

  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (search !== "") {
      const result = await searchRestaurants(search);
      setSearchResult(result);
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
      <RestaurantsTable
        selectedOption={selectedOption}
        refetchRestaurant={refetchRestaurant}
        refetchBanRestaurant={refetchBanRestaurant}
        restaurants={
          searchResult.length > 0
            ? searchResult
            : selectedOption.value === "restaurants"
              ? restaurantsResult?.restaurants
              : banRestaurantsResult.restaurantsBanned
        }
      />
    </>
  );
};

export default Index;
