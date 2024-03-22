import {
  addDiscount,
  addNewCategory,
  banOrUnbanRestaurant,
  banOrUnbanUser,
  getBanRestaurants,
  getBanUsers,
  getCategories,
  getCategory,
  getDashboard,
  getDiscounts,
  getRestaurants,
  getUsers,
  removeDiscount,
  updateCategory,
  updateValidRestaurant,
} from "@/services/adminService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetDashboard = () => useQuery({ queryKey: ["admin-dashboard"], queryFn: getDashboard });

const useGetUserList = () => useQuery({ queryKey: ["users"], queryFn: getUsers });

const useGetBanUserList = () => useQuery({ queryKey: ["ban-users"], queryFn: getBanUsers });

const useBanOrUnbanUser = () => useMutation({ mutationFn: banOrUnbanUser });

// * Restaurant

const useGetRestaurantList = () => useQuery({ queryKey: ["restaurants"], queryFn: getRestaurants });

const useGetBanRestaurantList = () => useQuery({ queryKey: ["ban-restaurants"], queryFn: getBanRestaurants });

const useBanOrUnbanRestaurant = () => useMutation({ mutationFn: banOrUnbanRestaurant });

const useUpdateValidRestaurant = () => useMutation({ mutationFn: updateValidRestaurant });

// * Category

const useGetCategoryList = () => useQuery({ queryKey: ["categories"], queryFn: getCategories });

const useAddCategory = () => useMutation({ mutationFn: addNewCategory });

const useGetCategory = (id: string) => useQuery({ queryKey: ["category", id], queryFn: () => getCategory(id) });

const useUpdateCategory = () => useMutation({ mutationFn: updateCategory });

// * Discount

const useGetDiscountList = () => useQuery({ queryKey: ["discounts"], queryFn: getDiscounts });

const useAddDiscount = () => useMutation({ mutationFn: addDiscount });

const useRemoveDiscount = () => useMutation({ mutationFn: removeDiscount });

export {
  useAddCategory,
  useGetCategoryList,
  useGetDashboard,
  useGetUserList,
  useGetBanUserList,
  useBanOrUnbanUser,
  useUpdateCategory,
  useGetCategory,
  useGetDiscountList,
  useAddDiscount,
  useRemoveDiscount,
  useGetRestaurantList,
  useGetBanRestaurantList,
  useBanOrUnbanRestaurant,
  useUpdateValidRestaurant,
};
