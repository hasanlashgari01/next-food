import Modal from "@/components/modules/Modal/Modal";
import React from "react";
import { HiCheckCircle, HiTrash } from "react-icons/hi2";
import { MdRadioButtonUnchecked } from "react-icons/md";

interface SelectedBoxProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  data: any[];
  message: string;
  deleteAllHandler: () => void;
}

const DeleteSelectedBox: React.FC<SelectedBoxProps> = ({
  isShow,
  setIsShow,
  data,
  selectedIds,
  setSelectedIds,
  message,
  deleteAllHandler,
}) => {
  const selectAll = () => setSelectedIds(prevState => [...prevState, ...data.map(item => item._id)]);
  const isDisable = selectedIds.length === 0;

  return (
    <div className="mb-2.5 flex gap-4">
      <button className="selection-btn btn-primary" onClick={() => selectAll()}>
        <HiCheckCircle className="size-4" />
      </button>
      <button disabled={isDisable} className="selection-btn btn-warning" onClick={() => setSelectedIds([])}>
        <MdRadioButtonUnchecked className="size-4" />
      </button>
      <button disabled={isDisable} className="selection-btn btn-danger" onClick={() => setIsShow(true)}>
        <HiTrash className="size-4" />
      </button>
      <Modal
        isShow={isShow}
        setIsShow={setIsShow}
        title={`از حذف ${message} های انتخاب شده اطمینان دارید؟`}
        confirmText="حذف"
        cancelText="لغو"
        confirmStyle="btn-danger"
        cancelStyle="btn-default"
        confirmAction={() => deleteAllHandler()}
      />
    </div>
  );
};
export default DeleteSelectedBox;
