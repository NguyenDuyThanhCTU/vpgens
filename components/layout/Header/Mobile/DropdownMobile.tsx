import { CategoryProps } from "@assets/props/Props";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import slugify from "slugify";

interface DropdownMobileProps {
  isDropdownMenu: boolean;
  ProductCategory: CategoryProps[];
  setDropdownMenu: (isDropdownMenu: boolean) => void;
}

const DropdownMobile = ({
  isDropdownMenu,
  ProductCategory,
  setDropdownMenu,
}: DropdownMobileProps) => {
  const [isOpenMenu, setOpenMenu] = useState({
    lv1: "",
  });
  return (
    <div
      className={`${
        isDropdownMenu ? "opacity-100 visible transform-none" : "dropdown"
      }  h-screen w-full bg-[rgba(0,0,0,0.51)] relative   `}
    >
      <div className="absolute z-50 bg-white  w-[90%] top-0 left-[5%] border-t-[4px] border-t-mainOrange ">
        <div className="p-2 flex flex-col gap-3">
          {ProductCategory?.filter((item) => item.group !== true).map(
            (item, idx) => {
              const LV0Slug = slugify(item.level0, {
                locale: "vi",
                lower: true,
              });

              return (
                <div className="">
                  <div
                    key={idx}
                    className="text-[16px] flex items-center justify-between w-full"
                  >
                    <Link href={`/products/${LV0Slug}`}> {item.level0}</Link>
                    {item.level1 && item.level1.length > 0 && (
                      <IoMdArrowDropright
                        onClick={() => {
                          if (isOpenMenu.lv1 === item.level0) {
                            setOpenMenu({ ...isOpenMenu, lv1: "" });
                          } else {
                            setOpenMenu({ ...isOpenMenu, lv1: item.level0 });
                          }
                        }}
                      />
                    )}
                  </div>
                  {item.level1 && item.level1.length > 0 && (
                    <div
                      className={`animate__animated ${
                        isOpenMenu.lv1 === item.level0
                          ? " block animate__fadeIn"
                          : "hidden"
                      } border-t-[4px] border-t-mainOrange text-[14px] mt-1 `}
                    >
                      <div className=" grid grid-cols-2 gap-2  mt-3">
                        {item?.level1?.map((childItem, childIdx) => {
                          const LV1Slug = slugify(childItem, {
                            locale: "vi",
                            lower: true,
                          });
                          return (
                            <div key={childIdx}>
                              <div
                                // href={`/products/${LV0Slug}?category=${LV1Slug}`}
                                className="text-mainOrange font-semibold"
                              >
                                {childItem}
                              </div>
                              {item[LV1Slug] && (
                                <div className="flex flex-col gap-1 mt-1">
                                  {item[LV1Slug].map(
                                    (LV2item: string, LV2idx: number) => {
                                      const LV2Slug = slugify(LV2item, {
                                        lower: true,
                                        locale: "vi",
                                      });
                                      return (
                                        <Link
                                          // href={`/products/${LV0Slug}?category=${LV1Slug}&filter=${LV2Slug}`}
                                          href={`/products/${LV0Slug}?category=${LV1Slug}`}
                                          onClick={() => setDropdownMenu(false)}
                                          className="text-gray-500"
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
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
      <div
        className="w-full h-full "
        onClick={() => setDropdownMenu(false)}
      ></div>
    </div>
  );
};

export default DropdownMobile;
