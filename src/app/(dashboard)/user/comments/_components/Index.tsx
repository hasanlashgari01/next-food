"use client";

import { useGetCommentList } from "@/hooks/useUser";
import CommentTable from "./CommentTable";

const Index = () => {
  const { isLoading, data, refetch } = useGetCommentList();

  return <CommentTable isLoading={isLoading} data={data} refetch={refetch} />;
};

export default Index;
