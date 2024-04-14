import { TTheme } from "@/common/interface/user";
import { themeValues } from "@/constants/radioValues";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputRadioGroup from "../Input/InputRadioGroup";
import { Props } from "./section";

interface FormProps {
  theme: TTheme;
}

const AdvancedSection: React.FC<Props> = ({ isLoading, data, refetch, mutateAsync }) => {
  const { register, setValue, handleSubmit } = useForm<FormProps>({
    mode: "all",
    defaultValues: {
      theme: "AUTO",
    },
    values: {
      theme: data?.settings?.theme as TTheme,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const { message } = await mutateAsync(data);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const themeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("theme", e.currentTarget.value as TTheme);
  };

  return (
    <>
      <form className="grid grid-cols-1 gap-6 lg:grid-cols-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:col-span-2">
          <InputRadioGroup data={themeValues} register={register} handler={themeHandler} label="جنسیت" />
        </div>
        <button type="submit" className="add-btn col-span-5 mt-4 w-fit">
          ذخیره
        </button>
      </form>
    </>
  );
};
export default AdvancedSection;
