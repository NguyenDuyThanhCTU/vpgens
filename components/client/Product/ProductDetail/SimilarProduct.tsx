"use client";
import { useStateProvider } from "@context/StateProvider";
import Image from "next/image";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import ProductCard from "../ProductCard";
import { ProductProps } from "@assets/props/PropsProduct";

const SimilarProducts = ({ Type, Data }: any) => {
  const SimilarProducts: ProductProps[] = Data?.filter(
    (item: any) => item.level1 === Type
  );
  return (
    <div>
      <div className="mt-4">
        <h2 className="py-2 bg-red-500 text-center font-semibold text-white">
          Sản phẩm liên quan
        </h2>
        <div className="mt-5 d:block p:hidden">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            centerInsufficientSlides={true}
            centeredSlidesBounds={true}
            slidesPerView={4}
            slidesPerGroup={1}
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper "
          >
            {SimilarProducts?.map((items, idx) => (
              <SwiperSlide key={idx}>
                <ProductCard Product={items} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-5 d:hidden p:block">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            centerInsufficientSlides={true}
            centeredSlidesBounds={true}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper "
          >
            {SimilarProducts?.map((items, idx) => (
              <SwiperSlide key={idx}>
                <ProductCard Product={items} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
