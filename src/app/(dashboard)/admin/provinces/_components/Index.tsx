"use client";

import { useGetProvinceList } from "@/hooks/useAdmin";
import TopPage from "../../_components/TopPage";
import ProvinceTable from "./ProvinceTable";

const Index = () => {
  const { isPending, data: provinceList, refetch } = useGetProvinceList();

  return (
    <>
      <TopPage title="لیست استان ها" link="/admin/provinces/add" linkText="افزودن استان" />
      <ProvinceTable data={{ count: provinceList?.count, provinces: provinceList?.provinces }} refetch={refetch} />
    </>
  );
};
export default Index;
