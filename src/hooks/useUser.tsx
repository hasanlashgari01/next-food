import { useMutation, useQuery } from "@tanstack/react-query";
import {
  bookmarkFood,
  bookmarkRestaurant,
  getOrders,
  likeFood,
  likeRestaurant,
  unBookmarkFood,
  unBookmarkRestaurant,
  unLikeFood,
  unLikeRestaurant,
} from "@/services/userService";

const useLikeFood = () => useMutation({ mutationFn: likeFood });

const useUnLikeFood = () => useMutation({ mutationFn: unLikeFood });

const useBookmarkFood = () => useMutation({ mutationFn: bookmarkFood });

const useUnBookmarkFood = () => useMutation({ mutationFn: unBookmarkFood });

const useLikeRestaurant = () => useMutation({ mutationFn: likeRestaurant });

const useUnLikeRestaurant = () => useMutation({ mutationFn: unLikeRestaurant });

const useBookmarkRestaurant = () => useMutation({ mutationFn: bookmarkRestaurant });

const useUnBookmarkRestaurant = () => useMutation({ mutationFn: unBookmarkRestaurant });

const useGetOrderList = () => useQuery({ queryKey: ["user-orders"], queryFn: getOrders });

export {
  useLikeFood,
  useUnLikeFood,
  useBookmarkFood,
  useUnBookmarkFood,
  useLikeRestaurant,
  useUnLikeRestaurant,
  useBookmarkRestaurant,
  useUnBookmarkRestaurant,
  useGetOrderList,
};
