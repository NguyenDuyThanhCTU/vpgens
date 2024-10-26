"use client";
import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ProductCard from "../Product/ProductCard";
import { ProductProps } from "@assets/props/PropsProduct";

const HomeCollection = ({ Data }: { Data: ProductProps[] }) => {
  const [isOpenCollection, setOpenCollection] = useState<
    "Khuyến mãi" | "Sale Off" | "News Sale" | "Mới nhất" | "Bán chạy"
  >();

  const [Datashow, setDatashow] = useState<ProductProps[]>();
  const [isOpenDot, setOpenDot] = useState({
    first: false,
    second: false,
    third: false,
    four: "",
  });

  useEffect(() => {
    if (isOpenCollection === "Bán chạy") {
      const Datafilter = Data?.filter((item) => item.bestselling === true);
      if (Datafilter) {
        setDatashow(Datafilter);
      }
    } else if (isOpenCollection === "News Sale") {
      const Datafilter = Data?.filter((item) => item.discount);
      if (Datafilter) {
        setDatashow(Datafilter.slice(0, 6));
      }
    } else if (isOpenCollection === "Mới nhất") {
      const Datafilter = Data?.filter((item) => item.latest === true);
      if (Datafilter) {
        setDatashow(Datafilter);
      }
    } else if (isOpenCollection === "Sale Off") {
      const Datafilter = Data?.filter((item) => item.discount);
      if (Datafilter) {
        setDatashow(Datafilter.slice(6, 13));
      }
    } else if (isOpenCollection === "Khuyến mãi") {
      const Datafilter = Data?.filter((item) => item.discount);
      if (Datafilter) {
        setDatashow(Datafilter.slice(13, 20));
      }
    }
  }, [isOpenCollection]);

  return (
    <>
      <div className="py-10">
        <div className="d:w-[1400px] p:w-auto d:mx-auto p:mx-2">
          <div className="text-center">
            <h2 className="text-[30px] font-semibold">Khám phá</h2>
            <p className="text-gray-400">
              Cùng nhau khám phá trang trại Việt Thái ngay!
            </p>
          </div>

          <div className="mt-5 d:text-[20px] p:text-[15px]">
            <div className="grid p:grid-cols-1 d:grid-cols-2 gap-8">
              <div className="grid grid-cols-2 p:gap-2 d:gap-8">
                <ScrollLink
                  to="collection"
                  duration={500}
                  smooth={true}
                  className="w-full aspect-square  border-[10px] border-[#DbDbDb] relative overflow-hidden cursor-pointer"
                >
                  <span className="absolute w-full p:bottom-2 d:bottom-5 text-center uppercase font-normal  z-10">
                    Bộ Sưu tập
                  </span>
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/collection-1.jpg?alt=media&token=e220a61d-2fa1-4066-a2bd-b0a57e8a4ad6"
                    alt="collection"
                    width={300}
                    height={300}
                    className="w-full h-full hover:scale-110 duration-1000"
                  />
                </ScrollLink>
                <ScrollLink
                  to="coupon"
                  duration={500}
                  smooth={true}
                  className="w-full aspect-square border-[10px] border-[#DbDbDb] relative overflow-hidden cursor-pointer"
                >
                  <span className="absolute w-full p:top-2 d:top-5 text-center uppercase font-normal  z-10">
                    Coupon Hot
                  </span>
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/collection-2.jpg?alt=media&token=e220a61d-2fa1-4066-a2bd-b0a57e8a4ad6"
                    alt="collection"
                    width={300}
                    height={300}
                    className="w-full h-full hover:scale-110 duration-1000"
                  />
                </ScrollLink>
              </div>
              <ScrollLink
                to="product"
                duration={500}
                smooth={true}
                className="w-full border-[10px] border-[#DbDbDb] relative overflow-hidden cursor-pointer"
              >
                <span className="absolute w-max p:bottom-2 d:bottom-5 left-5 uppercase font-normal  z-10">
                  Sản phẩm
                </span>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/collection-3.jpg?alt=media&token=e220a61d-2fa1-4066-a2bd-b0a57e8a4ad6"
                  alt="collection"
                  width={1000}
                  height={600}
                  className="w-full h-full hover:scale-110 duration-1000"
                />
              </ScrollLink>
            </div>
            {/* {isOpenCollection && (
              <div
                className={`py-10 animate__animated  ${
                  isOpenCollection === "Khuyến mãi"
                    ? "animate__backInUp "
                    : isOpenCollection === "Sale Off"
                    ? "animate__flipInY "
                    : isOpenCollection === "News Sale"
                    ? "animate__rotateInDownRight "
                    : isOpenCollection === "Mới nhất"
                    ? "animate__zoomInUp "
                    : isOpenCollection === "Bán chạy" && "animate__zoomInUp "
                }`}
              >
                <div className="text-center">
                  <h2 className="text-[30px] font-semibold">
                    {isOpenCollection}
                  </h2>
                </div>
                <div className="mt-3 d:block p:hidden">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    slidesPerGroup={1}
                    modules={[Pagination]}
                    pagination={{
                      clickable: true,
                    }}
                    className="custom-pagination "
                    style={{ paddingBottom: "40px" }}
                  >
                    {Datashow?.map((item, idx) => (
                      <SwiperSlide key={idx}>
                        <ProductCard Product={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="mt-3 d:hidden p:block">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    slidesPerGroup={1}
                    modules={[Pagination]}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    className="custom-pagination "
                    style={{ paddingBottom: "40px" }}
                  >
                    {Datashow?.map((item, idx) => (
                      <SwiperSlide key={idx}>
                        <ProductCard Product={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )} */}
            <div className="grid p:grid-cols-1 d:grid-cols-2 gap-8 mt-8">
              <ScrollLink
                to="news"
                duration={500}
                smooth={true}
                className="w-full border-[10px] border-[#DbDbDb] relative overflow-hidden cursor-pointer"
              >
                <span className="absolute w-max p:bottom-2 d:bottom-5 left-5 uppercase font-normal  z-10">
                  Tin tức
                </span>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/collection-4.jpg?alt=media&token=e220a61d-2fa1-4066-a2bd-b0a57e8a4ad6"
                  alt="collection"
                  width={1000}
                  height={600}
                  className="w-full h-full hover:scale-110 duration-1000"
                />
              </ScrollLink>
              <div className="grid grid-cols-2 p:gap-2 d:gap-8">
                <ScrollLink
                  to="hottrend"
                  duration={500}
                  smooth={true}
                  className="w-full aspect-square border-[10px] border-[#DbDbDb] relative overflow-hidden cursor-pointer"
                >
                  <span className="absolute w-full p:top-2 d:top-5 text-center uppercase font-normal  z-10">
                    Hot trend
                  </span>
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/collection-5.jpg?alt=media&token=e220a61d-2fa1-4066-a2bd-b0a57e8a4ad6"
                    alt="collection"
                    width={300}
                    height={300}
                    className="w-full h-full hover:scale-110 duration-1000"
                  />
                </ScrollLink>
                <ScrollLink
                  to="new-letter"
                  duration={500}
                  smooth={true}
                  className="w-full aspect-square border-[10px] border-[#DbDbDb] relative overflow-hidden cursor-pointer"
                >
                  <span className="absolute w-full p:bottom-2 d:bottom-5 text-center uppercase font-normal  z-10">
                    Về Việt Thái
                  </span>
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/collection-6.jpg?alt=media&token=e220a61d-2fa1-4066-a2bd-b0a57e8a4ad6"
                    alt="collection"
                    width={300}
                    height={300}
                    className="w-full h-full hover:scale-110 duration-1000"
                  />
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen relative">
        <div className="w-full h-screen relative">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/collection-bg.jpg?alt=media&token=42a70016-014b-44ce-b719-53072bfefbf2"
            alt="bg"
            width={2000}
            height={2000}
            className="object-cover w-full h-full"
          />
          <div className="absolute w-full h-full bg-[rgba(0,0,0,0.39)] top-0 "></div>
        </div>

        <Popover
          content={Data ? <ProductCard Product={Data[0]} /> : null}
          placement="right"
          trigger="click"
          open={isOpenDot.first}
          onOpenChange={() => {
            if (isOpenDot.first) {
              setOpenDot({ ...isOpenDot, first: false });
            } else {
              setOpenDot({ ...isOpenDot, first: true });
            }
          }}
        >
          <div className=" absolute  h-8 w-8 top-[40%] left-[30%]">
            <div className="w-full h-full absolute bg-[rgba(255,255,255,0.5)] rounded-full scale-animation"></div>
            <div className="h-full w-full bg-none rounded-full flex items-center justify-center z-10 absolute  ">
              <div className="w-[80%] h-[80%] bg-mainOrange rounded-full flex items-center justify-center">
                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </Popover>
        <Popover
          content={Data ? <ProductCard Product={Data[1]} /> : null}
          placement="right"
          trigger="click"
          open={isOpenDot.second}
          onOpenChange={() => {
            if (isOpenDot.second) {
              setOpenDot({ ...isOpenDot, second: false });
            } else {
              setOpenDot({ ...isOpenDot, second: true });
            }
          }}
        >
          <div className=" absolute  h-8 w-8 top-[75%] left-[27%]">
            <div className="w-full h-full absolute bg-[rgba(255,255,255,0.5)] rounded-full scale-animation"></div>
            <div className="h-full w-full bg-none rounded-full flex items-center justify-center z-10 absolute  ">
              <div className="w-[80%] h-[80%] bg-mainOrange rounded-full flex items-center justify-center">
                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </Popover>
        <Popover
          content={Data ? <ProductCard Product={Data[2]} /> : null}
          placement="right"
          trigger="click"
          open={isOpenDot.third}
          onOpenChange={() => {
            if (isOpenDot.third) {
              setOpenDot({ ...isOpenDot, third: false });
            } else {
              setOpenDot({ ...isOpenDot, third: true });
            }
          }}
        >
          <div className=" absolute  h-8 w-8 top-[60%] left-[75%]">
            <div className="w-full h-full absolute bg-[rgba(255,255,255,0.5)] rounded-full scale-animation"></div>
            <div className="h-full w-full bg-none rounded-full flex items-center justify-center z-10 absolute  ">
              <div className="w-[80%] h-[80%] bg-mainOrange rounded-full flex items-center justify-center">
                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </Popover>

        {/* <div className=" absolute  h-8 w-8 top-[41%] left-[80%]">
          <div className="w-full h-full absolute bg-[rgba(255,255,255,0.5)] rounded-full scale-animation"></div>
          <div className="h-full w-full bg-none rounded-full flex items-center justify-center z-10 absolute  ">
            <div className="w-[80%] h-[80%] bg-mainOrange rounded-full flex items-center justify-center">
              <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default HomeCollection;
