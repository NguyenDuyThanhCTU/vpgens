"use client";
import React, { use, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SortTable from "./Display/SortTable";
import { useStateProvider } from "@context/StateProvider";
import Filter from "./Display/Filter";
import { Pagination, PaginationProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductProps } from "@assets/props/PropsProduct";
import { CategoryProps } from "@assets/props/Props";

interface FilterItems {
  label: string;
  value: string;
}

interface isFilterProps {
  category: FilterItems[];
  group: FilterItems[];
  trademark: FilterItems[];
}

const Display = ({ Data }: { Data: ProductProps[] }) => {
  const [isGrid, setGrid] = useState(false);
  const [Datashow, setDataShow] = useState<ProductProps[]>(Data);
  const [isDataPagination, setDataPagination] = useState<ProductProps[]>([]);
  const [isFilter, setFilter] = useState<isFilterProps>({
    category: [],
    group: [],
    trademark: [],
  });
  const { isGlobal } = useStateProvider();
  const ProductCategory: CategoryProps[] = isGlobal.ProductCategory;
  const trademark = ProductCategory?.find((item) => item.trademark === true);
  const Group = ProductCategory?.find((item) => item.group === true);

  const Category = ProductCategory?.filter(
    (item) => !item.trademark && !item.group
  );
  const searchparams = useSearchParams();
  const PageNumber = searchparams.get("page") ? searchparams.get("page") : "1";
  const searchKey = searchparams.get("s");
  const pathname = usePathname();
  const router = useRouter();
  // useEffect(() => {
  //   const filterProducts = () => {
  //     return Data.filter((product) => {
  //       const categoryMatch =
  //         isFilter.category.length === 0 ||
  //         isFilter.category.includes(product.level0);

  //       const groupMatch =
  //         isFilter.group.length === 0 ||
  //         isFilter.group.includes(product.grouplv1);
  //       const trademarkMatch =
  //         isFilter.trademark.length === 0 ||
  //         isFilter.trademark.includes(product.trademarkName);
  //       return categoryMatch && groupMatch && trademarkMatch;
  //     });
  //   };

  //   setDataShow(filterProducts());
  // }, [isFilter]);

  useEffect(() => {
    const filterData = Data.filter((item) => {
      const categoryMatch =
        isFilter.category.length === 0 ||
        isFilter.category.some((filter) => filter.value === item.level0);
      const groupMatch =
        isFilter.group.length === 0 ||
        isFilter.group.some((filter) => filter.value === item.grouplv1);
      const trademarkMatch =
        isFilter.trademark.length === 0 ||
        isFilter.trademark.some(
          (filter) => filter.value === item.trademarkName
        );

      return categoryMatch && groupMatch && trademarkMatch;
    });
    setDataShow(filterData);
  }, [isFilter]);

  const onChange: PaginationProps["onChange"] = (page) => {
    if (searchparams.get("category")) {
      router.push(
        `${pathname}?category=${searchparams.get("category")}&page=${page}`
      );
    } else if (searchparams.get("filter")) {
      router.push(
        `${pathname}?category=${searchparams.get(
          "category"
        )}&filter=${searchparams.get("filter")}&page=${page}`
      );
    } else if (searchKey) {
      router.push(`${pathname}?s=${searchKey}&page=${page}`);
    } else {
      router.push(`${pathname}?page=${page}`);
    }
  };

  useEffect(() => {
    if (PageNumber) {
      setDataPagination(
        Datashow.slice(
          (parseInt(PageNumber) - 1) * 12,
          12 * parseInt(PageNumber)
        )
      );
    } else {
      setDataPagination(Datashow.slice(0, 12));
    }
  }, [PageNumber]);

  return (
    <div className=" d:w-[1370px] d:mx-auto p:w-auto p:mx-2">
      <div className="grid p:grid-cols-1 d:grid-cols-5 gap-10">
        <>
          <Filter
            Category={Category}
            Group={Group}
            Trademark={trademark}
            setFilter={setFilter}
            isFilter={isFilter}
          />
        </>
        <div className=" col-span-4">
          <div className="flex justify-between items-center">
            <div className="p:hidden d:flex items-center gap-2">
              <span className="font-semibold">Hiển thị</span>
              <div
                className={`${
                  !isGrid
                    ? "bg-white border-slate-400"
                    : "bg-mainOrange border-white"
                } border  cursor-pointer`}
                onClick={() => setGrid(true)}
              >
                <div className="grid grid-cols-3 p-2  gap-1">
                  <div
                    className={`${
                      !isGrid ? "bg-slate-400" : "bg-white"
                    } w-2 h-2 `}
                  ></div>
                  <div
                    className={`${
                      !isGrid ? "bg-slate-400" : "bg-white"
                    } w-2 h-2 `}
                  ></div>
                  <div
                    className={`${
                      !isGrid ? "bg-slate-400" : "bg-white"
                    } w-2 h-2 `}
                  ></div>
                </div>
              </div>
              <div
                className={`${
                  isGrid
                    ? "bg-white border-slate-400"
                    : "bg-mainOrange border-white"
                } border cursor-pointer`}
                onClick={() => setGrid(false)}
              >
                <div className={`grid-cols-4 grid  p-2  gap-1`}>
                  <div
                    className={`${
                      isGrid ? "bg-slate-400" : "bg-white"
                    } w-2 h-2 `}
                  ></div>
                  <div
                    className={`${
                      isGrid ? "bg-slate-400" : "bg-white"
                    } w-2 h-2 `}
                  ></div>
                  <div
                    className={`${
                      isGrid ? "bg-slate-400" : "bg-white"
                    } w-2 h-2 `}
                  ></div>
                  <div
                    className={`${
                      isGrid ? "bg-slate-400" : "bg-white"
                    } w-2 h-2 `}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-normal">Sắp xếp theo</span>
              <SortTable Data={Data} Field="title" setData={setDataShow} />
            </div>
          </div>
          {Datashow.length > 0 ? (
            <>
              {" "}
              <div
                className={`${
                  isGrid ? "grid-cols-3 " : "d:grid-cols-4 p:grid-cols-2 "
                } grid gap-4 mt-4`}
              >
                {(isDataPagination ? isDataPagination : Datashow)?.map(
                  (item, idx) => (
                    <div key={idx}>
                      <ProductCard Product={item} />
                    </div>
                  )
                )}
              </div>
              {Datashow.length > 11 && (
                <div className="w-full flex justify-end py-4">
                  <Pagination
                    defaultCurrent={1}
                    total={Data.length}
                    onChange={onChange}
                    pageSize={12}
                  />
                </div>
              )}
            </>
          ) : (
            <>Không tìm thấy sản phẩm bạn yêu cầu</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Display;
