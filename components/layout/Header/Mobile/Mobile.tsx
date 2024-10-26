"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PiHeartThin, PiShoppingCartThin, PiUserThin } from "react-icons/pi";
import { IoMenuOutline, IoSearch, IoSearchOutline } from "react-icons/io5";
import { Badge, Drawer } from "antd";
import Menu from "./Menu";
import { HeaderItemsProps } from "@components/layout/Header";
import { useUser } from "@context/UserProvider";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import DropdownMobile from "./DropdownMobile";
import { typingEffect } from "@components/items/ClientHandle";
import { useStateProvider } from "@context/StateProvider";
import { CategoryProps } from "@assets/props/Props";

interface MobileProps {
  setOpenUser: (isOpen: boolean) => void;
  menuItems: HeaderItemsProps[];
  ProductCategory: CategoryProps[];
}

const Mobile = ({
  menuItems,

  setOpenUser,
  ProductCategory,
}: MobileProps) => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isDropdownMenu, setDropdownMenu] = useState(false);
  const [isOpenSearch, setOpenSearch] = useState(false);
  const { CurrentUser, isCart, isFavorite } = useUser();
  const { isOpenModal, setOpenModal } = useStateProvider();
  const texts = [
    "Bạn cần tìm gì ...?",
    "Nhập tên sản phẩm cần tìm ...",
    "Tìm kiếm sản phẩm ...",
  ];

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const scrollTop: any =
    typeof window !== "undefined" &&
    (window?.pageYOffset || document.documentElement.scrollTop);

  const handleScroll = () => {
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  if (typeof window !== "undefined") {
    useEffect(() => {
      window?.addEventListener("scroll", handleScroll);
      return () => {
        window?.removeEventListener("scroll", handleScroll);
      };
    }, [lastScrollTop]);
  }

  return (
    <div
      className={`${
        scrollTop > lastScrollTop ? " -top-[91px]" : "top-0"
      } duration-300 fixed w-full bg-white d:hidden p:block z-50`}
    >
      <div className="h-[51px] bg-white  text-[22px] items-center justify-between px-3 grid grid-cols-2">
        <Link href={`/`}>
          <div className="h-[70%]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/footer-logo.jpg?alt=media&token=dbf04f7b-a7b9-419f-9f84-e03b0a44c946"
              alt="logo"
              width={300}
              height={300}
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            {CurrentUser.checked ? (
              <Link href={`/account`}>
                <PiUserThin className="text-[25px]" />
              </Link>
            ) : (
              <Link href={`/account?params=login`}>
                <PiUserThin
                  className="text-[25px]"
                  onClick={() => setOpenUser(true)}
                />
              </Link>
            )}
          </div>
          <div onClick={() => setOpenSearch(!isOpenSearch)}>
            <IoSearch />
          </div>

          <Badge count={isCart.length} color="#ff5d22" showZero>
            <PiHeartThin
              className="text-[20px]"
              onClick={() => setOpenModal({ ...isOpenModal, favorite: true })}
            />
          </Badge>
          <Badge count={isCart.length} color="#ff5d22" showZero>
            <PiShoppingCartThin
              className="text-[20px]"
              onClick={() => setOpenModal({ ...isOpenModal, cart: true })}
            />
          </Badge>

          <div onClick={() => setOpenMenu(true)}>
            <IoMenuOutline />
          </div>
        </div>
      </div>
      <div className="h-[40px] bg-[#333]">
        <div
          className="px-5 flex items-center gap-2 text-white h-full"
          onClick={() => setDropdownMenu(!isDropdownMenu)}
        >
          <FiMenu className="text-[24px]" />
          <span className="text-[14px]">Danh mục menu</span>
        </div>
        <DropdownMobile
          ProductCategory={ProductCategory}
          isDropdownMenu={isDropdownMenu}
          setDropdownMenu={setDropdownMenu}
        />
      </div>
      <div
        className={`${
          isOpenSearch
            ? " pullup h-[35px]"
            : " opacity-0 transform-none invisible h-0"
        }  bg-white w-full flex justify-between mt-[10px]  items-center shadow-xl gap-1  `}
      >
        <input
          type="text"
          className="w-full outline-none px-3"
          placeholder={typingEffect(texts, 50)}
        />
        <div className="text-[22px]">
          <IoSearchOutline className=" text-white bg-mainOrange h-[35px] w-full px-3 " />
        </div>
      </div>
      <>
        <Drawer
          onClose={() => setOpenMenu(false)}
          closeIcon={null}
          width={320}
          open={isOpenMenu}
          placement="left"
          className="reset_Drawer"
        >
          <Menu menuItems={menuItems} setIsOpen={setOpenMenu} />
        </Drawer>
      </>
    </div>
  );
};

export default Mobile;
