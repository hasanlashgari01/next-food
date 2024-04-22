"use client";

import { fileRoute } from "@/services/routeService";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Score from "../Score/Score";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ISliderProps {
  _id: string;
  name: string;
  logo: string;
  score: string;
  slug: string;
}

interface ISlider {
  title: string;
  data: ISliderProps[];
}

const Slider: React.FC<ISlider> = ({ title, data }) => {
  return (
    <div className="my-3 font-Dana">
      <div>
        <h3 className="text-xl">{title}</h3>
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            820: {
              slidesPerView: 3,
            },
          }}
          className="pb-20"
        >
          {data.map(item => (
            <SwiperSlide key={item._id}>
              <div className="max-w-40 select-none max-md:mx-auto md:w-full">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-xl">
                  <Image
                    src={item.logo ? `${fileRoute}restaurant/${item.logo}` : "/Auth.png"}
                    alt={item.name}
                    width={500}
                    height={500}
                    loading="lazy"
                    quality={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1.5 mt-4 line-clamp-1 text-base">
                  <Link href={`/restaurant/${item.slug}`}>{item.name}</Link>
                </h3>
                <Score score={Number(item.score)} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
