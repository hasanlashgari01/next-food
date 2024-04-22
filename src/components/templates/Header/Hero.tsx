import Image from "next/image";
import SelectProvinceModal from "./SelectProvinceModal";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="container">
      <div className="relative mt-10 flex h-fit flex-col items-center gap-10 md:flex-row-reverse md:justify-evenly lg:min-h-[70dvh] xl:mx-10 xl:items-center xl:justify-between 2xl:mx-0">
        <div className="flex h-fit w-full items-center max-xl:max-w-80 xl:basis-[448px]">
          <div className="relative w-auto px-8 pb-2">
            <Image src="/home/user.png" width={2000} height={2000} alt="" priority />

            <Image
              src="/home/seek.png"
              width={1000}
              height={1000}
              alt=""
              className="absolute -top-8 right-4 w-20 object-cover xs:w-24 xl:w-36"
            />
            <Image src="/home/line.svg" width={500} height={500} alt="" className="absolute inset-x-0 -bottom-7" />
            <Image
              src="/home/food-1.png"
              width={500}
              height={500}
              alt=""
              className="absolute -left-4 bottom-4 w-24 object-cover xs:-left-8 xs:bottom-10 xl:-left-12 xl:bottom-8 xl:w-40"
            />
            <Image
              src="/home/food-2.png"
              width={500}
              height={500}
              alt=""
              className="absolute -bottom-10 left-16 w-20 object-cover xs:-bottom-8 xs:left-14 xs:w-24 xl:-bottom-16 xl:left-20 xl:w-36"
            />
            <Image
              src="/home/food-3.png"
              width={500}
              height={500}
              alt=""
              className="absolute -bottom-10 right-16 w-[5.5rem] object-cover xs:right-14 xs:w-[6.5rem] xl:-bottom-16 xl:w-40"
            />
            <Image
              src="/home/food-4.png"
              width={500}
              height={500}
              alt=""
              className="absolute -right-4 bottom-6 w-20 object-cover xs:-right-8 xs:bottom-10 xs:w-24 xl:-right-12 xl:bottom-14 xl:w-32"
            />
          </div>
        </div>

        <div className="relative basis-72 py-6 font-Dana lg:basis-96 xl:shrink-0">
          <h1 className="mb-4 text-xl md:text-2xl lg:mb-8 lg:text-3xl">سفارش آنلاین غذا</h1>
          <SelectProvinceModal />
        </div>
      </div>
    </div>
  );
};

export default Hero;
