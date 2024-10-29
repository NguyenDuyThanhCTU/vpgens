"use client";

import { LocalFindById } from "@components/items/Handle";
import { Badge, Drawer, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { PiShoppingCartThin, PiHeartThin, PiUserThin } from "react-icons/pi";
import { IoIosMenu, IoMdArrowDropdown } from "react-icons/io";
import ShopCart from "./Header/ShopCart";
import Favorite from "./Header/Favorite";
import User from "./Header/User";
import { useStateProvider } from "@context/StateProvider";
import { useUser } from "@context/UserProvider";
import { Dropdown, DropdownMenu } from "./Header/Dropdown";
import { useTypingEffect } from "@components/items/ClientHandle";
import Mobile from "./Header/Mobile/Mobile";
import { GoDotFill } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { AccountProps } from "@assets/props/PropsAccount";
import { CategoryProps } from "@assets/props/Props";
import { ProductProps } from "@assets/props/PropsProduct";
import { ContactProps } from "@assets/props/PropsConfig";
import slugify from "slugify";

interface HeaderProps {
  Accounts: AccountProps[];
  ProductCategory: CategoryProps[];
  PostCategory: CategoryProps[];
  Products: ProductProps[];
}

export interface HeaderItemsProps {
  label: string;
  value: string;
  children?: CategoryProps;
}
const Header = ({
  Accounts,
  ProductCategory,
  PostCategory,
  Products,
}: HeaderProps) => {
  const [isOpenUser, setOpenUser] = useState(false);
  const [isOpenVideo, setOpenVideo] = useState(false);
  const { isClient, isGlobal, isOpenModal, setOpenModal } = useStateProvider();
  const { CurrentUser, isFavorite, isCart } = useUser();
  const [search, setSearch] = useState("");
  const [searchRs, setSearchRs] = useState<ProductProps[]>([]);
  const ContactData: ContactProps = LocalFindById(isGlobal?.Config, "contact");
  const texts = [
    "Bạn cần tìm gì ...?",
    "Nhập tên sản phẩm cần tìm ...",
    "Tìm kiếm sản phẩm ...",
  ];

  const HeaderItems: HeaderItemsProps[] = [
    {
      label: "Tất cả sản phẩm",
      value: "products",
      children: ProductCategory?.find(
        (item) => item.level0 === "Nhóm sản phẩm"
      ),
    },
    {
      label: "Về chúng tôi",
      value: "about-us",
      // children: PostCategory?.find((item) => item.level0 === "Kinh nghiệm"),
    },

    {
      label: "Kinh nghiệm heo giống",
      value: "blogs/kinh-nghiem-heo-giong",
      children: PostCategory?.find(
        (item) =>
          slugify(item.level0, { locale: "vi", lower: true }) ===
          "kinh-nghiem-heo-giong"
      ),
    },
    {
      label: "Hình ảnh và Video",
      value: "album",
      // children: PostCategory?.find(
      //   (item) => item.level0 === "Trước và Sau Thi công"
      // ),
    },
    {
      label: "Tin tức và Sự kiện",
      value: "blogs/tin-tuc-va-su-kien",
      children: PostCategory?.find(
        (item) =>
          slugify(item.level0, { locale: "vi", lower: true }) ===
          "tin-tuc-va-su-kien"
      ),
    },
    {
      label: "Liên hệ",
      value: "contact",
      // children: {},
    },
  ];

  const [lastScrollTop, setLastScrollTop] = useState(0);

  const scrollTop: any =
    typeof window !== "undefined" &&
    (window?.pageYOffset || document.documentElement.scrollTop);

  const handleScroll = () => {
    setLastScrollTop(scrollTop);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window?.addEventListener("scroll", handleScroll);
      return () => {
        window?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollTop]);

  useEffect(() => {
    const sort = Products?.filter((product: any) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    if (sort && search) {
      setSearchRs(sort);
    }
  }, [Products, search]);

  return (
    <>
      <div
        className={`top-0 fixed w-full bg-white d:block p:hidden duration-300 z-20`}
        // className={`${
        //   scrollTop > lastScrollTop ? " -top-[112px]" : "top-0"
        // } fixed w-full bg-white d:block p:hidden duration-300 z-20`}
      >
        <div className="h-[68px] d:w-[1370px] d:mx-auto grid grid-cols-4   gap-10 ">
          <div className="h-[68px] flex justify-center">
            <Link href={`/`} className=" h-full">
              <Image
                src={
                  ContactData?.LogoWebsite
                    ? ContactData?.LogoWebsite
                    : "https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/avatar%2FRHYDinnC666liHhyRMcyvr2fuiiYbKrRMFs6gOCmxQOtrCiMeA.jpg?alt=media&token=69ada088-7c40-483b-9475-5b635892cbdb"
                }
                alt="logo"
                width={300}
                height={300}
                className="h-full w-full object-contain"
              />
            </Link>
          </div>
          <div className="col-span-2">
            <div className="w-full  items-center h-full flex relative">
              <div className="w-full flex pb-2 border-b  mr-5 border-gray-300">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={useTypingEffect(texts, 50)}
                  className="outline-none  col-span-3 w-full"
                />
                <div
                  // href={`/products/all?s=${search}`}
                  className="text-[25px]"
                  onClick={() => setSearch("")}
                >
                  <CiSearch className="" />
                </div>
              </div>
              {searchRs.length > 0 && search && (
                <div className="absolute top-full bg-white text-black left-0 w-full z-50 border  shadow-md shadow-gray-400 max-h-[500px] overflow-y-hidden">
                  <div className="bg-slate-200 font-semibold">
                    <div className="px-3 py-2">
                      Sản phẩm ({searchRs.length})
                    </div>
                  </div>
                  {searchRs?.map((item, idx) => (
                    <div
                      key={idx}
                      className="cursor-pointer hover:bg-gray-100 duration-300"
                    >
                      <div className="py-2 px-3 flex items-center gap-3">
                        <Link
                          href={`/product/${item.url}`}
                          onClick={() => setSearch("")}
                        >
                          <div className="h-10 w-10">
                            <Image
                              src={item?.image}
                              alt="logo"
                              width={100}
                              height={100}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        <div>
                          <Link
                            href={`/product/${item.url}`}
                            onClick={() => setSearch("")}
                            className="hover:text-blue-600 duration-300"
                          >
                            {item.title}
                          </Link>
                          <p className="text-[14px] text-mainRed">
                            {item.price}đ
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1 flex items-center ">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center gap-2">
                <FiPhoneCall className="text-[30px] text-gray-600" />
                <div>
                  <p>Hotline</p>
                  <Link
                    className="text-mainOrange font-bold font-Nunito"
                    href={`tel:${ContactData?.Hotline}`}
                  >
                    {ContactData?.Hotline}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-7">
                <div>
                  {CurrentUser.checked ? (
                    <Link href={`/account`}>
                      <PiUserThin className="text-[25px]" />
                    </Link>
                  ) : (
                    <div>
                      {" "}
                      <PiUserThin
                        className="text-[25px]"
                        onClick={() => setOpenUser(true)}
                      />
                    </div>
                  )}
                </div>
                <Badge count={isFavorite.length} color="#ff5d22" showZero>
                  <PiHeartThin
                    className=" text-[25px] cursor-pointer"
                    onClick={() =>
                      setOpenModal({ ...isOpenModal, favorite: true })
                    }
                  />
                </Badge>

                <Badge count={isCart.length} color="#ff5d22" showZero>
                  <PiShoppingCartThin
                    className=" text-[25px] cursor-pointer"
                    onClick={() => setOpenModal({ ...isOpenModal, cart: true })}
                  />{" "}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-main text-white">
          <div className="h-[44px] d:w-[1370px] d:mx-auto grid grid-cols-6 gap-10 font-light">
            <div className="group relative h-full ">
              <div className="flex items-center gap-2 cursor-pointer h-full">
                <IoIosMenu className="text-[28px]" />
                <span>Danh mục sản phẩm</span>
              </div>
              <DropdownMenu
                ServiceItem={ProductCategory?.filter(
                  (item) => item.group !== true
                )}
              />
            </div>
            <div className="flex justify-between items-center col-span-5">
              <div className=" flex items-center gap-8">
                {HeaderItems.map((item, idx) => {
                  return (
                    <div key={idx} className="group relative ">
                      <Link
                        className="flex items-center justify-between"
                        href={`${
                          item.value === "products"
                            ? `/products/all`
                            : `/${item.value}`
                        }`}
                      >
                        <span> {item.label}</span>
                        {item.children?.level1?.length &&
                          item.children?.level1?.length > 0 && (
                            <IoMdArrowDropdown />
                          )}
                      </Link>
                      {item.children?.level1?.length &&
                        item.children?.level1?.length > 0 && (
                          <Dropdown
                            Parent={item.value}
                            ServiceItem={item.children}
                          />
                        )}
                    </div>
                  );
                })}
              </div>
              <div>
                <div
                  className="flex items-center justify-start gap-1  pr-8 pl-2 border-2 border-mainRed text-mainRed cursor-pointer bg-white"
                  onClick={() => {
                    setOpenModal({
                      ...isOpenModal,
                      Video: {
                        state: true,
                        url: "https://www.youtube.com/embed/cqcvtcHdt1w",
                      },
                    });
                  }}
                >
                  <GoDotFill className="dot-blink" />
                  Kết nối
                </div>
              </div>
            </div>
          </div>
        </div>

        <>
          {isClient ? (
            <>
              <Modal
                open={isOpenUser}
                onCancel={() => setOpenUser(false)}
                className="reset_Modal"
                closeIcon={false}
                width={800}
                footer={false}
              >
                <User Accounts={Accounts} setIsOpen={setOpenUser} />
              </Modal>

              {/* <Modal
                open={isOpenVideo}
                onCancel={() => setOpenVideo(false)}
                className="reset_Modal"
                closeIcon={false}
                width={900}
                centered={true}
                footer={false}
                destroyOnClose={true}
              >
                <div className="p-4 bg-[#333] relative">
                  <iframe
                    className="w-full "
                    height={500}
                    src=""
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                  <div
                    className="absolute -top-8 -right-8 text-[30px] text-white cursor-pointer"
                    onClick={() => setOpenVideo(false)}
                  >
                    <RxCross2 />
                  </div>
                </div>
              </Modal> */}
            </>
          ) : (
            ""
          )}
        </>
      </div>
      <Mobile
        ProductCategory={ProductCategory}
        setOpenUser={setOpenUser}
        menuItems={HeaderItems}
      />
    </>
  );
};

export default Header;
