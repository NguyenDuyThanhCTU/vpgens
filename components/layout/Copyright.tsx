"use client";

import { CategoryProps } from "@assets/props/Props";
import { ProductProps } from "@assets/props/PropsProduct";
import { useStateProvider } from "@context/StateProvider";
import { useEffect } from "react";

interface CopyrightProps {
  Config: Array<any>;
  ProductCategory: CategoryProps[];
  PostCategory: CategoryProps[];
  Products: ProductProps[];
}

const Copyright = ({
  Config,
  ProductCategory,
  PostCategory,
  Products,
}: CopyrightProps) => {
  const { setGlobal, isGlobal, isOpenModal, setOpenModal } = useStateProvider();

  useEffect(() => {
    const newGlobalState = { ...isGlobal };

    if (Config) {
      newGlobalState.Config = Config;
    }
    if (ProductCategory) {
      newGlobalState.ProductCategory = ProductCategory;
    }
    if (PostCategory) {
      newGlobalState.PostCategory = PostCategory;
    }

    setGlobal(newGlobalState);
  }, [Config, ProductCategory, PostCategory]);

  return (
    <>
      <div className="flex justify-center text-center px-2 text-[14px] font-Montserrat font-normal py-4 bg-black text-white">
        <p className="pr-2">©2024 All Rights reserved</p>
        <p className="pl-2 border-l-[1px] border-gray-400">
          Designed by ADS Company
        </p>
      </div>
    </>
  );
};

export default Copyright;
