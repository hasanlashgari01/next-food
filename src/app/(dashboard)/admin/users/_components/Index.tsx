"use client";

import { SelectOption, UsersOption } from "@/common/interface/optionSelect";
import { Person } from "@/common/interface/person";
import { useGetBanUserList, useGetUserList } from "@/hooks/useAdmin";
import { searchUsers } from "@/services/adminService";
import { fixNumbers } from "@/utils/func";
import { useEffect, useState } from "react";
import TopPage from "../../_components/TopPage";
import UsersTable from "./UsersTable";

const options: UsersOption[] = [
  { value: "users", label: "لیست کاربران" },
  { value: "ban-users", label: "لیست کاربران بن شده" },
];

const Index = () => {
  const [selectedOption, setSelectedOption] = useState<UsersOption | SelectOption>({
    value: "users",
    label: "لیست کاربران",
  });
  const { data: usersResult, refetch: refetchUsers } = useGetUserList();
  const { data: banUsersResult, refetch: refetchBanUsers } = useGetBanUserList();
  const [searchResult, setSearchResult] = useState([] as Person[]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedOption.value === "users") {
      refetchUsers();
    } else if (selectedOption.value === "ban-users") {
      refetchBanUsers();
    }
  }, [selectedOption]);

  useEffect(() => {
    if (search === "") {
      refetchUsers();
      setSearchResult([]);
    }
  }, [search]);

  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const mobile: string | number = fixNumbers(search);
    // if number search by mobile else search by name
    if (/^\d+$/.test(mobile.toString())) {
      const result = await searchUsers({ mobile: search });
      setSearchResult(result);
    } else if (search !== "") {
      const result = await searchUsers({ fullName: search });
      setSearchResult(result);
    }
  };

  return (
    <>
      <TopPage
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        title="لیست کاربران"
        options={options}
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
      />
      <UsersTable
        selectedOption={selectedOption}
        refetchUsers={refetchUsers}
        refetchBanUsers={refetchBanUsers}
        users={
          searchResult.length > 0
            ? searchResult
            : selectedOption.value === "users"
              ? usersResult?.users
              : banUsersResult.result
        }
      />
    </>
  );
};

export default Index;
