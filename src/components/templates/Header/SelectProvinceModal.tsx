"use client";

import { ChangeEvent, useEffect, useState } from "react";
import ModalLayout from "../../modules/Modal/ModalLayout";
import { getProviceList } from "@/services/publicService";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";

interface IProvince {
  _id?: string;
  name: string;
  englishTitle: string;
}

const SelectProvinceModal = () => {
  const router = useRouter();
  const [data, setData] = useState<IProvince[]>([]);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [isShow, setIsShow] = useState(false);
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState<string>("");

  const isSearch = search.length >= 1;

  localStorage.getItem("province") && router.replace(`/service`);

  useEffect(() => {
    const province = localStorage.getItem("province");
    if (province) {
      setProvince(JSON.parse(province).name);
    }
  }, [localStorage.getItem("province")]);

  useEffect(() => {
    isShow ? fetchData() : setSearch("");
  }, [isShow]);

  useEffect(() => {
    if (isSearch) {
      const searchResult = data.filter(
        ({ name, englishTitle }) => name.startsWith(search) || englishTitle.startsWith(search.toLowerCase()),
      );
      setProvinces(searchResult);
    } else {
      setProvinces(data);
    }
  }, [search]);

  const fetchData = async () => {
    const res = await getProviceList();
    setData(res.provinces);
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const provinceHandler = (province: IProvince) => {
    delete province._id;
    localStorage.setItem("province", JSON.stringify({ ...province }));
    setIsShow(false);
  };

  return (
    <>
      <div className="max-w-96 cursor-pointer" onClick={() => setIsShow(true)}>
        <div className="form__input flex gap-4 pr-4">
          <HiOutlineLocationMarker className="shrink-0 text-2xl" />
          <input
            readOnly
            placeholder="ابتدا استان یا شهر را انتخاب کنید"
            value={province}
            className="w-full cursor-pointer bg-transparent"
          />
        </div>
      </div>
      <ModalLayout isShow={isShow} setIsShow={setIsShow} className="h-[75dvh]">
        <div className="h-full">
          <input
            className="form__input pr-5"
            placeholder="جستجو استان (فارسی یا انگلیسی)"
            value={search}
            onChange={e => searchHandler(e)}
          />
          <div className="mt-5 grid h-fit max-h-[90%] grid-cols-3 gap-4 overflow-y-auto pl-5">
            {data &&
              (isSearch ? provinces : data).map(province => (
                <span
                  key={province?._id}
                  className="inline-block h-fit cursor-pointer rounded-md border py-2 text-center transition-colors delay-75 duration-300 ease-out hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-700 dark:hover:bg-slate-800"
                  onClick={() => provinceHandler(province)}
                >
                  {province.name}
                </span>
              ))}
          </div>
        </div>
      </ModalLayout>
    </>
  );
};

export default SelectProvinceModal;
