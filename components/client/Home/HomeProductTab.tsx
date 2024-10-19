"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import slugify from "slugify";
import Cart from "@components/modal/Cart";
import { ProductProps } from "@assets/props/PropsProduct";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GiPig } from "react-icons/gi";
import { BsBoxSeam } from "react-icons/bs";
import ProductCard from "../Product/ProductCard";

const HomeProductTab = ({ Data }: { Data: ProductProps[] }) => {
  const [isOpenShoppingCart, setOpenShoppingCart] = useState(false);
  const [isCurrentCategory, setCurrentCategory] = useState({
    title: "Giống heo sinh sản cao",
    background:
      "https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/product-tab-1.jpg?alt=media&token=b67288b6-eb14-4717-94dd-5cbfa14df7b4",
  });

  const GroupProducts = Data?.filter((item) => item.group === true);

  const [Datashow, setDatashow] = useState<ProductProps[]>(
    GroupProducts?.filter(
      (Gitem) => Gitem.grouplv1 === "giong-heo-sinh-san-cao"
    )
  );
  const CategoryItems = [
    {
      iconWhite: <FaArrowTrendUp className="" />,

      iconBlack: <FaArrowTrendUp className="text-black" />,
      label: "Giống heo sinh sản cao",
      background:
        "https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/product-tab-1.jpg?alt=media&token=b67288b6-eb14-4717-94dd-5cbfa14df7b4",
    },
    {
      iconWhite: <GiPig className="" />,

      iconBlack: <GiPig className="text-black" />,
      label: "Giống heo thích nghi cao",
      background:
        "https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/product-tab-2.jpg?alt=media&token=b67288b6-eb14-4717-94dd-5cbfa14df7b4",
    },
    {
      iconWhite: <BsBoxSeam className="" />,

      iconBlack: <BsBoxSeam className="text-black" />,
      label: "Giống heo tăng trọng tốt",
      background:
        "https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/product-tab-3.jpg?alt=media&token=b67288b6-eb14-4717-94dd-5cbfa14df7b4",
    },
  ];

  return (
    <div
      id="product"
      className="d:w-[1400px] d:mx-auto p:w-auto p:mx-2 mb-[40px]"
    >
      <div className="grid p:grid-cols-1 d:grid-cols-3 gap-2 ">
        <div className="grid d:grid-rows-5 gap-2">
          {CategoryItems.map((item, idx) => (
            <div
              key={idx}
              className={`${
                isCurrentCategory.title === item.label
                  ? "bg-main text-white"
                  : "bg-mainBG text-black"
              } flex items-center gap-5 py-[6px]  px-[10px] rounded-sm group cursor-pointer`}
              onClick={() => {
                const isShowData = GroupProducts?.filter(
                  (Gitem) =>
                    Gitem.grouplv1 ===
                    slugify(item.label, { locale: "vi", lower: true })
                );
                setDatashow(isShowData);
                setCurrentCategory({
                  title: item.label,
                  background: item.background,
                });
              }}
            >
              <div className="text-[25px] p-1">
                {isCurrentCategory.title === item.label
                  ? item.iconWhite
                  : item.iconBlack}
                {/* <Image
                  src={
                    isCurrentCategory.title === item.label
                      ? item.iconWhite
                      : item.iconBlack
                  }
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-full h-full p-1 duration-300"
                /> */}
              </div>
              <div className="flex flex-col gap-1">
                <h3
                  className={`${
                    isCurrentCategory.title !== item.label &&
                    "group-hover:text-mainRed "
                  } font-semibold duration-300`}
                >
                  {item.label}
                </h3>
                <span className="">
                  {
                    GroupProducts?.filter(
                      (Gitem) =>
                        Gitem.grouplv1 ===
                        slugify(item.label, { locale: "vi", lower: true })
                    ).length
                  }{" "}
                  sản phẩm
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2">
          <Image
            onClick={() => setOpenShoppingCart(true)}
            src={isCurrentCategory.background}
            alt="bg"
            width={2000}
            height={1500}
            className="w-full h-full object-cover duration-300 animate__fadeInDown animate__animated"
          />
        </div>
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
      {isOpenShoppingCart && (
        <Cart
          isOpen={isOpenShoppingCart}
          setIsOpen={setOpenShoppingCart}
          Products={Data}
        />
      )}
    </div>
  );
};

export default HomeProductTab;
