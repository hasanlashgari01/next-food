import { api } from "@/config/axiosConfig";
import { provinceRoute } from "./routeService";

const getProviceList = () => api(`${provinceRoute}list`).then(({ data }) => data);

export { getProviceList };
