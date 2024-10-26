"use client";
import { CategoryProps } from "@assets/props/Props";
import { ProductTitle, ProductTitle1 } from "@components/items/HandleMetadata";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";

interface ProductH1Props {
  searchParams?: any;
  FilterParams?: any;
  Category: CategoryProps[];
  slug: string;
  search?: string;
  type?: string;
}
export interface TitleDataProps {
  Slug: string;
  Search: string;
  Filter?: string;
}

const ProductH1 = ({
  searchParams,
  FilterParams,
  Category,
  slug,
  search,
  type,
}: ProductH1Props) => {
  let TitleData: TitleDataProps = ProductTitle(
    searchParams,
    FilterParams,
    Category,
    slug
  );
  const Group: any = Category.find((item) => item.level0 === "Nhóm sản phẩm");

  let TitleData1: TitleDataProps = ProductTitle1(searchParams, Group, slug);
  if (slug === "all") {
    TitleData.Slug = "Tất cả sản phẩm";
    if (search) {
      TitleData.Slug = `Kết quả tìm kiếm cho từ khóa "${search}"`;
    }
  }
  return (
    <div
      className={`bg-[url(https://firebasestorage.googleapis.com/v0/b/noithataovua.appspot.com/o/Untitled%20design.jpg?alt=media&token=aec6f94a-5cae-4229-b18f-863b59bd5b29)]  bg-cover bg-no-repeat bg-center `}
    >
      <div className="flex items-center  w-full h-[320px] bg-gradient-to-r from-[rgba(255,255,255,0.64)]  via-[#ffffff3e] to-[rgba(7,0,0,0)] ">
        <div className="d:w-[1370px] mx-auto p:w-auto text-black  font-Nunito f">
          <h2 className=" text-[34px] font-bold">
            {TitleData.Slug ? TitleData.Slug : TitleData1.Slug}
          </h2>
          <div className="flex items-center gap-2 font-normal tracking-widest text-[18px]">
            <Link href={`/`} className="hover:text-blue-600 duration-300">
              Home
            </Link>
            <FaAngleRight />
            <span> {TitleData.Slug ? TitleData.Slug : TitleData1.Slug}</span>
            {type && (
              <>
                <FaAngleRight />
                <span>{type}</span>
              </>
            )}
            {(TitleData.Search || TitleData1.Search) && (
              <>
                <FaAngleRight />
                <span>
                  {TitleData.Search ? TitleData.Search : TitleData1.Search}
                </span>
              </>
            )}
            {TitleData.Filter && (
              <>
                <FaAngleRight />
                <span>{TitleData.Filter}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductH1;
