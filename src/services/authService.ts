import { api, apiUpload } from "@/config/axiosConfig";
import { userRoute } from "./routeService";
import { IUser } from "@/common/interface/user";

export interface IPasswordData {
  currentPassword: string;
  newPassword: string;
}

const getUser = () => api(`/api/user/whoami`).then(({ data }) => data);

const updateProfile = (data: IUser) => apiUpload.put(userRoute, { ...data }).then(({ data }) => data);

const changePassword = (data: IPasswordData) => api.patch(userRoute, { ...data }).then(({ data }) => data);

export { getUser, changePassword, updateProfile };
