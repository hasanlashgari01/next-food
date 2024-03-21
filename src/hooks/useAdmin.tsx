import {
  addNewCategory,
  getCategories,
  getCategory,
  getDashboard,
  getUsers,
  updateCategory,
} from "@/services/adminService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetDashboard = () =>
  useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getDashboard,
    retry: false,
    refetchOnWindowFocus: true,
  });

const useGetUserList = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });

const useGetCategoryList = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: false,
    refetchOnWindowFocus: true,
  });

const useAddCategory = () => useMutation({ mutationFn: addNewCategory });

const useGetCategory = (id: string) =>
  useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

const useUpdateCategory = () => useMutation({ mutationFn: updateCategory });

export { useAddCategory, useGetCategoryList, useGetDashboard, useGetUserList, useUpdateCategory, useGetCategory };
