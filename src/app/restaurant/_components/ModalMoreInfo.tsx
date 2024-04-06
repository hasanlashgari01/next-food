"use client";

import { useState } from "react";
import { HiOutlineInformationCircle, HiOutlineXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface IModalMoreInfoProps {
  _id: string;
}

const ModalMoreInfo: React.FC<IModalMoreInfoProps> = ({ _id: restaurantId }) => {
  const [isShow, setIsShow] = useState(false);

  const hideModal = () => setIsShow(false);

  return (
    <div className="flex flex-initial max-md:justify-end lg:w-full">
      <button className="btn btn-info flex-1 rounded-full duration-300 max-md:px-2" onClick={() => setIsShow(!isShow)}>
        <span className="hidden md:inline-block">اطلاعات رستوران</span>
        <HiOutlineInformationCircle className="inline-block text-2xl md:hidden" />
      </button>
      {isShow && (
        <div className="fixed inset-0">
          <div
            className={twMerge(
              "fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity dark:bg-slate-950/70",
              `${isShow ? "visible z-10 opacity-100" : "invisible opacity-0"}`,
            )}
            onClick={hideModal}
          ></div>
          <div
            className={twMerge(
              "fixed inset-x-1/2 bottom-0 z-20 flex h-fit w-dvw translate-x-1/2 flex-col rounded-t-[36px] bg-slate-100 p-8 font-IranYekan transition-transform max-sm:h-[50dvh] max-sm:justify-evenly sm:inset-y-1/2 sm:max-w-lg sm:-translate-y-1/2 sm:rounded-2xl lg:max-w-2xl lg:rounded-2xl dark:bg-gray-800",
              `${isShow ? "visible z-10 translate-y-0 opacity-100" : "invisible translate-y-full opacity-0"}`,
            )}
          >
            <div className="max-md:px-2">
              <button onClick={hideModal}>
                <HiOutlineXMark className="inline-block text-2xl max-md:hidden dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalMoreInfo;
