"use client";

import { useGetCategoryList } from "@/hooks/useAdmin";
import Link from "next/link";
import TopPageRight from "../../_components/TopPageRight";
import CategoriesTable from "./CategoriesTable";

const Index = () => {
  const { isPending, data: categoryList } = useGetCategoryList();

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between pl-5">
        <TopPageRight title="لیست دسته بندی ها" />
        <Link href="/admin/categories/add" className="btn btn-primary flex items-center">
          افزودن دسته بندی
        </Link>
      </div>
      <CategoriesTable categories={categoryList ?? []} />
    </div>
  );
};

export default Index;
