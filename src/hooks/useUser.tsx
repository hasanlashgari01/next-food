import { useMutation } from "@tanstack/react-query";
import { bookmarkRestaurant, likeRestaurant, unBookmarkRestaurant, unLikeRestaurant } from "@/services/userService";

const useLikeRestaurant = () => useMutation({ mutationFn: likeRestaurant });

const useUnLikeRestaurant = () => useMutation({ mutationFn: unLikeRestaurant });

const useBookmarkRestaurant = () => useMutation({ mutationFn: bookmarkRestaurant });

const useUnBookmarkRestaurant = () => useMutation({ mutationFn: unBookmarkRestaurant });

export { useLikeRestaurant, useUnLikeRestaurant, useBookmarkRestaurant, useUnBookmarkRestaurant };
