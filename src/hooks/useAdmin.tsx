import {
  addDiscount,
  addNewCategory,
  getCategories,
  getCategory,
  getDashboard,
  getDiscounts,
  getUsers,
  updateCategory,
} from "@/services/adminService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetDashboard = () => useQuery({ queryKey: ["admin-dashboard"], queryFn: getDashboard });

const useGetUserList = () => useQuery({ queryKey: ["users"], queryFn: getUsers });

// * Category

const useGetCategoryList = () => useQuery({ queryKey: ["categories"], queryFn: getCategories });

const useAddCategory = () => useMutation({ mutationFn: addNewCategory });

const useGetCategory = (id: string) => useQuery({ queryKey: ["category", id], queryFn: () => getCategory(id) });

const useUpdateCategory = () => useMutation({ mutationFn: updateCategory });

// * Discount

const useGetDiscountList = () => useQuery({ queryKey: ["discounts"], queryFn: getDiscounts });

const useAddDiscount = () => useMutation({ mutationFn: addDiscount });

export {
  useAddCategory,
  useGetCategoryList,
  useGetDashboard,
  useGetUserList,
  useUpdateCategory,
  useGetCategory,
  useGetDiscountList,
  useAddDiscount,
};
