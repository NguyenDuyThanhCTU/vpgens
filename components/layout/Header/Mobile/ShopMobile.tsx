"use client";
import React from "react";
import { BiSupport } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { BsNewspaper } from "react-icons/bs";
import { PiLampFill } from "react-icons/pi";
import Link from "next/link";
import { useStateProvider } from "@context/StateProvider";
import { ContactProps, GlobalProps } from "@assets/props";
import { LocalFindById } from "@components/items/Handle";
const ShopMobile = () => {
  const { isGlobal } = useStateProvider();

  const ContactData: ContactProps = LocalFindById(isGlobal?.Config, "contact");
  return (
    <div className="p:block d:hidden fixed bottom-0 w-full bg-mainOrange text-white">
      <div className="grid grid-cols-4  h-[60px]">
        <Link
          href={`/`}
          className="border-r border-white flex flex-col items-center h-full justify-center"
        >
          <FaHome className="text-[25px]" />
          <span className="text-[12px]">Trang chủ</span>
        </Link>
        <Link
          href={`/gioi-thieu`}
          className="border-r border-white flex flex-col items-center h-full justify-center"
        >
          <PiLampFill className="text-[25px]" />
          <span className="text-[12px]">Giới thiệu</span>
        </Link>
        <Link
          href={`/blogs/tin-tuc`}
          className="border-r border-white flex flex-col items-center h-full justify-center"
        >
          <BsNewspaper className="text-[25px]" />
          <span className="text-[12px]">Tin tức</span>
        </Link>
        <Link
          href={`tel:${ContactData?.Hotline}`}
          className="border-r border-white flex flex-col items-center h-full justify-center"
        >
          <BiSupport className="text-[25px]" />
          <span className="text-[12px]">Hỗ trợ 24/7</span>
        </Link>
      </div>
    </div>
  );
};

export default ShopMobile;
