import { api } from "@/config/axiosConfig";

const getUser = () => api(`/api/user/whoami`).then(data => data.data);

export { getUser };
