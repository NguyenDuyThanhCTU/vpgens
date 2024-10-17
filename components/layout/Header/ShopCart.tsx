"use client";
import { productBillProps, ProductProps } from "@assets/props";
import { useStateProvider } from "@context/StateProvider";
import { useUser } from "@context/UserProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { Badge } from "antd";
import { typingEffect } from "@components/items/ClientHandle";
interface ShopCartProps {
  setIsOpen: (isOpen: any) => void;
  Data: ProductProps[];
}
const ShopCart = ({ setIsOpen, Data }: ShopCartProps) => {
  const [OpenNote, setOpenNote] = useState(false);
  const { setBill, Bill, isCart, setCart } = useUser();
  const { setOpenModal, isOpenModal } = useStateProvider();
  const texts = [
    "Chúng tôi có thể giúp gì cho bạn ...?",
    "Nhập ghi chú của bạn ...",
  ];
  return (
    <div className="font-Nunito flex flex-col justify-between h-full overflow-hidden text-[16px] font-normal">
      <div>
        <div className="w-full flex justify-between  items-center border-b-4 mt-2  border-slate-100 ml-5">
          <h2 className="w-full  uppercase text-[23px] tracking-widest font-semibold ">
            Giỏ hàng
          </h2>
          <div
            className="text-[25px] mr-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <RxCross2 />
          </div>
        </div>
        <div className="py-[10px] border-b px-5 text-[14px] grid grid-cols-4 relative">
          <div className="col-span-3">
            Mua thêm{" "}
            <strong className="border rounded-md border-mainOrange text-mainOrange px-1 font-semibold">
              50,000,000₫
            </strong>{" "}
            để được miễn phí giao hàng trên toàn quốc
          </div>
          <div className="relative">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/freeship.jpg?alt=media&token=a88ed17c-e9c3-4c4a-9560-afdbc4f68441"
              alt="free-ship"
              width={200}
              height={200}
              className="absolute -top-4"
            />
          </div>
        </div>
      </div>
      {Bill.products.length > 0 ? (
        <div className="flex flex-col gap-2 h-full overflow-y-auto scrollbar-thin">
          {Bill.products.map((item: productBillProps, idx) => {
            const iProduct: ProductProps = item.product;

            return (
              <div
                key={idx}
                className={`${
                  idx !== Bill.products.length - 1 && "border-b-2"
                }  mx-5 py-5  border-mainBG gap-4`}
              >
                <div key={idx} className={` grid grid-cols-3 gap-4`}>
                  <div className="h-[100px] mx-2">
                    {iProduct.discount ? (
                      <Badge
                        count={`${iProduct.discount}%`}
                        color="red"
                        showZero
                      >
                        <Image
                          src={iProduct.image}
                          alt="product"
                          width={150}
                          height={150}
                          className="w-full h-full object-contain"
                        />
                      </Badge>
                    ) : (
                      <Image
                        src={iProduct.image}
                        alt="product"
                        width={150}
                        height={150}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <h3 className="uppercase text-[14px]">{iProduct.title}</h3>
                    <div>
                      {iProduct.price ? (
                        <div className="d:text-[14px] p:text-[12px] font-bold">
                          {iProduct.discount ? (
                            <div className=" flex gap-2 items-center text-mainRed ">
                              <span className=" ">
                                {" "}
                                {Number(
                                  iProduct?.newPrice?.replace(/\s/g, "")
                                ).toLocaleString("vi-VN")}
                                ₫
                              </span>
                              <span className="line-through text-gray-600  text-[14px]">
                                {Number(
                                  iProduct?.price.replace(/\s/g, "")
                                ).toLocaleString("vi-VN")}
                                ₫
                              </span>
                              <div className="text-end w-full">
                                x{item.quantity}
                              </div>
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
                        <span className="text-mainRed font-semibold  d:text-[14px] p:text-[12px]">
                          Giá đang cập nhật
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 items-center">
                      <div className="border">
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
                          <div className="text-[16px]">{item.quantity}</div>
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
                      <div className="text-end">
                        <span
                          className="text-[12px] border-b-[1px] border-black uppercase font-light cursor-pointer"
                          onClick={() => {
                            const unIdProduct = isCart.filter(
                              (item) => item !== iProduct.id
                            );
                            setCart(unIdProduct);
                          }}
                        >
                          {" "}
                          xóa
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div>
                    {item.totalPrice ? (
                      <div className="d:text-[18px] p:text-[14px] font-bold">
                        {iProduct.discount ? (
                          <div className=" flex gap-2 items-center text-mainRed">
                            <span>Số lượng x{item.quantity}:</span>
                            <span className=" ">
                              {" "}
                              {Number(item?.totalDiscount).toLocaleString(
                                "vi-VN"
                              )}
                              ₫
                            </span>
                            <span className="line-through text-gray-600  text-[14px]">
                              {Number(item?.totalPrice).toLocaleString("vi-VN")}
                              ₫
                            </span>
                          </div>
                        ) : (
                          <span className="text-mainRed ">
                            {Number(item?.totalPrice).toLocaleString("vi-VN")}₫
                          </span>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center">Giỏ hàng của bạn còn trống</div>
      )}
      <div className="border-t border-gray-200 relative">
        <div className="p-3">
          <div className="flex justify-between">
            <div
              className="text-gray-500 text-[15px] cursor-pointer"
              onClick={() => setOpenNote(true)}
            >
              Thêm ghi chú
            </div>
            {/* <Link href={`/cart`} className="font-normal text-[16px]">
              Xem chi tiết giỏ hàng
            </Link> */}
          </div>
          <p className="py-2">Phí ship & thuế được tính ở Trang Thanh Toán</p>
          <Link
            href={`/cart`}
            onClick={() => setIsOpen(false)}
            className="py-4 bg-[#F30]  justify-center uppercase flex items-center gap-4 font-semibold mt-3 hover:bg-red-600 duration-300 cursor-pointer"
          >
            <span className="text-white"> Thanh toán</span>
            <span className="w-[3px] h-[3px] rounded-full bg-white"></span>
            <span className="text-white">
              {Bill.totalDiscountPrice !== "0"
                ? `${Number(Bill.totalDiscountPrice).toLocaleString("vi-VN")}₫`
                : `${Number(Bill.totalPrice).toLocaleString("vi-VN")}₫`}
            </span>
          </Link>
        </div>
        <div
          className={`animate__animated ${
            OpenNote ? "animate__backInUp" : "animate__backOutDown"
          } w-full h-[200px] absolute bg-white bottom-0 border-t shadow-gray-200 shadow-inner`}
        >
          <div className="p-5 flex flex-col gap-4">
            <span>Thêm ghi chú</span>
            <textarea
              value={Bill.note}
              placeholder={typingEffect(texts, 50)}
              className="border p-2 outline-none text-black"
              onChange={(e) => setBill({ ...Bill, note: e.target.value })}
            />
            <div
              className="text-center py-3 border border-black cursor-pointer"
              onClick={() => setOpenNote(false)}
            >
              Lưu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCart;
