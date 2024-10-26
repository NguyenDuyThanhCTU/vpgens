"use client";
import { LocalFindById } from "@components/items/Handle";
import { HeaderItemsProps } from "@components/layout/Header";
import { useStateProvider } from "@context/StateProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiMailSend, BiSolidSend } from "react-icons/bi";
import { IoMdArrowDropright } from "react-icons/io";
import { GrSend } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import slugify from "slugify";
import { typingEffect } from "@components/items/ClientHandle";
import { ContactProps, SocialMediaProps } from "@assets/props/PropsConfig";

interface MenuProps {
  menuItems: HeaderItemsProps[];
  setIsOpen: (isOpen: boolean) => void;
}

const Menu = ({ menuItems, setIsOpen }: MenuProps) => {
  const [isOpenMenu, setOpenMenu] = useState({
    lv1: "",
    lv2: "",
  });

  const { isGlobal } = useStateProvider();

  const ContactData: ContactProps = LocalFindById(isGlobal?.Config, "contact");
  const SocialMedia: SocialMediaProps = LocalFindById(
    isGlobal?.Config,
    "SocialMedia"
  );

  const texts = ["Bạn cần tư vấn?", "Nhập địa chỉ email của bạn..."];

  const SocialItems = [
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/facebook__6__53aaa8d352524d3eb025af5203eaa437_icon.webp?alt=media&token=2b491511-e084-4c3a-9100-b56e765415eb",
      link: SocialMedia?.facebook ? SocialMedia?.facebook : "",
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/tik-tok_d85bb4e7468c43ac9ed5437649b7405c_icon.webp?alt=media&token=617e6e75-c600-4d32-a764-f0026d42b63e",
      link: SocialMedia?.tiktok ? SocialMedia?.tiktok : "",
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/youtube__5__4f04522e10494557a651f53a33ad4d76_icon.webp?alt=media&token=dd0a7105-47c9-4852-ae3b-9dcd0c80841e",
      link: SocialMedia?.youtube ? SocialMedia?.youtube : "",
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/z5851627838739_4a80404aef3cea1f5a9d6ed52df04917.png?alt=media&token=69e862a4-4aee-411e-9c65-858ed2adb892",
      link: SocialMedia?.zalo ? SocialMedia?.zalo : "",
    },
  ];

  return (
    <div className="font-Nunito h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between px-5 text-[24px] items-center py-2 border-b">
          <h3 className="font-normal">Menu</h3>
          <div>
            <RxCross2 />
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4 text-[13px]">
          {menuItems.map((item, idx) => {
            const ServiceItem = item.children;

            return (
              <div key={idx}>
                <div className="flex justify-between w-full items-center">
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={`${
                      item.value === "products"
                        ? `/products/all`
                        : `/${item.value}`
                    }`}
                    className={`${
                      isOpenMenu.lv1 === item.value &&
                      "text-mainRed font-normal"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {ServiceItem?.level1?.length &&
                    ServiceItem?.level1?.length > 0 && (
                      <IoMdArrowDropright
                        className={`${
                          isOpenMenu.lv1 === item.value &&
                          "rotate-90 duration-300 text-mainRed"
                        }`}
                        onClick={() => {
                          if (isOpenMenu.lv1 === item.value) {
                            setOpenMenu({ ...isOpenMenu, lv1: "" });
                          } else {
                            setOpenMenu({ ...isOpenMenu, lv1: item.value });
                          }
                        }}
                      />
                    )}
                </div>
                {ServiceItem?.level1?.length &&
                  ServiceItem?.level1?.length > 0 && (
                    <div
                      className={`animate__animated ${
                        isOpenMenu.lv1 === item.value
                          ? " block animate__fadeIn"
                          : "hidden"
                      } flex flex-col mt-4 gap-4 ml-6`}
                    >
                      {ServiceItem?.level1?.map((LV1item, LV1idx) => {
                        const LV1Slug = slugify(LV1item, {
                          locale: "vi",
                          lower: true,
                        });

                        return (
                          <div key={LV1idx}>
                            <div className="flex justify-between w-full items-center">
                              <Link
                                onClick={() => setIsOpen(false)}
                                href={`${
                                  item.value === "products"
                                    ? `/${item.value}/${LV1Slug}`
                                    : `/${item.value}?category=${LV1Slug}`
                                }`}
                                className={`${
                                  isOpenMenu.lv2 === LV1item &&
                                  "text-mainOrange font-normal"
                                }`}
                              >
                                {LV1item}
                              </Link>
                              {ServiceItem[LV1Slug] && (
                                <div className="">
                                  <IoMdArrowDropright
                                    className={`${
                                      isOpenMenu.lv2 === LV1item &&
                                      "rotate-90 duration-300 text-mainOrange"
                                    }`}
                                    onClick={() => {
                                      if (isOpenMenu.lv2 === LV1item) {
                                        setOpenMenu({ ...isOpenMenu, lv2: "" });
                                      } else {
                                        setOpenMenu({
                                          ...isOpenMenu,
                                          lv2: LV1item,
                                        });
                                      }
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            {ServiceItem[LV1Slug] && (
                              <div
                                className={`animate__animated ${
                                  isOpenMenu.lv2 === LV1item
                                    ? " block animate__fadeIn"
                                    : "hidden"
                                } flex flex-col mt-4 gap-4 ml-6 `}
                              >
                                {ServiceItem[LV1Slug].map(
                                  (LV2item: string, LV2idx: number) => {
                                    const LV2Slug = slugify(LV2item, {
                                      locale: "vi",
                                      lower: true,
                                    });
                                    return (
                                      <Link
                                        onClick={() => setIsOpen(false)}
                                        href={`${
                                          item.value === "products"
                                            ? `/${item.value}/${LV1Slug}?category=${LV2Slug}`
                                            : `/${item.value}?category=${LV1Slug}&filter=${LV2Slug}`
                                        }`}
                                        key={LV2idx}
                                      >
                                        {LV2item}
                                      </Link>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-3 py-2 font-normal flex flex-col gap-2">
        <h3 className="text-mainOrange text-[18px] uppercase font-semibold">
          Hỗ trợ 24/7
        </h3>
        <p className="text-gray-500">
          Đừng ngần ngại liên hệ chúng tôi, hổ trợ 24/7 từ thứ 2 - thứ 7.
          Hotline:{" "}
          <Link
            onClick={() => setIsOpen(false)}
            className="text-blink hover:underline"
            href={`tel:${ContactData?.Hotline}`}
          >
            {ContactData?.Hotline}
          </Link>
        </p>
        <div className="border ">
          <div className="w-full flex justify-between p-1">
            <input
              type="text"
              className="w-full outline-none text-[17px] px-2 font-light text-black "
              placeholder={typingEffect(texts, 50)}
            />
            <div className="text-[23px] px-2">
              <GrSend className="" />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {SocialItems.map((item, idx) => (
            <Link
              onClick={() => setIsOpen(false)}
              href={item.link}
              target="_blank"
              key={idx}
              className="w-7 h-7 rounded-full"
            >
              <Image
                src={item.icon}
                alt="social"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
