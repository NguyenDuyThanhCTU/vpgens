"use client";
import React, { useState } from "react";
import { Image as AntImage } from "antd";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SimilarProducts from "./ProductDetail/SimilarProduct";
import { IoShareSocialOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { useStateProvider } from "@context/StateProvider";
import slugify from "slugify";
import { useUser } from "@context/UserProvider";
import { LocalFindById } from "@components/items/Handle";
import { ProductProps } from "@assets/props/PropsProduct";
import { CategoryProps } from "@assets/props/Props";
import { ContactProps, SocialMediaProps } from "@assets/props/PropsConfig";

interface ProductDetailProps {
  Data: ProductProps;
  Products: ProductProps[];
  Config: Array<any>;
  Category: CategoryProps[];
}

const ProductDetail = ({
  Data,
  Products,
  Config,
  Category,
}: ProductDetailProps) => {
  const ContactData: ContactProps = Config?.find(
    (item: any) => item.id === "contact"
  );
  const socialData: SocialMediaProps = LocalFindById(Config, "SocialMedia");
  const [isDisplay, setDisplay] = useState(Data?.image);
  const { isGlobal, setOpenModal, isOpenModal } = useStateProvider();
  const { setCart, isCart } = useUser();

  let ProductCategory: CategoryProps[] = isGlobal?.ProductCategory;

  const isGroup: any = isGlobal?.ProductCategory?.find(
    (item) => item.level0 === "Nhóm sản phẩm"
  );

  return (
    <>
      <div className="grid p:grid-cols-1 d:grid-cols-2 gap-5">
        <div className="w-full flex justify-center flex-col">
          <div className="aspect-square px-10">
            <AntImage
              className="w-full"
              src={isDisplay}
              style={{ width: "100%" }}
            />
          </div>
          {Data?.subimage && (
            <div className="flex  overflow-hidden bg-gray-100 mt-2 items-center">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                centerInsufficientSlides={true}
                centeredSlidesBounds={true}
                slidesPerView={5}
                slidesPerGroup={1}
                loop={true}
                autoplay={{
                  delay: 8000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper "
              >
                {Data?.subimage?.map((item, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="border-2 m-2 h-[84px] overflow-hidden"
                    onClick={() => setDisplay(item.url)}
                  >
                    <Image
                      className="p-2 h-full  object-cover hover:scale-110 duration-500 max-w-[84px] max-h-[84px]"
                      src={item.url}
                      alt="sub image"
                      width={100}
                      height={100}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full items-center">
            <h3 className="text-[24px]  font-bold">{Data?.title}</h3>
            <div className="border rounded-full p-2 text-[20px] border-slate-400 shadow-xl">
              <IoShareSocialOutline />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex items-center gap-1 font-normal">
              <GoDotFill className="text-[10px] text-mainOrange" />
              <span className="text-gray-600">
                <strong>Mã sản phẩm</strong>:{" "}
                {Data?.pId ? Data?.pId : "Đang cập nhật"}
              </span>
            </div>
            <div className="flex items-center gap-1 font-normal">
              <GoDotFill className="text-[10px] text-mainOrange" />
              <span className="text-gray-600">
                <strong>Nhu cầu</strong>:{" "}
                {Data?.grouplv1
                  ? `${isGroup?.level1.find(
                      (item: string) =>
                        slugify(item, { lower: true, locale: "vi" }) ===
                        Data?.grouplv1
                    )}`
                  : "Đang cập nhật"}
              </span>
            </div>
            <div className="flex items-center gap-1 font-normal">
              <GoDotFill className="text-[10px] text-mainOrange" />
              <span className="text-gray-600">
                <strong>Thương hiệu</strong>:{" "}
                {Data?.branches ? Data?.branches : "Đang cập nhật"}
              </span>
            </div>
            <div className="flex items-center gap-1 font-normal">
              <GoDotFill className="text-[10px] text-mainOrange" />
              <span className="text-gray-600">
                <strong>Dòng sản phẩm</strong>:{" "}
                {Data?.level0
                  ? `${
                      ProductCategory.find(
                        (item) =>
                          slugify(item.level0, {
                            locale: "vi",
                            lower: true,
                          }) === Data?.level0
                      )?.level0
                    }`
                  : "Đang cập nhật"}
              </span>
            </div>
          </div>

          <div className="d:text-[30px] p:text-[14px]">
            {Data?.price ? (
              <>
                {Data?.discount ? (
                  <div className="   font-bold flex gap-3  items-center text-mainRed">
                    <span className="line-through text-gray-400  font-normal">
                      {Data?.price}₫
                    </span>
                    <span className=" ">{Data?.newPrice}₫</span>

                    <span className="text-white font-normal   bg-mainRed rounded-md px-4 py-1">
                      Tiết kiệm {Data?.discount}%
                    </span>
                  </div>
                ) : (
                  <span className="text-mainRed font-bold  ">
                    {Data?.price}₫
                  </span>
                )}
              </>
            ) : (
              <span className="text-mainRed font-bold    ">
                Giá đang cập nhật
              </span>
            )}
          </div>

          <div className="bg-white">
            <div className="p-3 flex flex-col gap-2 text-[14px] font-light">
              <div className="grid grid-cols-5 py-1 border-b ">
                <div className="col-span-2 font-normal">Khuyến mãi:</div>
                <div className="col-span-3 italic ">
                  <p>* Đang cập nhật</p>
                </div>
              </div>
              <div className="grid grid-cols-5 py-1 border-b ">
                <div className="col-span-2 ">Thông số sản phẩm:</div>
                <div
                  className="col-span-3 italic ck-content"
                  dangerouslySetInnerHTML={
                    Data?.detail
                      ? { __html: Data?.detail }
                      : { __html: "<p>Đang cập nhật</p>" }
                  }
                ></div>
              </div>
              <div className="grid grid-cols-5 py-1  ">
                <div className="col-span-2 font-normal">Đơn giá trên:</div>
                <div className="col-span-3 italic ">
                  <p> Đang cập nhật </p>
                </div>{" "}
              </div>
            </div>
          </div>
          <div>
            <div
              className="flex flex-col text-center border font-bold py-2 hover:border-mainOrange duration-300 cursor-pointer border-gray-400"
              onClick={() => {
                setCart([...isCart, Data?.id]);
                setOpenModal({ ...isOpenModal, AddCart: true });
              }}
            >
              <span className="uppercase text-[13px]">Thêm vào giỏ</span>
              <span className="text-[11px] d:block p:hidden">
                Chọn ngay sản phẩm bạn yêu thích
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Link
                className="flex flex-col text-center border font-bold py-2 hover:border-mainOrange duration-300 cursor-pointer border-gray-400"
                href={
                  socialData.messenger
                    ? socialData.messenger
                    : "https://www.m.me/noithataovua"
                }
                target="_blank"
              >
                <span className="uppercase text-[13px]">Tư vấn</span>
                <span className="text-[11px] d:block p:hidden">
                  Tư vấn giống heo phù hợp với bạn
                </span>
              </Link>
              <Link
                className="flex flex-col text-center border font-bold py-2 border-mainOrange hover:bg-mainRed text-white duration-300 cursor-pointer bg-mainOrange"
                href={`/contact`}
              >
                <span className="uppercase text-[13px]">Liên hệ</span>
                <span className="text-[11px] d:block p:hidden">
                  Chúng tôi luôn bên bạn 24/7
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-[1px] border-gray-300 rounded-lg bg-white mt-5">
        <div className="p-4">
          <h2 className="text-[22px] font-semibold text-mainColorHover uppercase text-red-500 border-b-2 w-full pb-1 border-red-500">
            Thông tin chi tiết
          </h2>
          <div
            className="mt-2 font-light ck-content min-h-[50vh] p-3"
            dangerouslySetInnerHTML={
              Data?.describe
                ? { __html: Data?.describe }
                : { __html: "<p>Đang cập nhật</p>" }
            }
          ></div>
          <div>
            <h2 className="p:text-[20px] d:text-[30px] font-bold">
              Quyền lợi của khách hàng khi đến với Việt thái
            </h2>
            <div className="ml-5 ck-content">
              <ul>
                <li>
                  &nbsp;khi mua heo giống tại trang trại heo giống Việt Thái, bà
                  con chăn nuôi hoàn toàn có thể yên tâm về chất lượng heo
                  giống, dịch vụ hỗ trợ và giá cả. Bà con sẽ có thể tăng lợi
                  nhuận kinh tế hiệu quả từ việc chăn nuôi heo.
                </li>
                <li>
                  &nbsp;Trang Trại heo giống Việt Thái sẽ trở thành nhà cung cấp
                  heo giống hàng đầu Việt Nam, góp phần nâng cao hiệu quả chăn
                  nuôi và phát triển ngành chăn nuôi bền vững.
                </li>
              </ul>
            </div>
            <p>
              <strong>
                Nếu quý khách muốn nhận tư vấn miễn phí, vui lòng liên hệ:{" "}
                <Link
                  href={`${
                    ContactData ? `tel:${ContactData.Hotline}` : "tel:"
                  }`}
                  className=" "
                >
                  {ContactData?.Hotline}
                </Link>{" "}
                chúng tôi sẽ liên hệ và tư vấn miễn phí cho quý khách.
              </strong>
            </p>
          </div>
          <SimilarProducts
            Type={Data?.level1}
            Data={Products}
            Category={Category}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
