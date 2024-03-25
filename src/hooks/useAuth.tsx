import { IPasswordData, changePassword, getUser } from "@/services/authService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUser = () =>
  useQuery({
    queryKey: ["user-details"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: true,
  });

const useChangePassword = () => useMutation({ mutationFn: changePassword });

export { useGetUser, useChangePassword };
