import { changePassword, getUser, logout, removeAvatar, updateProfile } from "@/services/authService";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUser = () => useQuery({ queryKey: ["user-details"], queryFn: getUser });

const useLogout = () => useMutation({ mutationFn: logout });

const useUpdateProfile = () => useMutation({ mutationFn: updateProfile });

const useRemoveAvatar = () => useMutation({ mutationFn: removeAvatar });

const useChangePassword = () => useMutation({ mutationFn: changePassword });

export { useChangePassword, useGetUser, useUpdateProfile, useRemoveAvatar, useLogout };
