import { FormEvent } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  children: React.ReactNode;
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

const ModalForm: React.FC<Props> = ({ isShow, setIsShow, children, submitHandler }) => {
  const hideModal = () => setIsShow(false);

  return (
    <div className="fixed">
      <div
        className={twMerge(
          "fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity dark:bg-slate-950/70",
          `${isShow ? "visible z-10 opacity-100" : "invisible opacity-0"}`,
        )}
        onClick={hideModal}
      ></div>
      <div
        className={twMerge(
          "fixed inset-x-1/2 bottom-0 z-20 flex h-fit w-dvw translate-x-1/2 flex-col overflow-hidden rounded-t-[36px] bg-slate-100 p-6 pt-0 font-IranYekan  transition-transform max-sm:justify-evenly sm:inset-y-1/2 sm:max-w-lg sm:-translate-y-1/2 sm:rounded-2xl lg:max-w-2xl lg:rounded-2xl dark:bg-gray-800",
          `${isShow ? "visible z-10 translate-y-0 opacity-100" : "invisible translate-y-full opacity-0"}`,
        )}
      >
        <div className="-mx-6 mb-6 bg-slate-300 py-6">
          <h3 className="text-center font-Dana text-xl font-medium leading-8">ثبت آدرس</h3>
        </div>
        <form className="flex flex-col gap-3 lg:gap-4" onSubmit={submitHandler}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
