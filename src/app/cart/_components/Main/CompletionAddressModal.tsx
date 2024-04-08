import { IAddress } from "@/common/interface/cart-page";
import ModalForm from "@/components/modules/Modal/ModalForm";
import { useGetUser } from "@/hooks/useAuth";
import { ChangeEvent, Dispatch, FormEventHandler, SetStateAction, useEffect, useState } from "react";

interface IData {
  mobile: string;
  title: string;
  detail: string;
}

interface IProps {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  submitHandler: FormEventHandler;
  data: IData;
  setData: Dispatch<SetStateAction<IData>>;
}

const CompletionAddressModal: React.FC<IProps> = ({ data, setData, isShow, setIsShow, submitHandler }) => {
  const { isLoading, data: user } = useGetUser();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isShow && data.mobile === user?.mobile) {
      setIsChecked(true);
    }
  }, [isShow]);

  useEffect(() => {
    if (isChecked) {
      setData({ ...data, mobile: user?.mobile || "" });
    } else {
      setData({ ...data, mobile: "" });
    }
  }, [isChecked]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    let { name, value } = e.currentTarget;
    setData({ ...data, [name]: value });
  };

  const checkedHandler = () => setIsChecked(!isChecked);

  return (
    <ModalForm title="ثبت آدرس" isShow={isShow} setIsShow={setIsShow} submitHandler={submitHandler}>
      <input
        type="text"
        placeholder="عنوان آدرس"
        name="title"
        value={data.title}
        onChange={changeHandler}
        className="form__input py-2 pr-4"
      />
      <div className="flex flex-col gap-2">
        {user?.mobile && (
          <label htmlFor="myself" className="flex select-none items-center gap-1">
            <input
              type="checkbox"
              name=""
              id="myself"
              className="size-4"
              onChange={checkedHandler}
              checked={isChecked}
            />
            <span>تحویل گیرنده خودم هستم.</span>
          </label>
        )}
        <input
          type="text"
          className="form__input py-2 pr-4"
          placeholder="شماره همراه"
          value={data.mobile}
          onChange={e => setData({ ...data, mobile: e.target.value })}
        />
      </div>
      <textarea
        id=""
        cols={30}
        rows={10}
        placeholder="آدرس دقیق شما"
        name="detail"
        value={data.detail}
        onChange={changeHandler}
        className="form__input py-2 pr-4"
      ></textarea>
      <input
        type="submit"
        value="ثبت آدرس"
        className="btn btn-success min-h-10 flex-1 transition-colors duration-300"
      />
    </ModalForm>
  );
};

export default CompletionAddressModal;
