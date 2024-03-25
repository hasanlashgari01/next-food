import { changePassword, getUser, updateProfile } from "@/services/authService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUser = () =>
  useQuery({
    queryKey: ["user-details"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: true,
  });

const useUpdateProfile = () => useMutation({ mutationFn: updateProfile });

const useChangePassword = () => useMutation({ mutationFn: changePassword });

export { useChangePassword, useGetUser, useUpdateProfile };
