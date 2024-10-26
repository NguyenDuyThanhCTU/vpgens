"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import Image from "next/image";
import { SlideProps } from "@assets/props/Props";
import Link from "next/link";

interface HomeSlideProps {
  Data: SlideProps[];
}

const HomeSlide = ({ Data }: HomeSlideProps) => {
  const mobile = Data?.filter((item) => item.platform === "mobile");
  const desktop = Data?.filter((item) => item.platform === "desktop");

  const introItems = [
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/subslide-1.jpg?alt=media&token=1efbd8eb-3362-4ce7-8f1e-42f95cab9033",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/subslide-2.jpg?alt=media&token=1efbd8eb-3362-4ce7-8f1e-42f95cab9033",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/subslide-3.jpg?alt=media&token=1efbd8eb-3362-4ce7-8f1e-42f95cab9033",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/subslide-4.jpg?alt=media&token=1efbd8eb-3362-4ce7-8f1e-42f95cab9033",
    },
  ];

  return (
    <div>
      <div className="d:block p:hidden">
        <Swiper
          effect={"fade"}
          slidesPerView={1}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination, EffectFade, Autoplay]}
          className="custom-pagination bg-[#4a3d3d30] "
        >
          {desktop.map((item, idx) => (
            <SwiperSlide className="h-full w-full" key={idx}>
              <Link
                href={`${
                  item.type === "Sản phẩm"
                    ? `/product/${item.url}`
                    : `/${item.url}`
                }`}
              >
                <Image
                  src={item.image}
                  alt="banner"
                  width={2000}
                  height={1000}
                  className="w-full h-full"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="d:hidden p:block">
        <Swiper
          effect={"fade"}
          slidesPerView={1}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination, EffectFade]}
          className="custom-pagination bg-[#4a3d3d30] "
        >
          {mobile.map((item, idx) => (
            <SwiperSlide className="h-full w-full" key={idx}>
              <Link
                href={`${
                  item.type === "Sản phẩm"
                    ? `/product/${item.url}`
                    : `/${item.url}`
                }`}
              >
                <Image
                  src={item.image}
                  alt="banner"
                  width={1000}
                  height={500}
                  className="w-full h-full bordr"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="d:w-[1400px] d:mx-auto p:w-auto p:mx-2 py-5 grid p:grid-cols-2 d:grid-cols-4 gap-4">
        {introItems.map((item, idx) => (
          <div key={idx} className="overflow-hidden">
            <Image
              src={item.image}
              alt="intro"
              width={400}
              height={400}
              className="hover:scale-105 duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSlide;
