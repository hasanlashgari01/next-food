"use client";

import { api } from "@/config/axiosConfig";
import { useEffect, useState } from "react";
import TopPageRight from "../../_components/TopPageRight";
import CategoriesTable from "./CategoriesTable";
import Link from "next/link";

const Index = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api(`/category`).then(({ data }) => {
      console.log(data);

      // setCategoryList(data);
    });
  }, []);

  useEffect(() => {
    if (search === "") {
      api(`/category`).then(({ data }) => setCategoryList(data));
    }
  }, [search]);

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (search !== "") {
      api.post(`/search/`, { name: search }).then(({ data }) => setCategoryList(data.result));
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between pl-5">
        <TopPageRight title="لیست دسته بندی ها" search={search} setSearch={setSearch} searchHandler={searchHandler} />
        <Link href="/admin/categories/add" className="btn btn-primary flex items-center">
          افزودن دسته بندی
        </Link>
      </div>
      <CategoriesTable categories={categoryList ?? []} />
    </div>
  );
};

export default Index;
