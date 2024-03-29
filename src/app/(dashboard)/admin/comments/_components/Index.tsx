"use client";

import { useGetFoodCommnetList, useGetRestaurantCommnetList } from "@/hooks/useAdmin";
import TopPage from "../../_components/TopPage";
import { ICommentsOption, ISelectOption } from "@/common/interface/optionSelect";
import { useEffect, useState } from "react";
import CommentTable from "./CommentTable";

const options: ISelectOption[] = [
  { value: "restaurantComments", label: "لیست نظرات رستوران" },
  { value: "foodComments", label: "لیست نظرات غذا" },
];

const Index = () => {
  const {
    isLoading: isLoadingRestaurants,
    data: restaurantCommentList,
    refetch: refetchRestaurantsComments,
  } = useGetRestaurantCommnetList();
  const { isLoading: isLoadingFood, data: foodCommentList, refetch: refetchFoodComments } = useGetFoodCommnetList();

  const [selectedOption, setSelectedOption] = useState<ICommentsOption | ISelectOption>({
    value: "restaurantComments",
    label: "لیست نظرات رستوران",
  });

  useEffect(() => {
    if (selectedOption.value === "restaurantComments") {
      refetchRestaurantsComments();
    } else if (selectedOption.value === "foodComments") {
      refetchFoodComments();
    }
  }, [selectedOption]);

  return (
    <>
      {!isLoadingRestaurants && (
        <>
          <TopPage
            title="لیست نظرات"
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <CommentTable
            data={selectedOption.value === "restaurantComments" ? restaurantCommentList : foodCommentList}
            selectedOption={selectedOption}
            refetchRestaurantComments={refetchRestaurantsComments}
            refetchFoodComments={refetchFoodComments}
          />
        </>
      )}
    </>
  );
};

export default Index;
