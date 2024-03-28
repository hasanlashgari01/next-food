import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import React from "react";

interface IProfileProps {
  isLoading: boolean;
  avatarUrl: string | undefined;
}

const Profile: React.FC<IProfileProps> = ({ isLoading, avatarUrl }) => {
  return (
    <div>
      <Image
        src={!isLoading && avatarUrl ? `${fileRoute}user/${avatarUrl}` : "/Auth.png"}
        alt="پروفایل"
        width={100}
        height={100}
        loading="lazy"
        className="size-12 cursor-pointer rounded-full object-cover object-top lg:size-14"
      />
    </div>
  );
};

export default Profile;
