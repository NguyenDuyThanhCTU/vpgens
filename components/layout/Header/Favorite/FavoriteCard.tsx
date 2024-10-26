import { ProductProps } from "@assets/props/PropsProduct";
import { useStateProvider } from "@context/StateProvider";
import { useUser } from "@context/UserProvider";
import { Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { PiShoppingCartThin } from "react-icons/pi";

const FavoriteCard = ({ Product }: { Product: ProductProps }) => {
  const { isCart, setCart, isFavorite, setFavorite } = useUser();
  const { isOpenModal, setOpenModal } = useStateProvider();
  return (
    <div className="border border-mainOrange font-Nunito">
      <div className="p-6 grid grid-cols-3 gap-5">
        <div>
          <Image
            src={Product.image}
            alt="product"
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="col-span-2  flex flex-col gap-2">
          <h3 className="font-semibold text-[16px] truncate2">
            {Product.title}
          </h3>
          <div>
            {Product.price ? (
              <>
                {Product.discount ? (
                  <div className=" d:text-[14px] p:text-[12px] font-semibold flex gap-2 items-center text-mainRed">
                    <span className=" ">{Product.newPrice}₫</span>
                    <span className="line-through text-gray-400 text-[12px]">
                      {Product?.price}₫
                    </span>
                    <span>({Product?.discount}%)</span>
                  </div>
                ) : (
                  <span className="text-mainRed font-normal  d:text-[14px] p:text-[12px]">
                    {Product?.price}₫
                  </span>
                )}
              </>
            ) : (
              <span className="text-mainRed font-normal  d:text-[14px] p:text-[12px]">
                Giá đang cập nhật
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-[19px] text-gray-600">
            <div
              onClick={() =>
                setOpenModal({
                  ...isOpenModal,
                  quickView: {
                    state: true,
                    id: Product?.id,
                  },
                })
              }
              className="cursor-pointer"
            >
              <CiSearch />
            </div>
            <div
              className=" cursor-pointer"
              onClick={() => {
                setCart([...isCart, Product.id]);
                setOpenModal({ ...isOpenModal, AddCart: true });
              }}
            >
              <PiShoppingCartThin />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                const unfavorite = isFavorite.filter(
                  (item) => item !== Product.id
                );
                setFavorite(unfavorite);
                setOpenModal({ ...isOpenModal, RemoveFavor: true });
              }}
            >
              <MdOutlineDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
