import { getNewRestaurant, getPopularRestaurant } from "@/services/publicService";
import { useQuery } from "@tanstack/react-query";

const useGetPopularRestaurants = (province: string) =>
  useQuery({ queryKey: ["popular-restaurants"], queryFn: () => getPopularRestaurant(province) });
const useGetNewRestaurants = (province: string) =>
  useQuery({ queryKey: ["new-restaurants"], queryFn: () => getNewRestaurant(province) });

export { useGetPopularRestaurants, useGetNewRestaurants };
