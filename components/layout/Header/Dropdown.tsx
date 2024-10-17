import Link from "next/link";
import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import slugify from "slugify";
import { MdArrowRight } from "react-icons/md";
import { CategoryProps } from "@assets/props/Props";

export const DropdownMenu = ({
  ServiceItem,
}: {
  ServiceItem: CategoryProps[];
}) => {
  return (
    <div className="flex flex-col top-5 absolute  left-0  w-full">
      <div className="bg-none w-full h-6 "></div>
      <div className="group-hover:opacity-100 group-hover:visible group-hover:transform-none dropdown border border-gray-300 border-t-[4px] border-t-mainOrange  relative h-0">
        <div className="absolute w-2 h-2 bg-mainOrange rotate-45  -top-2 left-[20%] -z-10"></div>
        <div className=" flex flex-col z-50 w-full relative bg-white">
          {ServiceItem?.map((item, idx) => {
            const LV0Slug = slugify(item.level0, { locale: "vi", lower: true });
            return (
              <div key={idx}>
                <div className="p-2  w-full group/child  text-black ">
                  <Link
                    href={`/products/${LV0Slug}`}
                    className="duration-300  w-full  group-hover/child:text-mainOrange flex items-center justify-between "
                  >
                    <span> {item.level0}</span>
                    {item.level1 && item.level1.length > 0 && <MdArrowRight />}
                  </Link>

                  {item.level1 && item.level1.length > 0 && (
                    <div className="absolute sub-dropdown w-[1205px] h-max -right-[1205px] -top-[4px]   group-hover/child:visible  group-hover/child:opacity-100  group-hover/child:transform-none  border-t-[4px] border-mainOrange ">
                      <div className="grid grid-cols-4 gap-4">
                        {item?.level1?.map((childItem, childIdx) => {
                          const LV1Slug = slugify(childItem, {
                            locale: "vi",
                            lower: true,
                          });

                          return (
                            <div key={childIdx}>
                              <div
                                // href={`/products/${LV0Slug}?category=${LV1Slug}`}
                                className="font-normal text-mainOrange"
                              >
                                {childItem}
                              </div>
                              {item[LV1Slug] && (
                                <div className="flex flex-col gap-2 mt-2 text-gray-500 ">
                                  {item[LV1Slug].map(
                                    (lv2Item: string, lv2Idx: number) => {
                                      const LV2Slug = slugify(lv2Item, {
                                        lower: true,
                                        locale: "vi",
                                      });
                                      return (
                                        <Link
                                          href={`/products/${LV0Slug}?category=${LV1Slug}`}
                                          // href={`/products/${LV0Slug}?category=${LV1Slug}&filter=${LV2Slug}`}
                                          key={lv2Idx}
                                        >
                                          {lv2Item}
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
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Dropdown = ({
  Parent,
  ServiceItem,
}: {
  Parent: string;
  ServiceItem: CategoryProps;
}) => {
  return (
    <div className="flex flex-col top-5 absolute  left-0  w-full - ">
      <div className="bg-none w-full h-3 "></div>
      <div className="group-hover:opacity-100 group-hover:visible group-hover:transform-none  dropdown border border-gray-300  border-t-[4px] border-t-mainOrange  relative bg-white min-w-[250px] h-0">
        <div className="absolute w-2 h-2 bg-mainOrange rotate-45  -top-2 left-[20%] -z-10"></div>

        <div className=" flex flex-col w-full bg-white ">
          {ServiceItem?.level1?.map((LV1Item: string, LV1idx: number) => {
            const LV1Slug = slugify(LV1Item, { locale: "vi", lower: true });

            return (
              <div
                className=" w-full group/submenu relative text-black "
                key={LV1idx}
              >
                <Link
                  href={`${
                    Parent === "products"
                      ? `/${Parent}/${LV1Slug}`
                      : `/${Parent}?category=${LV1Slug}`
                  }`}
                  className="duration-300  w-full hover:text-white  group-hover/submenu:bg-mainOrange flex items-center justify-between group-hover/child:text-white p-2 "
                >
                  {LV1Item}
                  {ServiceItem[LV1Slug] && (
                    <div className="">
                      <IoMdArrowDropright />
                    </div>
                  )}
                </Link>

                {ServiceItem[LV1Slug] && (
                  <div className="group-hover/submenu:opacity-100 group-hover/submenu:visible group-hover/submenu:transform-none dropdown absolute left-[101%] -top-1 min-w-52  border-t-[4px] border-t-mainOrange bg-white">
                    <div className="flex flex-col ">
                      {ServiceItem[LV1Slug].map(
                        (LV2item: string, LV2idx: number) => {
                          const LV2Slug = slugify(LV2item, {
                            locale: "vi",
                            lower: true,
                          });

                          return (
                            <Link
                              href={`${
                                Parent === "products"
                                  ? `/${Parent}/${LV1Slug}?category=${LV2Slug}`
                                  : `/${Parent}?category=${LV1Slug}&filter=${LV2Slug}`
                              }`}
                              key={LV2idx}
                              className=" p-2 w-full hover:bg-mainOrange hover:text-white duration-300"
                            >
                              {LV2item}
                            </Link>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
