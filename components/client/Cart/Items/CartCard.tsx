"use client";
import { productBillProps } from "@assets/props/PropsPayment";
import { ProductProps } from "@assets/props/PropsProduct";
import { useStateProvider } from "@context/StateProvider";
import { useUser } from "@context/UserProvider";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { PiTrash } from "react-icons/pi";

const CartCard = ({ Product }: { Product: productBillProps }) => {
  const { isCart, setCart } = useUser();
  const { setOpenModal, isOpenModal } = useStateProvider();

  const iProduct: ProductProps = Product.product;
  return (
    <div className="border-b py-8 border-dashed border-gray-500">
      <div className="flex justify-between">
        <div className="flex d:flex-row p:flex-col gap-2 ">
          <div>
            <Image
              src={iProduct.image}
              alt="product"
              width={200}
              height={200}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="pl-3 flex flex-col gap-2">
            <Link
              href={`/product/${iProduct.url}`}
              target="_blank"
              className="font-semibold p:text-[16px] d:text-[20px] hover:text-blue-600 duration-300"
            >
              {iProduct.title}
            </Link>
            <div>
              {iProduct.price ? (
                <div className="d:text-[18px] p:text-[14px] ">
                  {iProduct.discount ? (
                    <div className="flex gap-2 items-center">
                      <span>Giá:</span>
                      <span className="text-mainOrange ">
                        {" "}
                        {Number(
                          iProduct?.newPrice?.replace(/\s/g, "")
                        ).toLocaleString("vi-VN")}
                        ₫
                      </span>
                      <span className="line-through text-gray-400 ">
                        (
                        {Number(
                          iProduct?.price.replace(/\s/g, "")
                        ).toLocaleString("vi-VN")}
                        ₫)
                      </span>
                    </div>
                  ) : (
                    <span className="text-mainRed ">
                      {Number(
                        iProduct?.price.replace(/\s/g, "")
                      ).toLocaleString("vi-VN")}
                      ₫
                    </span>
                  )}
                </div>
              ) : (
                <span className="d:text-[18px] p:text-[14px] text-mainOrange">
                  Giá: đang cập nhật
                </span>
              )}
            </div>
            <div className="flex gap-5 items-center">
              <span>Số lượng:</span>
              <div className="border min-w-52 border-gray-500">
                <div className="p-1 flex items-center justify-between mx-1 text-[10px]">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      const idProduct = isCart.filter(
                        (item) => item === iProduct.id
                      );
                      const unIdProduct = isCart.filter(
                        (item) => item !== iProduct.id
                      );
                      idProduct.pop();
                      setCart([...unIdProduct, ...idProduct]);
                    }}
                  >
                    <HiOutlineMinus />
                  </div>
                  <div className="text-[16px]">{Product.quantity}</div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setCart([...isCart, iProduct.id]);
                      setOpenModal({ ...isOpenModal, AddCart: true });
                    }}
                  >
                    <HiOutlinePlus />
                  </div>
                </div>
              </div>
            </div>
            <div>
              {Product.totalPrice ? (
                <div className="d:text-[18px] p:text-[14px]">
                  {iProduct.discount ? (
                    <div className=" flex gap-2 items-center ">
                      <span>Thành tiền:</span>
                      <span className="font-semibold text-mainRed">
                        {Number(Product?.totalDiscount).toLocaleString("vi-VN")}
                        ₫
                      </span>
                      <span className="italic text-[14px] text-gray-500">
                        {" "}
                        (x{Product.quantity})
                      </span>
                    </div>
                  ) : (
                    <span className="text-mainRed ">
                      {Number(Product?.totalPrice).toLocaleString("vi-VN")}₫
                    </span>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            {iProduct.discount && (
              <div className="text-[14px]  italic text-mainRed">
                (Tiết kiệm{" "}
                {Number(Product.totaldiscountedAmount).toLocaleString("vi-VN")}
                ₫)
              </div>
            )}
            <div
              className="cursor-pointer underline text-mainRed"
              onClick={() => {
                const unIdProduct = isCart.filter(
                  (item) => item !== iProduct.id
                );
                setCart(unIdProduct);
              }}
            >
              Xóa sản phẩm
            </div>
          </div>
        </div>
        <div
          className="text-[30px] text-gray-600 d:block p:hidden cursor-pointer"
          onClick={() => {
            const unIdProduct = isCart.filter((item) => item !== iProduct.id);
            setCart(unIdProduct);
          }}
        >
          <PiTrash />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
