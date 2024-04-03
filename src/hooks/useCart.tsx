import { decrementFood, emptyCart, getCart, incrementFood, removeFood } from "@/services/cartService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetCart = () => useQuery({ queryKey: ["user-cart"], queryFn: getCart });

const useRemoveFoodFromCart = () => useMutation({ mutationFn: removeFood });

const useEmptyCart = () => useMutation({ mutationFn: emptyCart });

const useIncrementFood = () => useMutation({ mutationFn: incrementFood });

const useDecrementFood = () => useMutation({ mutationFn: decrementFood });

export { useDecrementFood, useEmptyCart, useGetCart, useIncrementFood, useRemoveFoodFromCart };
