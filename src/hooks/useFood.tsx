import { toggleBookmark, toggleLike } from "@/services/foodService";
import { useMutation } from "@tanstack/react-query";

const useToggleLike = () => useMutation({ mutationFn: (id: string) => toggleLike(id) });

const useToggleBookmark = () => useMutation({ mutationFn: (id: string) => toggleBookmark(id) });

export { useToggleLike, useToggleBookmark };
