"use client";

import { IRestaurantUpdateData } from "@/common/interface/restaurant";
import ImageChange from "@/components/modules/Input/ImageChange";
import InputText from "@/components/modules/Input/InputText";
import { useGetUser } from "@/hooks/useAuth";
import { useGetRestaurant, useRemoveCover, useRemoveLogo, useUploadCover, useUploadLogo } from "@/hooks/useRestaurant";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const { data: user } = useGetUser();
  const restaurantId: string | undefined = user?.restaurants.at(0);
  const { isLoading, data, refetch } = useGetRestaurant(restaurantId ?? "");
  const { mutateAsync: uploadLogoMutateAsync } = useUploadLogo();
  const { mutateAsync: removeLogoMutateAsync } = useRemoveLogo(restaurantId ?? "");
  const { mutateAsync: uploadCoverMutateAsync } = useUploadCover();
  const { mutateAsync: removeCoverMutateAsync } = useRemoveCover(restaurantId ?? "");
  const { register, getValues, handleSubmit } = useForm<IRestaurantUpdateData>({
    mode: "all",
    defaultValues: {
      name: "",
      provinceName: "",
      order_start: null,
      order_end: null,
      average_delivery_time: null,
      send_outside_city: false,
      categories: [],
    },
    values: {
      ...data?.restaurant,
      provinceName: data?.restaurant.province.name,
      average_delivery_time: data?.restaurant.details.average_delivery_time,
      send_outside_city: data?.restaurant.details.send_outside_city,
      order_start: data?.restaurant?.order?.start || null,
      order_end: data?.restaurant?.order?.end || null,
    },
  });
  const [cover, setCover] = useState<string | null>(data?.restaurant.cover);
  const [logo, setLogo] = useState<string | null>(data?.restaurant.logo);

  const onSubmit = async (data: any) => {
    /*  try {
      const { message } = await mutateAsync(data);
      toast.success(message);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } */
  };

  return (
    <>
      {!isLoading && (
        <form className="mt-5 grid gap-6 lg:grid-cols-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Input Image */}
          <div className="relative col-span-12 grid h-64 gap-4 lg:col-span-5 lg:h-80">
            <div>
              <ImageChange
                id={restaurantId || ""}
                fieldName="cover"
                serverImage={getValues("cover") as string}
                imageValue={cover}
                uploadAction={uploadCoverMutateAsync}
                removeAction={removeCoverMutateAsync}
                refetch={refetch}
                title="زمینه"
                isCover={true}
              />
            </div>
            <div className="absolute bottom-0 mr-10 translate-y-1/2">
              <ImageChange
                id={restaurantId || ""}
                fieldName="logo"
                serverImage={getValues("logo") as string}
                imageValue={logo}
                uploadAction={uploadLogoMutateAsync}
                removeAction={removeLogoMutateAsync}
                refetch={refetch}
              />
            </div>
          </div>
          {/* Input Text */}
          <div className="col-span-12 mt-24 grid gap-4 lg:col-span-3">
            <InputText label="نام" type="text" id="name" message="">
              <input type="text" className="form__input pr-6" {...register("name")} />
            </InputText>
            <InputText label="استان" type="text" id="name" message="">
              <textarea rows={1} className="form__input pr-6" {...register("provinceName")} />
            </InputText>
            <InputText label="شروع ساعت کاری" type="text" id="name" message="">
              <input type="text" className="form__input pr-6" {...register("order_start")} />
            </InputText>
            <InputText label="اتمام ساعت کاری" type="text" id="name" message="">
              <input type="text" className="form__input pr-6" {...register("order_end")} />
            </InputText>
            <InputText label="میانگین زمان ارسال" type="text" id="name" message="">
              <input type="text" className="form__input pr-6" {...register("average_delivery_time")} />
            </InputText>
          </div>
          <button type="submit" className="add-btn col-span-12 mt-4 w-fit lg:col-span-5">
            ذخیره
          </button>
        </form>
      )}
    </>
  );
};
export default Form;
