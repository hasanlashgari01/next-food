import { api } from "@/config/axiosConfig";
import { foodRoute } from "./routeService";

const toggleLike = (id: string) => api.patch(`${foodRoute}${id}/like`).then(({ data }) => data);

const toggleBookmark = (id: string) => api.patch(`${foodRoute}${id}/bookmark`).then(({ data }) => data);

export { toggleLike, toggleBookmark };
