import { createComment, toggleBookmark, toggleLike, toggleLikeComment } from "@/services/foodService";
import { useMutation } from "@tanstack/react-query";

const useToggleLike = () => useMutation({ mutationFn: (id: string) => toggleLike(id) });

const useToggleBookmark = () => useMutation({ mutationFn: (id: string) => toggleBookmark(id) });

const useCreateFoodComment = () => useMutation({ mutationFn: createComment });

const useToggleLikeFoodComment = () => useMutation({ mutationFn: (id: string) => toggleLikeComment(id) });

export { useToggleLike, useToggleBookmark, useCreateFoodComment, useToggleLikeFoodComment };
