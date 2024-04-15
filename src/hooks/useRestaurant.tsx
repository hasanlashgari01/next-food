import {
  addOffSelectedFood,
  banOrUnbanComment,
  createComment,
  createFood,
  createMenu,
  deleteFood,
  deleteMenu,
  getComments,
  getFoods,
  getMenus,
  getOffs,
  getOrderById,
  getOrders,
  getRestaurant,
  removeCover,
  removeLogo,
  removeOffSelectedFood,
  toggleBookmark,
  toggleLike,
  toggleLikeComment,
  updateFood,
  updateMenu,
  uploadCover,
  uploadLogo,
} from "@/services/restaurantService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetMenuList = (id: string) => useQuery({ queryKey: ["p-restaurant-menus", id], queryFn: () => getMenus(id) });

const useCreateMenu = () => useMutation({ mutationFn: createMenu });

const useUpdateMenu = () => useMutation({ mutationFn: updateMenu });

const useDeleteMenu = () => useMutation({ mutationFn: deleteMenu });

const useGetFoodList = (id: string) => useQuery({ queryKey: ["p-restaurant-foods", id], queryFn: () => getFoods(id) });

const useCreateFood = () => useMutation({ mutationFn: createFood });

const useUpdateFood = () => useMutation({ mutationFn: updateFood });

const useDeleteFood = () => useMutation({ mutationFn: deleteFood });

const useGetOrderList = (id: string) =>
  useQuery({ queryKey: ["p-restaurant-orders", id], queryFn: () => getOrders(id) });

const useGetOrderById = (id: string, orderId: string) =>
  useQuery({ queryKey: ["p-restaurant-order", id, "order", orderId], queryFn: () => getOrderById(id, orderId) });

const useGetCommentList = (id: string) =>
  useQuery({ queryKey: ["p-restaurant-comments"], queryFn: () => getComments(id) });

const useBanOrUnbanComment = () => useMutation({ mutationFn: banOrUnbanComment });

const useGetOffList = (id: string) => useQuery({ queryKey: ["p-restaurant-offs"], queryFn: () => getOffs(id) });

const useAddOffSelectedFood = () => useMutation({ mutationFn: addOffSelectedFood });

const useRemoveOffSelectedFood = () => useMutation({ mutationFn: removeOffSelectedFood });

const useGetRestaurant = (id: string) => useQuery({ queryKey: ["p-restaurant", id], queryFn: () => getRestaurant(id) });

const useUploadLogo = () => useMutation({ mutationFn: uploadLogo });

const useRemoveLogo = (id: string) => useMutation({ mutationFn: () => removeLogo(id) });

const useUploadCover = () => useMutation({ mutationFn: uploadCover });

const useRemoveCover = (id: string) => useMutation({ mutationFn: () => removeCover(id) });

const useToggleLike = () => useMutation({ mutationFn: (id: string) => toggleLike(id) });

const useCreateComment = () => useMutation({ mutationFn: createComment });

const useToggleBookmark = () => useMutation({ mutationFn: (id: string) => toggleBookmark(id) });

const useToggleLikeComment = () => useMutation({ mutationFn: (id: string) => toggleLikeComment(id) });

export {
  useAddOffSelectedFood,
  useBanOrUnbanComment,
  useCreateComment,
  useCreateFood,
  useCreateMenu,
  useDeleteFood,
  useDeleteMenu,
  useGetCommentList,
  useGetFoodList,
  useGetMenuList,
  useGetOffList,
  useGetOrderById,
  useGetOrderList,
  useGetRestaurant,
  useRemoveCover,
  useRemoveLogo,
  useRemoveOffSelectedFood,
  useToggleBookmark,
  useToggleLike,
  useToggleLikeComment,
  useUpdateFood,
  useUpdateMenu,
  useUploadCover,
  useUploadLogo,
};
