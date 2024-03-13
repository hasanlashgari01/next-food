"use client";

import { api } from "@/config/axiosConfig";
import { useEffect, useState } from "react";

const page = () => {
  const [genderPercent, setGenderPercent] = useState<{ male: number; female: number }>({ male: 0, female: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api(`/admin/dashboard`).then(({ data }) => data);
    console.log("🚀 ~ fetchData ~ data:", response);
  };

  return <div></div>;
};

export default page;
