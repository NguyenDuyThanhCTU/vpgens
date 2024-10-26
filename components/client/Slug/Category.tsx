"use client";

import { CategoryProps } from "@assets/props/Props";
import { PostProps } from "@assets/props/PropsPost";
import { StickyTop } from "@components/items/ClientHandle";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import slugify from "slugify";

interface Category {
  CategoryData: CategoryProps[];
  SimilarData: PostProps[];
  type?: string;
}

const Category = ({ CategoryData, SimilarData, type }: Category) => {
  const [isOpenCategory, setOpenCategory] = useState({
    lv1: "",
    lv2: "",
  });

  const divRef: any = useRef(null);

  const stickyValue = StickyTop(divRef);
  return (
    <div
      className={`${
        typeof window !== "undefined" &&
        `${
          window?.innerHeight + stickyValue.scrollPosition >
            stickyValue.height && `sticky -top-[150px]`
        }`
      }`}
      ref={divRef}
    >
      <div className="flex flex-col gap-8 font-Titillium">
        <div className="bg-white  p-4 shadow-sm rounded-md">
          <div className="flex flex-col gap-8">
            <>
              <div>
                <h2 className=" text-[18px] uppercase text-mainOrange font-normal">
                  {type === "blogs" ? "Đừng bỏ lỡ" : "Bài viết liên quan"}
                  {/* Bài viết liên quan */}
                </h2>
                <div className="mt-2 flex items-center gap-1">
                  <div className="w-3 h-[2px] bg-mainRed"></div>
                  <div className="w-3 h-[2px] bg-main"></div>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {SimilarData?.slice(0, 5)?.map((item, idx) => (
                    <div key={idx} className="bg-mainBG relative">
                      <div className="p-4 grid grid-cols-3 items-center gap-3 pl-8">
                        <Link href={`/${item.url}`}>
                          <div className="h-[80px] w-full rounded-md">
                            <Image
                              src={item.image}
                              alt="blogs"
                              width={300}
                              height={300}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                        </Link>
                        <div className="col-span-2">
                          <Link
                            href={`/${item.url}`}
                            className="truncate2  text-[18px] hover:text-red-600 duration-300"
                          >
                            {item.title}
                          </Link>
                        </div>
                      </div>
                      <div className="w-8 h-8 absolute -left-3 bg-red-500 top-1/4 border-4 border-white text-center text-white">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          </div>
        </div>
        <div className="bg-white p-4 shadow-sm rounded-md">
          <div>
            <h2 className=" text-[20px] uppercase text-mainOrange font-semibold">
              Danh mục blogs
            </h2>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-3 h-[2px] bg-mainRed"></div>
              <div className="w-3 h-[2px] bg-main"></div>
            </div>

            <div className="gap-[1px] flex flex-col mt-5">
              {CategoryData?.map((item, idx) => {
                const LV0Slug = slugify(item.level0, {
                  locale: "vi",
                  lower: true,
                });
                return (
                  <div>
                    <div
                      key={idx}
                      className="bg-mainBG py-2 px-5 flex justify-between items-center"
                    >
                      <Link href={`/blogs/${LV0Slug}`}>{item.level0}</Link>
                      {item?.level1?.length > 0 && (
                        <FaAngleRight
                          className={`${
                            isOpenCategory.lv1 === item.level0 &&
                            "rotate-90 duration-300 text-mainRed"
                          }`}
                          onClick={() => {
                            if (isOpenCategory.lv1 === item.level0) {
                              setOpenCategory({ ...isOpenCategory, lv1: "" });
                            } else {
                              setOpenCategory({
                                ...isOpenCategory,
                                lv1: item.level0,
                              });
                            }
                          }}
                        />
                      )}
                    </div>
                    {item?.level1?.length > 0 && (
                      <div
                        className={`animate__animated ${
                          isOpenCategory.lv1 === item.level0
                            ? " block animate__fadeIn"
                            : "hidden"
                        } flex flex-col`}
                      >
                        {item?.level1?.map((LV1item, lv1idx) => {
                          const LV1Slug = slugify(LV1item, {
                            locale: "vi",
                            lower: true,
                          });

                          return (
                            <div>
                              <div
                                key={lv1idx}
                                className="bg-mainBG py-2 px-5 flex justify-between items-center pl-12"
                              >
                                <Link
                                  href={`/blogs/${LV0Slug}?category=${LV1Slug}`}
                                >
                                  {LV1item}
                                </Link>
                                {item[LV1Slug] && (
                                  <FaAngleRight
                                    className={`${
                                      isOpenCategory.lv2 === LV1item &&
                                      "rotate-90 duration-300 text-mainOrange"
                                    }`}
                                    onClick={() => {
                                      if (isOpenCategory.lv2 === LV1item) {
                                        setOpenCategory({
                                          ...isOpenCategory,
                                          lv2: "",
                                        });
                                      } else {
                                        setOpenCategory({
                                          ...isOpenCategory,
                                          lv2: LV1item,
                                        });
                                      }
                                    }}
                                  />
                                )}
                              </div>
                              {item[LV1Slug] && (
                                <div
                                  className={`animate__animated ${
                                    isOpenCategory.lv2 === LV1item
                                      ? " block animate__fadeIn"
                                      : "hidden"
                                  } flex flex-col `}
                                >
                                  {item[LV1Slug].map(
                                    (Lv2item: string, lv2idx: number) => {
                                      const LV2Slug = slugify(Lv2item, {
                                        locale: "vi",
                                        lower: true,
                                      });
                                      return (
                                        <div
                                          key={lv2idx}
                                          className="bg-mainBG py-2 px-5 flex justify-between items-center pl-20"
                                        >
                                          <Link
                                            href={`/blogs/${LV0Slug}?category=${LV1Slug}?filter=${LV2Slug}`}
                                          >
                                            {Lv2item}
                                          </Link>
                                        </div>
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
        </div>
      </div>
    </div>
  );
};

export default Category;
