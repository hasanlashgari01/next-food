"use client";

import { fileRoute } from "@/services/routeService";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { IFood } from "@/common/interface/food";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Score from "../Score/Score";
import Price from "../Food/Price";

interface ISlider {
  title: string;
  data: IFood[];
}

const FoodSlider: React.FC<ISlider> = ({ title, data }) => {
  return (
    <div className="my-3 font-Dana">
      <div>
        <h3 className="text-xl">{title}</h3>
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={swiper => console.log(swiper)}
          className="pb-20"
        >
          {data.map(item => (
            <SwiperSlide key={item._id}>
              <div className="w-full select-none">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-xl">
                  <Image
                    src={item.image ? `${fileRoute}food/${item.image}` : "/Auth.png"}
                    alt={item.title}
                    width={500}
                    height={500}
                    loading="lazy"
                    quality={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2.5 mt-4 line-clamp-1 text-base">
                  <Link href={`/food/${item._id}`}>{item.title}</Link>
                </h3>
                <div className="flex justify-between">
                  <Price price={item.price} discount={item.discount} />
                  <Score score={Number(item.rate)} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FoodSlider;
