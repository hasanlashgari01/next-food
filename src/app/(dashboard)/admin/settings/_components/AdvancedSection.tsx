import { IUser, TTheme } from "@/common/interface/user";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  isLoading: boolean;
  data: IUser;
  refetch: () => void;
  mutateAsync: (data: any) => Promise<any>;
}

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
      theme: data?.settings?.theme,
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
        <div className="col-span-2 grid gap-4">
          <div className="flex flex-col gap-2">
            <span className="mb-1 inline-block pr-4 text-sm font-semibold text-primary-900 dark:text-slate-300">
              حالت شب
            </span>
            <div className="flex gap-2">
              <label htmlFor="DARK" className="radio-label">
                <input
                  type="radio"
                  id="DARK"
                  value="DARK"
                  className="radio-input"
                  {...register("theme", { required: true, onChange: event => themeHandler(event) })}
                />
                <span>شب</span>
              </label>
              <label htmlFor="AUTO" className="radio-label">
                <input
                  type="radio"
                  id="AUTO"
                  value="AUTO"
                  className="radio-input"
                  {...register("theme", { required: true, onChange: event => themeHandler(event) })}
                />
                <span>خودکار</span>
              </label>
              <label htmlFor="LIGHT" className="radio-label">
                <input
                  type="radio"
                  id="LIGHT"
                  value="LIGHT"
                  className="radio-input"
                  {...register("theme", { required: true, onChange: event => themeHandler(event) })}
                />
                <span>روشن</span>
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="add-btn col-span-5 mt-4 w-fit">
          ذخیره
        </button>
      </form>
    </>
  );
};
export default AdvancedSection;
