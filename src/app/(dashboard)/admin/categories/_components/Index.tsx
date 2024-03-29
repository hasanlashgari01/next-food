"use client";

import { useGetCategoryList } from "@/hooks/useAdmin";
import TopPage from "../../_components/TopPage";
import CategoriesTable from "./CategoriesTable";

const Index = () => {
  const { isLoading, data: categoryList } = useGetCategoryList();

  return (
    <>
      <TopPage title="لیست دسته بندی ها" link="/admin/categories/add" linkText="افزودن دسته بندی" />
      {!isLoading && <CategoriesTable categories={categoryList ?? []} />}
    </>
  );
};

export default Index;
