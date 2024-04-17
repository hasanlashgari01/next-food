import { api } from "@/config/axiosConfig";
import { foodRoute } from "./routeService";
import { ICommentData, IMainComment } from "@/common/interface/restaurant";

interface ICommentWithCount {
  count: number;
  comments: IMainComment[];
}

const toggleLike = (id: string) => api.patch(`${foodRoute}${id}/like`).then(({ data }) => data);

const toggleBookmark = (id: string) => api.patch(`${foodRoute}${id}/bookmark`).then(({ data }) => data);

const getComments = (id: string, page: number, limit: number): Promise<ICommentWithCount> =>
  api(`${foodRoute}${id}/comment?page=${page}&limit=${limit}`).then(({ data }) => data);

const createComment = (data: ICommentData) => api.post(`${foodRoute}comment`, data).then(({ data }) => data);

const toggleLikeComment = (id: string) => api.patch(`${foodRoute}${id}/comment`).then(({ data }) => data);

export { toggleLike, toggleBookmark, getComments, createComment, toggleLikeComment };
