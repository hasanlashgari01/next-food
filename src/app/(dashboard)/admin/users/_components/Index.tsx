"use client";

import { SelectOption, UsersOption } from "@/common/interface/optionSelect";
import { Person } from "@/common/interface/person";
import { api } from "@/config/axiosConfig";
import { fixNumbers } from "@/utils/func";
import { useEffect, useState } from "react";
import SearchBar from "../../_components/SearchBar";
import TopPage from "../../_components/TopPage";
import UsersTable from "./UsersTable";

const options: UsersOption[] = [
  { value: "users", label: "لیست کاربران" },
  { value: "ban-users", label: "لیست کاربران بن شده" },
  { value: "active-users", label: "لیست کاربران فعال" },
];

const Index = () => {
  const [selectedOption, setSelectedOption] = useState<UsersOption | SelectOption>({
    value: "users",
    label: "لیست کاربران",
  });
  const [userList, setUserList] = useState([] as Person[]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedOption.value === "users") {
      api(`/admin/users`).then(({ data }) => setUserList(data.users));
    } else if (selectedOption.value === "active-users") {
      const users = api(`/admin/users`).then(data => console.log(data));
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
      api.post(`/search/admin/users`, { mobile }).then(({ data }) => setUserList(data.result));
    }
  };

  return (
    <>
      <TopPage
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        title="لیست کاربران"
        options={options}
      >
        <SearchBar search={search} setSearch={setSearch} searchHandler={searchHandler} />
      </TopPage>
      <UsersTable users={userList} />
    </>
  );
};

export default Index;
