import { addNewCategory, getCategories, getDashboard, getUsers } from "@/services/adminService";
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

export { useGetDashboard, useGetUserList, useGetCategoryList, useAddCategory };
