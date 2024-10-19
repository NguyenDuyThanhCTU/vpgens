"use client";
import { useStateProvider } from "@context/StateProvider";
import React, { useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";

interface SortTableProps {
  Data: any;
  setData: (isData: any) => void;
  Field: string;
}

const SortTable = ({ Data, setData, Field }: SortTableProps) => {
  const sortItem = [
    {
      label: "Mới nhất",
      value: "newest",
    },
    {
      label: "Tên: A-Z",
      value: "nameaz",
    },
    {
      label: "Tên: Z-A",
      value: "nameza",
    },
    {
      label: "Cũ nhất",
      value: "oldest",
    },
    {
      label: "Giá: Tăng dần",
      value: "priceasc",
    },
    {
      label: "Giá: Giảm dần",
      value: "pricedesc",
    },
  ];

  const HandleSort = (value: string) => {
    setTimeout(() => {
      if (value === "newest") {
        const sort = [...Data]?.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setData(sort);
      } else if (value === "oldest") {
        const sort = [...Data]?.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        setData(sort);
      } else if (value === "nameaz") {
        const sort = [...Data]?.sort((a: any, b: any) =>
          a[Field].localeCompare(b[Field])
        );
        setData(sort);
      } else if (value === "nameza") {
        const sort = [...Data]?.sort((a: any, b: any) =>
          b[Field].localeCompare(a[Field])
        );
        setData(sort);
      } else if (value === "priceasc") {
        const sort = [...Data]?.sort((a: any, b: any) => a.price - b.price);
        setData(sort);
      } else if (value === "pricedesc") {
        const sort = [...Data]?.sort((a: any, b: any) => b.price - a.price);
        setData(sort);
      }
    }, 300);
  };
  return (
    <div className="flex gap-5 text-[14px] border">
      <div className="px-2 py-1">
        <select
          className="outline-none bg-white"
          onChange={(e: any) => HandleSort(e.target.value)}
        >
          {sortItem.map((item, idx) => (
            <option key={idx} className=" font-extralight  " value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortTable;
