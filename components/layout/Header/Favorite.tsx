"use client";
import { ProductProps } from "@assets/props";
import { useUser } from "@context/UserProvider";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import FavoriteCard from "./Favorite/FavoriteCard";

interface FavoriteProps {
  setIsOpen: (isOpen: any) => void;
  Data: ProductProps[];
}

const Favorite = ({ setIsOpen, Data }: FavoriteProps) => {
  const { isFavorite } = useUser();

  const favoriteProducts: ProductProps[] = Data.filter((Data) =>
    isFavorite.includes(Data.id)
  );

  return (
    <div>
      <div className="bg-mainOrange font-Nunito">
        <div className="p:w-auto d:w-[1400px] h-[46px] flex justify-between p:mx-2 d:mx-auto items-center text-white p:text-[18px] d:text-[25px]">
          <div className=" font-semibold">Danh mục sản phẩm yêu thích</div>
          <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <RxCross2 />
          </div>
        </div>
      </div>
      <div className="p:w-auto d:w-[1400px] min-h-[50px] d:mx-auto p:mx-2 flex justify-center items-center ">
        {isFavorite.length > 0 ? (
          <div className="">
            <div className="mt-3 d:block p:hidden w-[1400px] mx-auto">
              <Swiper
                spaceBetween={20}
                slidesPerView={3}
                slidesPerGroup={1}
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                className="custom-pagination "
                style={{ paddingBottom: "40px" }}
              >
                {favoriteProducts?.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <FavoriteCard Product={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-3 d:hidden p:block w-[95vw] ">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                slidesPerGroup={1}
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                className="custom-pagination "
                style={{ paddingBottom: "40px" }}
              >
                {favoriteProducts?.map((item, idx) => (
                  <SwiperSlide key={idx} className="">
                    <FavoriteCard Product={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ) : (
          <span className="font-normal text-[16px]">
            Chưa có sản phẩm trong danh sách yêu thích
          </span>
        )}
      </div>
    </div>
  );
};

export default Favorite;
