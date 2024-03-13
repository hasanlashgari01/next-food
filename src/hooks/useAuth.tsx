import { getUser } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () =>
  useQuery({
    queryKey: ["user-details"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: true,
  });

export { useGetUser };

