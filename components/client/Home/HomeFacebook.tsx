"use client";
import { CollectionProps } from "@assets/props/Props";
import { SocialMediaProps } from "@assets/props/PropsConfig";
import { LocalFindById } from "@components/items/Handle";
import { Image } from "antd";
import Link from "next/link";
import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { MdArrowRight } from "react-icons/md";
interface HomeFacebookProps {
  Data: CollectionProps[];
  Config: Array<any>;
}
const HomeFacebook = ({ Data, Config }: HomeFacebookProps) => {
  const ImageCollection = Data?.filter((item) => item.type === "hinh-anh");
  const SocialMediaData: SocialMediaProps = LocalFindById(
    Config,
    "SocialMedia"
  );
  return (
    <div
      id="collection"
      className="py-16 grid p:grid-cols-1 d:grid-cols-3 gap-4 d:w-[1400px]  p:w-auto d:mx-auto p:mx-2 "
    >
      <div className="d:grid grid-cols-2 gap-3 p:hidden ">
        {ImageCollection?.slice(0, 6).map((item, idx) => (
          <div key={idx} className=" w-full aspect-square overflow-hidden">
            <Image
              key={idx}
              src={item.image}
              alt="collection"
              className="w-full h-full hover:scale-105 "
            />
          </div>
        ))}
      </div>
      <div className="bg-mainBG flex justify-center items-center">
        <div className=" p:p-5 d:p-10 flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-[30px] font-semibold">Bộ sưu tập Facebook</h2>
          <p className="text-gray-400">
            Chúng tôi luôn cập nhật những hình ảnh mới nhất từ các tin tức về
            nông nghiệp trên thế giới
          </p>
          <div className=" text-blue-600 text-[50px] py-3">
            <ImFacebook2 />
          </div>
          <div className="w-full mx-auto p:px-0 d:px-7">
            <Link
              href={
                SocialMediaData?.facebook
                  ? SocialMediaData?.facebook
                  : "https://www.facebook.com/traiheovietthai"
              }
              target="_blank"
              className="py-2 border w-full uppercase border-gray-400 flex items-center gap-1 justify-center hover:border-mainOrange duration-300 hover:text-mainOrange"
            >
              <span> Xem ngay</span>
              <MdArrowRight />
            </Link>
          </div>
        </div>
      </div>
      <div className=" p:hidden d:grid p:grid-cols-3 d:grid-cols-2 gap-3">
        {ImageCollection?.slice(6, ImageCollection.length).map((item, idx) => (
          <div key={idx} className=" w-full aspect-square overflow-hidden">
            <Image
              key={idx}
              src={item.image}
              alt="collection"
              className="w-full h-full hover:scale-105 "
            />
          </div>
        ))}
      </div>
      <div className="d:hidden p:grid grid-cols-3 gap-3">
        {ImageCollection?.slice(0, 12).map((item, idx) => (
          <div key={idx} className=" w-full aspect-square overflow-hidden">
            <Image
              key={idx}
              src={item.image}
              alt="collection"
              className="w-full h-full hover:scale-105 "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFacebook;
