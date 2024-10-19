"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import slugify from "slugify";

import { LuPlus } from "react-icons/lu";

const Footer = () => {
  const [isOpenMenu, setOpenMenu] = useState({
    lv1: "",
  });
  const FooterItems = [
    {
      label: "Kinh nghiệm Thiết kế, Thi Công",
      value: "blogs/kinh-nghiem",
    },
    {
      label: "Trước và Sau Thi công",
      value: "blogs/truoc-va-sau-thi-cong",
    },
    {
      label: "Blogs",
      value: "blogs/tin-tuc",
    },
    {
      label: " Chủng loại gỗ",
      value: "blogs/chung-loai-go",
    },
    {
      label: "Liên hệ",
      value: "lien-he",
    },
  ];
  return (
    <div className="bg-[url(https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/map-3f6e1ddb342185a26c476daa59c3_2520_1__6b90526abdfd4360aee4782f6da8dc45.png?alt=media&token=526440ef-5c78-472b-b732-8cd4df0389c7)] p:bg-auto d:bg-cover pt-10">
      <div className=" py-5 border-b">
        <div className="grid p:grid-cols-1 d:grid-cols-5 d:w-[1400px] p:w-auto d:mx-auto p:mx-2 d:gap-1 p:gap-10">
          <div>
            <div
              className={`${
                isOpenMenu.lv1 === "Dịch vụ khách hàng" && "text-mainRed"
              }  flex justify-between items-center`}
            >
              <div>
                <h3 className="uppercase">Dịch vụ khách hàng</h3>
                <div
                  className={`${
                    isOpenMenu.lv1 === "Dịch vụ khách hàng"
                      ? "bg-mainRed"
                      : "bg-black"
                  } h-[1px]  w-32 mt-1`}
                ></div>
              </div>
              <div
                className="d:hidden p:block"
                onClick={() => {
                  if (isOpenMenu.lv1 === "Dịch vụ khách hàng") {
                    setOpenMenu({ ...isOpenMenu, lv1: "" });
                  } else {
                    setOpenMenu({ ...isOpenMenu, lv1: "Dịch vụ khách hàng" });
                  }
                }}
              >
                <LuPlus />
              </div>
            </div>
            <div
              className={`animate__animated ${
                isOpenMenu.lv1 === "Dịch vụ khách hàng"
                  ? " block animate__fadeIn"
                  : "d:flex p:d:flex p:hidden"
              } mt-4  flex-col gap-1 text-[15px]`}
            >
              {[
                "Giới thiệu",
                "Chính sách đổi trả",
                "Chính sách bảo mật",
                "Chính sách khiếu nại",
                "Điều khoản dịch vụ",
              ].map((item, idx) => {
                const ItemSlug = slugify(item, { locale: "vi", lower: true });
                return (
                  <Link
                    className="hover:text-blue-600 duration-300"
                    href={`/${ItemSlug}`}
                    key={idx}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <div
              className={`${
                isOpenMenu.lv1 === "Thông tin" && "text-mainRed"
              }  flex justify-between items-center`}
            >
              {" "}
              <div>
                <h3 className="uppercase ">Thông tin</h3>
                <div
                  className={`${
                    isOpenMenu.lv1 === "Thông tin" ? "bg-mainRed" : "bg-black"
                  } h-[1px]  w-32 mt-1`}
                ></div>{" "}
              </div>
              <div
                className="d:hidden p:block"
                onClick={() => {
                  if (isOpenMenu.lv1 === "Thông tin") {
                    setOpenMenu({ ...isOpenMenu, lv1: "" });
                  } else {
                    setOpenMenu({ ...isOpenMenu, lv1: "Thông tin" });
                  }
                }}
              >
                <LuPlus />
              </div>
            </div>
            <div
              className={`animate__animated ${
                isOpenMenu.lv1 === "Thông tin"
                  ? " block animate__fadeIn"
                  : "d:flex p:hidden"
              } mt-4  flex-col gap-1 text-[15px]`}
            >
              {[
                "Tất cả sản phẩm",
                "Nội Thất Phòng Khách",
                "Nội Thất Phòng Ngủ",
                "Nội Thất Nhà Bếp",
              ].map((item, idx) => {
                const ItemSlug = slugify(item, { locale: "vi", lower: true });
                return (
                  <Link
                    className="hover:text-blue-600 duration-300"
                    href={
                      item === "" ? `/products/all` : `/products/${ItemSlug}`
                    }
                    key={idx}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <div
              className={`${
                isOpenMenu.lv1 === "Danh mục cho bạn" && "text-mainRed"
              }  flex justify-between items-center`}
            >
              {" "}
              <div>
                <h3 className="uppercase ">Danh mục cho bạn</h3>
                <div
                  className={`${
                    isOpenMenu.lv1 === "Danh mục cho bạn"
                      ? "bg-mainRed"
                      : "bg-black"
                  } h-[1px]  w-32 mt-1`}
                ></div>{" "}
              </div>
              <div
                className="d:hidden p:block"
                onClick={() => {
                  if (isOpenMenu.lv1 === "Danh mục cho bạn") {
                    setOpenMenu({ ...isOpenMenu, lv1: "" });
                  } else {
                    setOpenMenu({ ...isOpenMenu, lv1: "Danh mục cho bạn" });
                  }
                }}
              >
                <LuPlus />
              </div>
            </div>
            <div
              className={`animate__animated ${
                isOpenMenu.lv1 === "Danh mục cho bạn"
                  ? " block animate__fadeIn"
                  : "d:flex p:hidden"
              } mt-4  flex-col gap-1 text-[15px]`}
            >
              {FooterItems.map((item, idx) => {
                return (
                  <Link
                    className="hover:text-blue-600 duration-300"
                    href={`/${item.value}`}
                    key={idx}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="p:col-span-1 d:col-span-2">
            <div
              className={`${
                isOpenMenu.lv1 === "Về chúng tôi" && "text-mainRed"
              }  flex justify-between items-center`}
            >
              {" "}
              <div>
                <h3 className="uppercase ">Về chúng tôi</h3>
                <div
                  className={`${
                    isOpenMenu.lv1 === "Về chúng tôi"
                      ? "bg-mainRed"
                      : "bg-black"
                  } h-[1px]  w-32 mt-1`}
                ></div>{" "}
              </div>
              <div
                className="d:hidden p:block"
                onClick={() => {
                  if (isOpenMenu.lv1 === "Về chúng tôi") {
                    setOpenMenu({ ...isOpenMenu, lv1: "" });
                  } else {
                    setOpenMenu({ ...isOpenMenu, lv1: "Về chúng tôi" });
                  }
                }}
              >
                <LuPlus />
              </div>
            </div>
            <p
              className={`animate__animated ${
                isOpenMenu.lv1 === "Về chúng tôi"
                  ? " block animate__fadeIn"
                  : "d:block p:hidden"
              } mt-4 text-[15px]`}
            >
              <span className=" uppercase ">Nội thất Ao Vua</span> tự hào mang
              đến sự khác biệt trong từng chi tiết, tạo nên một phong cách riêng
              biệt cho bày trí nội thất, kiến tạo nên không gian sống tinh tế và
              sang trọng. Trên tất cả, sự tin tưởng và hài lòng của khách hàng
              là tôn chỉ hoạt động hàng đầu của chúng tôi. Hãy để chúng tôi đồng
              hành cùng bạn trên hành trình biến ngôi nhà mơ ước thành hiện
              thực.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;