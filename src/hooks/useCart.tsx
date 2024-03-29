import { addToCart, emptyCart, getCart, removeFromCart } from "@/services/cartService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetCart = () => useQuery({ queryKey: ["user-cart"], queryFn: getCart });

const useEmptyCart = () => useMutation({ mutationFn: emptyCart });

const useAddToCart = () => useMutation({ mutationFn: addToCart });

const useRemoveFromCart = () => useMutation({ mutationFn: removeFromCart });

export { useAddToCart, useEmptyCart, useGetCart, useRemoveFromCart };
