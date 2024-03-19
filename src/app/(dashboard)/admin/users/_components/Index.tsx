"use client";

import { Person } from "@/common/interface/person";
import { api } from "@/config/axiosConfig";
import { fixNumbers } from "@/utils/func";
import { useEffect, useState } from "react";
import SearchBar from "../../_components/SearchBar";
import Table from "./Table";
import TopPage from "./TopPage";

const Index = () => {
  const [selectedOption, setSelectedOption] = useState({
    value: "users",
    label: "کاربران",
  });
  const [userList, setUserList] = useState([] as Person[]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedOption.value === "users") {
      api(`/admin/users`).then(({ data }) => setUserList(data.users));
    } else if (selectedOption.value === "active-users") {
      const users = api(`/admin/users`).then(data => console.log(data));
      console.log(users);
    } else if (selectedOption.value === "ban-users") {
      api(`/admin/users/ban`).then(({ data }) => setUserList(data.result));
    }
  }, [selectedOption]);

  useEffect(() => {
    if (search === "") {
      api(`/admin/users`).then(({ data }) => setUserList(data.users));
    }
  }, [search]);

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (search !== "") {
      api.post(`/search/admin/users`, { fullName: search }).then(({ data }) => setUserList(data.result));
    }
    const mobile: string | number = fixNumbers(search);
    if (/^\d+$/.test(mobile.toString())) {
      console.log("🚀 ~ searchHandler ~ search:", mobile);
      api.post(`/search/admin/users`, { mobile }).then(({ data }) => setUserList(data.result));
    }
  };

  return (
    <>
      <TopPage selectedOption={selectedOption} setSelectedOption={setSelectedOption}>
        <SearchBar search={search} setSearch={setSearch} searchHandler={searchHandler} />
      </TopPage>
      <Table users={userList} />
    </>
  );
};

export default Index;
