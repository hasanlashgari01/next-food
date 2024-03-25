import { api } from "@/config/axiosConfig";
import { userRoute } from "./routeService";

export interface IPasswordData {
  currentPassword: string;
  newPassword: string;
}

const getUser = () => api(`/api/user/whoami`).then(({ data }) => data);

const changePassword = (data: IPasswordData) => api.patch(userRoute, { ...data }).then(({ data }) => data);

export { getUser, changePassword };
