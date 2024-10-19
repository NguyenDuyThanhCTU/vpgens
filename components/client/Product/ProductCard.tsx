"use client";
import { ProductProps } from "@assets/props";
import AddCart from "@components/items/Modal/AddCart";
import RemoveFavor from "@components/items/Modal/RemoveFavor";
import QuickView from "@components/items/QuickView/QuickView";
import { useStateProvider } from "@context/StateProvider";
import { useUser } from "@context/UserProvider";
import { Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { PiMagicWand } from "react-icons/pi";
import { SlHeart } from "react-icons/sl";

const ProductCard = ({ Product }: { Product: ProductProps }) => {
  const [isOpenFavorite, setOpenFavorite] = useState(false);

  const { setFavorite, isFavorite, setCart, isCart } = useUser();
  const { isOpenModal, setOpenModal } = useStateProvider();
  return (
    <div className="border border-mainBG shadow-sm shadow-gray-300">
      <div>
        {/* <div className="p-2 flex justify-between w-full items-center">
          <div>
            {Product.discount && (
              <span className="bg-mainRed px-2 py-1 text-white text-[14px]">
                -${Product.discount}%
              </span>
            )}
          </div>
          <div>
            <div className="p-2 bg-mainBG text-black rounded-sm">
              <SlHeart />
            </div>
          </div>
        </div> */}
        <div className=" p:h-[125px] d:h-[250px] w-full    group overflow-hidden ">
          <div className="relative h-full w-full">
            <Link
              href={`/product/${Product?.url}`}
              className="w-full  z-10 relative h-full"
            >
              <Image
                src={Product?.image}
                alt={Product?.pId}
                width={320}
                height={320}
                className={`${
                  Product?.subimage
                    ? "group-hover:opacity-0"
                    : "group-hover:opacity-1"
                }  object-cover opacity-1  duration-300 w-full h-full`}
              />
            </Link>
            {Product?.subimage && (
              <div className="w-full top-0  absolute d:block p:hidden">
                <Image
                  src={
                    Product?.subimage
                      ? Product?.subimage[Product?.subimage.length - 1]?.url
                      : ""
                  }
                  alt={Product?.pId}
                  width={320}
                  height={320}
                  className=" w-full h-full object-cover object-center group-hover:scale-105 duration-300"
                />
              </div>
            )}

            <div className="p:hidden d:flex w-full text-[22px]  justify-center absolute group-hover:bottom-5 cursor-pointer -bottom-14 duration-300 z-10">
              <div
                className=" p-3 bg-white rounded-l-md border-r hover:bg-black hover:text-white duration-300"
                onClick={() => {
                  setCart([...isCart, Product.id]);
                  setOpenModal({ ...isOpenModal, AddCart: true });
                }}
              >
                <FaShoppingCart />
              </div>

              <div
                className=" p-3 bg-white rounded-r-md hover:bg-black hover:text-white duration-700"
                onClick={() => {
                  setOpenModal({
                    ...isOpenModal,
                    quickView: {
                      state: true,
                      id: Product.id,
                    },
                  });
                }}
              >
                <IoEyeSharp />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="w-full flex justify-between items-center mt-3">
          <div className="d:block p:hidden"></div>
          <div className="flex justify-center items-center gap-2 py-2">
            {Product.subimage?.slice(0, 3).map((item, idx) => (
              <div key={idx} className="border p:w-5 p:h-5 d:w-10 d:h-10">
                <Image
                  src={item.url}
                  alt="subiimage"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div>
            <div
              className={`${
                isFavorite.includes(Product.id)
                  ? "bg-mainOrange text-white"
                  : "bg-mainBG text-black "
              } p-2  rounded-sm cursor-pointer `}
              onClick={() => {
                if (isFavorite.includes(Product.id)) {
                  const unfavorite = isFavorite.filter(
                    (item) => item !== Product.id
                  );
                  setFavorite(unfavorite);
                  setOpenModal({ ...isOpenModal, favorite: true });
                } else {
                  setFavorite([...isFavorite, Product.id]);
                  setOpenFavorite(true);
                }
              }}
            >
              <SlHeart />
            </div>
          </div>
        </div>
        <div className="text-gray-400 d:text-[14px] h-[21px] p:text-[11px]">
          {Product.pId ? Product.pId : " "}
        </div>

        <Link
          href={`/product/${Product?.url}`}
          className="font-normal truncate2 hover:text-blue-600 duration-300 p:h-auto d:h-[48px] d:text-[16px] p:text-[14px]"
        >
          {Product.title}
        </Link>
        <span className="text-mainRed font-normal  d:text-[16px] p:text-[14px]">
          {Product?.newPrice
            ? `${Product.newPrice}₫`
            : `${Product?.price ? `${Product.price}₫` : "Giá đang cập nhật"}`}
        </span>
        {Product.discount ? (
          <div className="flex justify-between p:items-start d:items-center d:flex-row p:flex-col gap-1 ">
            <div className="p:text-[12px] d:text-[14px] mt-1">
              <span className="text-gray-500 line-through">
                {Product.price}
              </span>

              <span className="bg-mainRed px-2 py-1 text-white  rounded-full ml-2">
                -{Product.discount}%
              </span>
            </div>
            <span className="text-[13px]">(5 đánh giá)</span>
          </div>
        ) : (
          <div className="justify-between flex p:items-start d:items-center d:flex-row p:flex-col p:h-[45px] d:h-auto">
            <div className="h-[21px]"></div>
            <span className="text-[13px]">(2 đánh giá)</span>
          </div>
        )}
      </div>

      <>
        <Modal
          closeIcon={null}
          open={isOpenFavorite}
          footer={null}
          width={500}
          centered={true}
          destroyOnClose={true}
          onCancel={() => setOpenFavorite(false)}
          className="animate__animated  "
        >
          <div className="font-LexendDeca flex flex-col gap-4 justify-center items-center">
            <PiMagicWand className="text-[60px] text-mainOrange " />
            <span className="d:text-[16px] p:text-[14px]">
              Bạn vừa thêm 1 sản phẩm vào mục yêu thích thành công!
            </span>
            <div className="flex justify-center mt-2">
              <div
                className="bg-mainOrange text-[18px] px-8 py-2 rounded-md text-white cursor-pointer hover:bg-mainRed duration-300"
                onClick={() => setOpenFavorite(false)}
              >
                OK
              </div>
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default ProductCard;
