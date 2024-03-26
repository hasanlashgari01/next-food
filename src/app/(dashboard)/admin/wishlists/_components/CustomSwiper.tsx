import FoodWishlist from "@/components/modules/Whishlist/FoodWishlist";
import RestaurantWishlist from "@/components/modules/Whishlist/RestaurantWishlist";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface CustomSwiperProps {
  data: any;
  title: string;
  status: "like" | "bookmark";
  notFoundMsg?: string;
  link: string;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({ data, title, status, notFoundMsg, link }) => {
  return (
    <section className="grid min-h-72 grid-cols-8 gap-4 md:gap-2">
      <div className="col-span-8 flex flex-row py-2.5 sm:px-5 xl:col-span-2 xl:flex-col">
        <div className="flex flex-1 gap-5">
          <span
            className={twMerge(
              "my-1.5 inline-block size-2.5 animate-pulse rounded-full bg-red-600",
              `${status === "like" ? "bg-red-600" : "bg-cyan-600"}`,
            )}
          ></span>
          <h3 className="flex-1">{title}</h3>
        </div>
        <div className="flex h-fit flex-col-reverse gap-3 xl:flex-row xl:items-center xl:justify-between">
          <Link
            href={`/admin/wishlists/${link}`}
            className="h-fit rounded-full bg-transparent px-2.5 py-1.5 text-center font-IranYekan text-sm text-primary-900 transition-colors hover:bg-cyan-600 hover:text-cyan-50"
          >
            مشاهده همه
          </Link>
        </div>
      </div>
      <div
        className={twMerge(
          "col-span-8 rounded-md xl:col-span-6 xl:rounded-3xl",
          `${data.length === 0 ? "flex min-h-40 flex-col justify-center outline-dashed outline-2 outline-current md:min-h-64" : "bg-current"}`,
        )}
      >
        {data.length > 0 ? (
          <Swiper
            breakpoints={{
              468: {
                slidesPerView: 1.6,
                spaceBetween: 10,
              },
              578: {
                slidesPerView: 1.4,
                spaceBetween: 20,
              },
              678: {
                slidesPerView: 1.6,
              },
              768: {
                slidesPerView: 2.5,
              },
              992: {
                slidesPerView: 3.2,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
            spaceBetween={10}
            slidesPerView={1.2}
            pagination={{ clickable: true }}
            className="swiper"
          >
            {data.slice(0, 8).map((item: any) => (
              <SwiperSlide key={item.id}>
                {item.title ? (
                  <FoodWishlist status={status} image={item.image} title={item.title} />
                ) : (
                  <RestaurantWishlist status={status} image={item.logo} name={item.name} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-base md:text-2xl">{notFoundMsg}</div>
        )}
      </div>
    </section>
  );
};
export default CustomSwiper;
