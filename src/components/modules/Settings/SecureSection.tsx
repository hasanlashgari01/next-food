import { IUser } from "@/common/interface/user";
import InputText from "@/components/modules/Input/InputText";
import { EmailPattern, MobilePattern } from "@/constants/regex";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  isLoading: boolean;
  data: IUser | undefined;
  refetch: () => void;
  mutateAsync: (data: any) => Promise<any>;
}

const SecureSection: React.FC<Props> = ({ isLoading, data, refetch, mutateAsync }) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { touchedFields, errors },
  } = useForm<IUser>({
    mode: "all",
    defaultValues: {
      email: "",
      mobile: "",
    },
    values: data,
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

  return (
    <>
      <form className="grid grid-cols-3 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-3 grid gap-4 sm:col-span-2">
          <InputText id="mobile" label="شماره تلفن" type="text" message={errors.mobile ? errors.mobile.message : ""}>
            <input
              type="text"
              className={`form__input ${errors.mobile && "border-cancel"} ${touchedFields.mobile && getValues().mobile !== "" && !errors?.mobile && "border-success"}`}
              dir="ltr"
              {...register("mobile", {
                required: { value: true, message: "شماره تلفن اجباری هست" },
                pattern: { value: MobilePattern, message: "شماره تلفن صحیح نمی باشد" },
              })}
            />
          </InputText>
          <InputText id="email" label="ایمیل" type="text" message={errors.email ? errors.email.message : ""}>
            <input
              type="text"
              className={`form__input ${errors.email && "border-cancel"} ${touchedFields.email && getValues().email !== "" && !errors?.email && "border-success"}`}
              dir="ltr"
              {...register("email", {
                required: { value: true, message: "ایمیل اجباری هست" },
                pattern: { value: EmailPattern, message: "ایمیل صحیح نمی باشد" },
              })}
            />
          </InputText>
        </div>
        <button type="submit" className="add-btn col-span-2 mt-4 w-fit">
          ذخیره
        </button>
      </form>
    </>
  );
};
export default SecureSection;
