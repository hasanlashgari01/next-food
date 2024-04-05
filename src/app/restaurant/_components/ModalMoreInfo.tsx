"use client";

import { HiOutlineInformationCircle } from "react-icons/hi2";

interface IModalMoreInfoProps {
  restaurantId: string;
}

const ModalMoreInfo: React.FC<IModalMoreInfoProps> = ({ restaurantId }) => {
  return (
    <>
      <button
        className="btn btn-info mt-2 rounded-full duration-300 max-md:px-2"
        onClick={() => console.log(restaurantId)}
      >
        <span className="hidden md:inline-block">اطلاعات رستوران</span>
        <HiOutlineInformationCircle className="inline-block text-2xl md:hidden" />
      </button>
    </>
  );
};

export default ModalMoreInfo;
