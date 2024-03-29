"use client";

import { useGetOfferList } from "@/hooks/useUser";
import OfferTable from "./OfferTable";

const Index = () => {
  const { isLoading, data, refetch } = useGetOfferList();

  return (
    <>
      <OfferTable isLoading={isLoading} data={data} refetch={refetch} />
    </>
  );
};

export default Index;
