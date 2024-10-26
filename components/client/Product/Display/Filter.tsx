"use client";

import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import slugify from "slugify";
import SelectedCard from "./Filter/SelectedCard";
import { StickyTop } from "@components/items/ClientHandle";
import { FaAngleDoubleRight } from "react-icons/fa";
import { CategoryProps } from "@assets/props/Props";
import { isFilterProps } from "@assets/props/PropsProduct";

interface FilterProps {
  Trademark?: CategoryProps;
  Category: CategoryProps[];
  Group?: CategoryProps;
  setFilter: (isFilter: isFilterProps) => void;
  isFilter: isFilterProps;
}

const Filter = ({
  Trademark,
  Category,
  Group,
  setFilter,
  isFilter,
}: FilterProps) => {
  const divRef: any = useRef(null);
  const stickyValue = StickyTop(divRef);
  const [isOpen, setOpen] = useState({
    category: false,
    group: false,
    trademark: false,
  });
  return (
    <div
      className="p:relative d:sticky top-[40px] h-max d:w-full p:w-[90vw]"
      // className={`${
      //   typeof window !== "undefined" &&
      //   `${
      //     window?.innerHeight + stickyValue.scrollPosition >
      //       stickyValue.height && `sticky -top-[300px]`
      //   }`
      // }`}
      ref={divRef}
    >
      <>
        {isFilter?.category.length > 0 ||
        isFilter?.group.length > 0 ||
        isFilter?.trademark.length > 0 ? (
          <div className="pb-8">
            <div className="flex justify-between items-center ">
              <span className="font-semibold">Bạn chọn:</span>
              <span
                className="text-gray-500 cursor-pointer"
                onClick={() => {
                  setFilter({
                    category: [],
                    group: [],
                    trademark: [],
                  });
                }}
              >
                Bỏ hết
              </span>
            </div>
            <div className=" flex flex-wrap mt-5 gap-2">
              {isFilter?.category.map((item, idx) => (
                <div key={idx}>
                  <SelectedCard
                    isFilter={isFilter}
                    item="category"
                    label={item.label}
                    setFilter={setFilter}
                  />
                </div>
              ))}
              {isFilter?.trademark.map((item, idx) => (
                <div key={idx}>
                  <SelectedCard
                    isFilter={isFilter}
                    item="trademark"
                    label={item.label}
                    setFilter={setFilter}
                  />
                </div>
              ))}
              {isFilter?.group.map((item, idx) => (
                <div key={idx}>
                  <SelectedCard
                    isFilter={isFilter}
                    item="group"
                    label={item.label}
                    setFilter={setFilter}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
      <div className="p:pb-2 d:pb-5 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Thương hiệu sản phẩm</h3>
          <FaAngleDoubleRight
            className={`${
              isOpen.trademark && "rotate-90"
            } d:hidden p:block duration-300 cursor-pointer`}
            onClick={() => setOpen({ ...isOpen, trademark: !isOpen.trademark })}
          />
        </div>
        <div className=" flex flex-col gap-1 mt-5">
          {Trademark?.level1?.map((item, idx) => {
            const trademarkfilter = isFilter.trademark.find(
              (Citem) => Citem.label === item
            );
            return (
              <div
                key={idx}
                className={`animate__animated  ${
                  isOpen.trademark
                    ? "animate__backInUp block"
                    : "p:hidden d:flex"
                } flex items-center gap-4 text-gray-700`}
              >
                {" "}
                <input
                  type="checkbox"
                  value={item}
                  checked={trademarkfilter?.label === item ? true : false}
                  onChange={(e) => {
                    if (
                      isFilter.trademark.find(
                        (item) => item.label === e.target.value
                      )
                    ) {
                      const rmtrademark = isFilter.trademark.filter(
                        (item) => item.label !== e.target.value
                      );
                      setFilter({ ...isFilter, trademark: rmtrademark });
                    } else {
                      const addtrademark = [
                        ...isFilter.trademark,
                        {
                          label: e.target.value,
                          value: slugify(e.target.value, {
                            locale: "vi",
                            lower: true,
                          }),
                        },
                      ];
                      setFilter({ ...isFilter, trademark: addtrademark });
                    }
                  }}
                />
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p:py-2 d:py-5 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Loại sản phẩm</h3>
          <FaAngleDoubleRight
            className={`${
              isOpen.category && "rotate-90"
            } d:hidden p:block duration-300 cursor-pointer`}
            onClick={() => setOpen({ ...isOpen, category: !isOpen.category })}
          />
        </div>
        <div className=" flex flex-col gap-1 mt-5">
          {Category?.map((item, idx) => {
            const categoryfilter = isFilter.category.find(
              (Citem) => Citem.label === item.level0
            );

            return (
              <div
                key={idx}
                className={`animate__animated  ${
                  isOpen.category
                    ? "animate__backInUp block"
                    : "p:hidden d:flex"
                } flex items-center gap-4 text-gray-700`}
              >
                <input
                  type="checkbox"
                  value={item.level0}
                  checked={categoryfilter?.label === item.level0 ? true : false}
                  onChange={(e) => {
                    if (
                      isFilter.category.find(
                        (item) => item.label === e.target.value
                      )
                    ) {
                      const rmCategory = isFilter.category.filter(
                        (item) => item.label !== e.target.value
                      );
                      setFilter({ ...isFilter, category: rmCategory });
                    } else {
                      const addCategory = [
                        ...isFilter.category,
                        {
                          label: e.target.value,
                          value: slugify(e.target.value, {
                            locale: "vi",
                            lower: true,
                          }),
                        },
                      ];
                      setFilter({ ...isFilter, category: addCategory });
                    }
                  }}
                />
                <span>{item.level0}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p:py-2 d:py-5  border-slate-200">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Nhóm sản phẩm</h3>
          <FaAngleDoubleRight
            className={`${
              isOpen.group && "rotate-90"
            } d:hidden p:block duration-300 cursor-pointer`}
            onClick={() => setOpen({ ...isOpen, group: !isOpen.group })}
          />
        </div>
        <div className=" flex flex-col gap-1 mt-5">
          {Group?.level1?.map((item, idx) => {
            const groupfilter = isFilter.group.find(
              (Citem) => Citem.label === item
            );
            return (
              <div
                key={idx}
                className={`animate__animated  ${
                  isOpen.group ? "animate__backInUp block" : "p:hidden d:flex"
                } flex items-center gap-4 text-gray-700`}
              >
                {" "}
                <input
                  type="checkbox"
                  value={item}
                  checked={groupfilter?.label === item ? true : false}
                  onChange={(e) => {
                    if (
                      isFilter.group.find(
                        (item) => item.label === e.target.value
                      )
                    ) {
                      const rmgroup = isFilter.group.filter(
                        (item) => item.label !== e.target.value
                      );
                      setFilter({ ...isFilter, group: rmgroup });
                    } else {
                      const addgroup = [
                        ...isFilter.group,
                        {
                          label: e.target.value,
                          value: slugify(e.target.value, {
                            locale: "vi",
                            lower: true,
                          }),
                        },
                      ];
                      setFilter({ ...isFilter, group: addgroup });
                    }
                  }}
                />
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filter;
