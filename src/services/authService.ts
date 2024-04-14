import { IUser } from "@/common/interface/user";
import { api, apiUpload } from "@/config/axiosConfig";
import { userRoute } from "./routeService";

export interface IPasswordData {
  currentPassword: string;
  newPassword: string;
}

const getUser = (): Promise<IUser> => api(`/api/user/whoami`).then(({ data }) => data);

const logout = () => api(`/auth/logout`).then(({ data }) => data);

const updateProfile = (data: IUser) => apiUpload.put(userRoute, { ...data }).then(({ data }) => data);

const removeAvatar = () => api.delete(userRoute).then(({ data }) => data);

const changePassword = (data: IPasswordData) => api.patch(userRoute, { ...data }).then(({ data }) => data);

export { changePassword, getUser, removeAvatar, updateProfile, logout };
