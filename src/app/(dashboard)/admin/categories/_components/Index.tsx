"use client";

import { useGetCategoryList } from "@/hooks/useAdmin";
import Link from "next/link";
import TopPageRight from "../../_components/TopPageRight";
import CategoriesTable from "./CategoriesTable";
import TopPage from "../../_components/TopPage";

const Index = () => {
  const { isPending, data: categoryList } = useGetCategoryList();

  return (
    <div className="mt-5">
      <TopPage title="لیست دسته بندی ها" link="/admin/categories/add" linkText="افزودن دسته بندی" />
      <CategoriesTable categories={categoryList ?? []} />
    </div>
  );
};

export default Index;
