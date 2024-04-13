import { TRole } from "@/common/interface/user";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Profile: React.FC<{ role: TRole | null }> = ({ role }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="relative">
      <>
        {role !== "ADMIN" ? (
          <>
            <Link
              href={role === "SELLER" ? "/p-restaurant/home" : role === "USER" ? "/user/home" : "/auth/login"}
              className="flex rounded-full"
            >
              <Image
                src="/Auth.png"
                alt="پروفایل"
                width={100}
                height={100}
                loading="lazy"
                className="size-12 cursor-pointer rounded-full object-cover object-top lg:size-14"
              />
            </Link>
          </>
        ) : (
          <>
            {isShow && <div className="wrapper" onClick={() => setIsShow(false)}></div>}
            <div className="relative flex rounded-full" onClick={() => setIsShow(!isShow)}>
              <Image
                src="/Auth.png"
                alt="پروفایل"
                width={100}
                height={100}
                loading="lazy"
                className="size-12 cursor-pointer rounded-full object-cover object-top"
              />
            </div>
            <div
              className={twMerge(
                "absolute left-0 top-20 z-20 flex w-64 flex-col gap-1 rounded-2xl bg-white py-3 shadow-2xl transition-all ease-in dark:bg-slate-700",
                `${isShow ? "visible opacity-100" : "invisible opacity-0"}`,
              )}
            >
              <Link href="/user/home" className="profile-link">
                پنل کاربری
              </Link>
              <Link href="/p-restaurant/home" className="profile-link">
                پنل رستوران
              </Link>
              <Link href="/admin/home" className="profile-link">
                پنل ادمین
              </Link>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Profile;
