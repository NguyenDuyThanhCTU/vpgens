"use client";
import { useStateProvider } from "@context/StateProvider";
import { Modal } from "antd";
import Image from "next/image";
import React from "react";
import { GoDotFill } from "react-icons/go";
import slugify from "slugify";
import Link from "next/link";
import { useUser } from "@context/UserProvider";
import { RxCross2 } from "react-icons/rx";
import { ProductProps } from "@assets/props/PropsProduct";
import { CategoryProps } from "@assets/props/Props";

interface QuickViewProps {
  Product: ProductProps | any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const QuickView = ({ Product, isOpen, setIsOpen }: QuickViewProps) => {
  const { isGlobal, isOpenModal, setOpenModal } = useStateProvider();
  const { isCart, setCart } = useUser();

  let ProductCategory: CategoryProps[] = isGlobal?.ProductCategory;

  const isGroup: any = isGlobal?.ProductCategory?.find(
    (item) => item.level0 === "Nhóm sản phẩm"
  );

  return (
    <>
      <Modal
        closeIcon={null}
        open={isOpen}
        footer={null}
        width={1000}
        centered={true}
        destroyOnClose={true}
        onCancel={() => setIsOpen(false)}
        className="reset_Modal"
      >
        <div className="p-4 grid p:grid-cols-1 d:grid-cols-3 font-Nunito items-center gap-4 relative">
          <div
            className="absolute d:-top-8  p:top-1 right-1 d:text-white p:text-black cursor-pointer p:text-[25px] d:text-[35px]"
            onClick={() => setIsOpen(false)}
          >
            <RxCross2 />
          </div>
          <div className="w-full aspect-square">
            <Image
              src={Product?.image}
              alt="quick-view-product"
              width={300}
              height={300}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-3">
            <h3 className="text-[24px]  font-bold">{Product?.title}</h3>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex items-center gap-1 font-normal">
                <GoDotFill className="text-[10px] text-mainOrange" />
                <span className="text-gray-600">
                  <strong>Mã sản phẩm</strong>:{" "}
                  {Product?.pId ? Product?.pId : "Đang cập nhật"}
                </span>
              </div>
              <div className="flex items-center gap-1 font-normal">
                <GoDotFill className="text-[10px] text-mainOrange" />
                <span className="text-gray-600">
                  <strong>Nhu cầu</strong>:{" "}
                  {Product?.grouplv1
                    ? `${isGroup.level1.find(
                        (item: string) =>
                          slugify(item, { lower: true, locale: "vi" }) ===
                          Product?.grouplv1
                      )}`
                    : "Đang cập nhật"}
                </span>
              </div>
              <div className="flex items-center gap-1 font-normal">
                <GoDotFill className="text-[10px] text-mainOrange" />
                <span className="text-gray-600">
                  <strong>Thương hiệu</strong>:{" "}
                  {Product?.branches ? Product?.branches : "Đang cập nhật"}
                </span>
              </div>
              <div className="flex items-center gap-1 font-normal">
                <GoDotFill className="text-[10px] text-mainOrange" />
                <span className="text-gray-600">
                  <strong>Dòng sản phẩm</strong>:{" "}
                  {Product?.level0
                    ? `${
                        ProductCategory.find(
                          (item) =>
                            slugify(item.level0, {
                              locale: "vi",
                              lower: true,
                            }) === Product?.level0
                        )?.level0
                      }`
                    : "Đang cập nhật"}
                </span>
              </div>
            </div>
            <div className="">
              <div>
                {Product?.price ? (
                  <>
                    {Product?.discount ? (
                      <div className=" d:text-[16px] p:text-[14px] font-bold flex gap-3  items-center text-mainRed">
                        <span className="line-through text-gray-400  font-normal">
                          {Product?.price}₫
                        </span>
                        <span className=" text-[24px]">
                          {Product?.newPrice}₫
                        </span>

                        <span className="text-white font-normal   bg-mainRed rounded-md px-4 py-1">
                          Tiết kiệm {Product?.discount}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-mainRed font-bold  d:text-[18px] p:text-[14px] text-[24px] ">
                        {Product?.price}₫
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-mainRed font-bold  d:text-[18px] p:text-[14px] text-[24px] ">
                    Giá đang cập nhật
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <span className=" text-[16px]">Mô tả sản phẩm:</span>
              <div className="col-span-3 h-[100px] overflow-auto scrollbar-thin  mt-2  border-4 border-mainBG">
                <div
                  className=" ck-content p-2"
                  dangerouslySetInnerHTML={
                    Product?.detail
                      ? { __html: Product?.detail }
                      : { __html: "" }
                  }
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div
                className="flex flex-col text-center border font-bold py-1 hover:border-mainOrange duration-300 cursor-pointer"
                onClick={() => {
                  setCart([...isCart, Product?.id]);
                  setOpenModal({ ...isOpenModal, AddCart: true });
                }}
              >
                <span className="uppercase text-[13px]">Thêm vào giỏ</span>
                <span className="text-[11px] d:block p:hidden">
                  Chọn ngay sản phẩm bạn yêu thích
                </span>
              </div>
              <Link
                className="flex flex-col text-center bg-mainOrange text-white font-bold py-1 hover:bg-mainRed duration-300"
                href={`/product/${Product?.url}`}
              >
                <span className="uppercase text-[13px]">Xem chi tiết</span>
                <span className="text-[11px] d:block p:hidden">
                  Tổng quan về sản phẩm
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuickView;
