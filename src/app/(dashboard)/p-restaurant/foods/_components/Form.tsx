"use client";

import { IFoodData } from "@/common/interface/food";
import { IMenu } from "@/common/interface/restaurant";
import ImageUpload from "@/components/modules/Input/ImageUpload";
import InputText from "@/components/modules/Input/InputText";
import { useGetUser } from "@/hooks/useAuth";
import { useCreateFood, useGetMenuList, useUpdateFood } from "@/hooks/useRestaurant";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

interface FormProps {
  data?: IFoodData;
  isEdit?: boolean;
  id?: string;
}

const Form: React.FC<FormProps> = ({ data, isEdit = false, id }) => {
  const { data: user } = useGetUser();
  const restaurant = user?.restaurants.at(0);
  const { isLoading: isLoadingMenu, data: menuList } = useGetMenuList(restaurant || "");
  const { mutateAsync: mutateAsyncCreate } = useCreateFood();
  const { mutateAsync: mutateAsyncUpdate } = useUpdateFood();
  const [menu, setMenu] = useState<IMenu | undefined | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { touchedFields, errors },
  } = useForm<IFoodData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      price: null,
      menuId: {},
      weight: null,
      amount: null,
      percent: 0,
      image: "",
      startDate: new Date().toLocaleDateString("fa-IR"),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      restaurantId: restaurant,
    },
    values: data,
  });

  const showMenu = isEdit ? menu : true;

  useEffect(() => {
    if (!isLoadingMenu) {
      const selectedMenu = menuList?.menus.find((menu: IMenu | undefined) => menu?._id === data?.menuId);
      setMenu(selectedMenu);
    }
  }, [isLoadingMenu]);

  const onSubmit: SubmitHandler<IFoodData> = async data => {
    try {
      let msg = "";
      setValue("image", "");

      delete data.discount;
      data = {
        ...data,
        startDate: data.startDate as DateObject,
        endDate: data.endDate as DateObject,
      };

      if (isEdit && id) {
        const { message } = await mutateAsyncUpdate({ data, id });
        msg = message;
      } else {
        const { message } = await mutateAsyncCreate(data);
        msg = message;
      }
      toast.success(msg);
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <ImageUpload
        imageValue={getValues("image")}
        setImageValue={file => setValue("image", file.name as string)}
        title="غذا"
      />
      <div className="space-y-5">
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="col-span-1 space-y-4">
            <InputText
              id="title"
              type="text"
              label="عنوان"
              {...register("title")}
              message={errors.title ? errors.title.message : ""}
            >
              <input
                type="text"
                className={twMerge(
                  "form__input pr-6",
                  `${errors.title && "border-cancel dark:border-cancel"}`,
                  `${touchedFields.title && getValues().title !== "" && !errors?.title && "border-success dark:border-success"}`,
                )}
                dir="rtl"
                {...register("title", {
                  required: { value: true, message: "عنوان اجباری هست" },
                  pattern: { value: /^[\u0600-\u06FF\s]+$/, message: "عنوان باید فارسی باشد" },
                  minLength: { value: 3, message: "عنوان باید بیشتر از ۳ کاراکتر باشد" },
                  maxLength: { value: 255, message: "عنوان باید کمتر از ۲۵۵ کاراکتر باشد" },
                })}
              />
            </InputText>
            <InputText
              id="price"
              type="text"
              label="قیمت"
              {...register("price")}
              message={errors.price ? errors.price.message : ""}
            >
              <input
                type="text"
                className={twMerge(
                  "form__input pr-6",
                  `${errors.price && "border-cancel dark:border-cancel"}`,
                  `${touchedFields.price && getValues().price !== null && !errors?.price && "border-success dark:border-success"}`,
                )}
                dir="rtl"
                {...register("price", {
                  required: { value: true, message: "قیمت اجباری هست" },
                  pattern: { value: /^[0-9]+$/, message: "فقط ارقام انگلیسی مجاز هست" },
                })}
              />
            </InputText>
            <InputText
              id="weight"
              type="text"
              label="وزن"
              {...register("weight")}
              message={errors.weight ? errors.weight.message : ""}
            >
              <input
                type="text"
                className={twMerge(
                  "form__input pr-6",
                  `${errors.weight && "border-cancel dark:border-cancel"}`,
                  `${touchedFields.weight && getValues().weight !== null && !errors?.weight && "border-success dark:border-success"}`,
                )}
                dir="rtl"
                {...register("weight", {
                  required: { value: true, message: "قیمت اجباری هست" },
                  pattern: { value: /^[0-9]+$/, message: "فقط ارقام مجاز هست" },
                })}
              />
            </InputText>
            {!isLoadingMenu && showMenu && (
              <InputText id="weight" type="text" label="منو" {...register("menuId")}>
                <div className="flex w-full flex-1 items-center child:flex-1">
                  <Select
                    className="text-base md:w-64 dark:text-black"
                    classNamePrefix="react-select"
                    placeholder="منو مورد نظر خود را انتخاب کنید"
                    defaultValue={menu ? { value: menu?._id, label: menu?.title } : null}
                    onChange={e => setValue("menuId", e?.value as IMenu["_id"])}
                    options={menuList?.menus.map(menu => ({
                      value: menu?._id as IMenu["_id"],
                      label: menu?.title as IMenu["title"],
                    }))}
                  />
                </div>
              </InputText>
            )}
          </div>
          <div className="col-span-1 space-y-4">
            <InputText
              id="percent"
              type="text"
              label="درصد تخفیف"
              {...register("percent")}
              message={errors.percent ? errors.percent.message : ""}
            >
              <input
                type="text"
                className={twMerge(
                  "form__input pr-6",
                  `${errors.percent && "border-cancel dark:border-cancel"}`,
                  `${touchedFields.percent && getValues().percent !== null && !errors?.percent && "border-success dark:border-success"}`,
                )}
                dir="rtl"
                {...register("percent", { pattern: { value: /^[0-9]+$/, message: "فقط ارقام مجاز هست" } })}
              />
            </InputText>
            <InputText
              id="amount"
              type="text"
              label="تعداد مورد استفاده"
              {...register("amount")}
              message={errors.amount ? errors.amount.message : ""}
            >
              <input
                type="text"
                className={twMerge(
                  "form__input pr-6",
                  `${errors.amount && "border-cancel dark:border-cancel"}`,
                  `${touchedFields.amount && getValues().amount !== null && !errors?.amount && "border-success dark:border-success"}`,
                )}
                dir="rtl"
                {...register("amount", { pattern: { value: /^[0-9]+$/, message: "فقط ارقام مجاز هست" } })}
              />
            </InputText>
            <div className="flex flex-col gap-2.5 md:flex-row lg:flex-col xl:flex-row">
              <InputText id="startDate" type="text" label="تاریخ شروع تخفیف" {...register("startDate")}>
                <DatePicker
                  inputClass="form__input pr-6 child:w-full max-w-inherit"
                  value={getValues("startDate")}
                  format="YYYY/MM/DD"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-left"
                  onChange={date => setValue("startDate", date as DateObject)}
                />
              </InputText>
              <InputText
                id="endDate"
                type="text"
                label="تاریخ پایان تخفیف"
                {...register("endDate")}
                message={errors.endDate ? errors.endDate.message : ""}
              >
                <DatePicker
                  inputClass="form__input pr-6 max-w-inherit"
                  value={getValues("endDate")}
                  format="YYYY/MM/DD"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-left"
                  onChange={date => setValue("endDate", date as DateObject)}
                />
              </InputText>
            </div>
          </div>
        </div>

        <div className="lg:w-3/3 lg:pl-2.5 xl:w-1/2">
          <InputText
            id="description"
            type="text"
            label="توضیحات"
            {...register("description")}
            message={errors.description ? errors.description.message : ""}
          >
            <textarea
              cols={30}
              rows={10}
              placeholder="مواد اولیه غذا (خمیر پیتزا آمریکایی، کالباس پپرونی گوشت ۷۰%)"
              dir="rtl"
              className={twMerge(
                "form__input pr-6",
                `${errors.description && "border-cancel dark:border-cancel"}`,
                `${touchedFields.description && getValues().description !== "" && !errors?.description && "border-success dark:border-success"}`,
              )}
              {...register("description", {
                required: { value: true, message: "توضیحات اجباری هست" },
                pattern: { value: /^[\u0600-\u06FF،٪%()0-9\s]+$/, message: "توضیحات باید فارسی باشد" },
                minLength: { value: 3, message: "توضیحات باید بیشتر از ۳ کاراکتر باشد" },
                maxLength: { value: 255, message: "توضیحات باید کمتر از ۲۵۵ کاراکتر باشد" },
              })}
            ></textarea>
          </InputText>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-8">
        ثبت
      </button>
    </form>
  );
};

export default Form;
