"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaYoutube,
  FaPhone,
  FaTiktok,
  FaFacebookMessenger,
  FaInstagram,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";

import { MdOutlineGroups } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { useEffect, useState } from "react";
import { FaPhoneFlip } from "react-icons/fa6";
import { useStateProvider } from "@context/StateProvider";
import { LocalFindById } from "@components/items/Handle";
import Image from "next/image";
import { ContactProps, SocialMediaProps } from "@assets/props/PropsConfig";
interface IconMappingType {
  [key: string]: IconType;
}
export const HotlineIconMapping: IconMappingType = {
  FaFacebookF: FaFacebookF,
  FaYoutube: FaYoutube,
  FaPhone: FaPhone,
  FaTiktok: FaTiktok,
  FaFacebookMessenger: FaFacebookMessenger,
  FaInstagram: FaInstagram,
  SiZalo: SiZalo,
  MdOutlineGroups: MdOutlineGroups,
};

function Hotline() {
  const { isGlobal } = useStateProvider();

  const Contact: ContactProps = LocalFindById(isGlobal?.Config, "contact");
  const SocialMedia: SocialMediaProps = LocalFindById(
    isGlobal?.Config,
    "SocialMedia"
  );

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const HotlineItems = [
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/shop_social_sidebar_item_image_1_icon.webp?alt=media&token=2e55fbe9-6c56-474f-a07b-ddc0471be014",
      label: "Zalo",
      link: SocialMedia?.zalo ? SocialMedia?.zalo : "https://zalo.me",
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/facebook__6__53aaa8d352524d3eb025af5203eaa437_icon.webp?alt=media&token=2b491511-e084-4c3a-9100-b56e765415eb",
      label: "Facebook",
      link: SocialMedia?.facebook
        ? SocialMedia?.facebook
        : "https://facebook.com",
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/shop_social_sidebar_item_image_3_icon.webp?alt=media&token=76d3867c-06cc-4f5d-a350-91b834e86ab3",
      label: "Tiktok",
      link: SocialMedia?.tiktok ? SocialMedia?.tiktok : "https://tiktok.com",
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/shop_social_sidebar_item_image_5_icon.webp?alt=media&token=f332afa0-a0dd-49aa-9cf9-8154cc4fdfd3",
      label: "Youtube",
      link: SocialMedia?.youtube ? SocialMedia?.youtube : "https://Youtube.com",
    },
    {
      icon: "https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/shop_social_sidebar_item_image_7_icon.webp?alt=media&token=67ceb5a9-b1c4-4e81-92ba-b04755ef3896",
      label: "Hỗ trợ 24/7",
      link: Contact?.Hotline ? ` tel:${Contact?.Hotline}` : "tel:",
    },
  ];

  return (
    <>
      <div className="d:block p:hidden fixed right-0 top-[50%] z-50">
        <div className="flex flex-col gap-1">
          {HotlineItems.map((item, idx) => (
            <Link href={item.link} key={idx} target="_blank">
              <div className=" relative -right-[157px] border border-gray-300 w-[200px] bg-white cursor-pointer hover:-translate-x-[157px] duration-300">
                <div className="p-2  items-center grid grid-cols-3">
                  <div className="w-[25px] h-[25px]">
                    <Image
                      src={item.icon}
                      alt="zalo"
                      width={50}
                      height={50}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="col-span-2">{item.label}</div>
                </div>
              </div>
            </Link>
          ))}

          <div
            onClick={handleScrollToTop}
            className={`${
              showButton ? " pullup " : " opacity-0 transform-none invisible"
            } mt-[10px]`}
          >
            <div className=" relative -right-[157px] border border-gray-300 w-[200px] bg-white cursor-pointer hover:-translate-x-[157px] duration-300">
              <div className="p-2  items-center grid grid-cols-3">
                <div className="w-[25px] h-[25px]">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/arrow-up_eb1426bb7fc647eab89f9279695752cd.webp?alt=media&token=9817972d-4e09-46a0-8476-9f1eb945b9df"
                    alt="zalo"
                    width={50}
                    height={50}
                    className="w-full h-full"
                  />
                </div>
                <div className="col-span-2">Lên đầu trang</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d:hidden p:block fixed right-0 top-[40%] z-50">
        <div className="flex flex-col gap-1">
          {HotlineItems.map((item, idx) => (
            <Link href={item.link} key={idx} target="_blank">
              <div className=" relative border border-gray-300  bg-white cursor-pointer ">
                <div className="p-2 ">
                  <div className="w-[25px] h-[25px]">
                    <Image
                      src={item.icon}
                      alt="zalo"
                      width={50}
                      height={50}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <div
            onClick={handleScrollToTop}
            className={`${
              showButton ? " pullup " : " opacity-0 transform-none invisible"
            } mt-[10px]`}
          >
            <div className=" relative border border-gray-300  bg-white cursor-pointer ">
              <div className="p-2">
                <div className="w-[25px] h-[25px]">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/arrow-up_eb1426bb7fc647eab89f9279695752cd.webp?alt=media&token=9817972d-4e09-46a0-8476-9f1eb945b9df"
                    alt="zalo"
                    width={50}
                    height={50}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hotline;
