"use client";

import { CategoryProps } from "@assets/props/Props";
import { ProductProps } from "@assets/props/PropsProduct";
import AddCart from "@components/client/modal/AddCart";
import Cart from "@components/client/modal/Cart";
import FavoriteModal from "@components/client/modal/Favorite";
import QuickView from "@components/client/modal/QuickView";
import RemoveFavor from "@components/client/modal/RemoveFavor";
import { useStateProvider } from "@context/StateProvider";
import Image from "next/image";
import { useEffect } from "react";

interface CopyrightProps {
  Config: Array<any>;
  ProductCategory: CategoryProps[];
  PostCategory: CategoryProps[];
  Products: ProductProps[];
}

interface GlobalProps {
  type: "Config" | "ProductCategory" | "PostCategory";
  data: {};
}

const Copyright = ({
  Config,
  ProductCategory,
  PostCategory,
  Products,
}: CopyrightProps) => {
  const { setGlobal, isOpenModal, setOpenModal, isGlobal } = useStateProvider();
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
      <div className="bg-white d:pb-0 p:pb-[60px]">
        <div className=" d:w-[1400px] p:w-auto d:mx-auto p:mx-2 flex justify-between items-center py-5 d:flex-row p:flex-col gap-3">
          <div className="h-[50px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/footer-logo.jpg?alt=media&token=dbf04f7b-a7b9-419f-9f84-e03b0a44c946"
              alt="logo"
              width={300}
              height={300}
              className="w-full h-full"
            />
          </div>
          <div className="text-[14px] text-gray-600 ">
            © 2024 - All rights reserved by Heo giống Việt Thái
          </div>
        </div>
      </div>

      {isOpenModal.AddCart && (
        <AddCart isOpen={isOpenModal.AddCart} setIsOpen={setOpenModal} />
      )}

      {isOpenModal.RemoveFavor && (
        <RemoveFavor
          isOpen={isOpenModal.RemoveFavor}
          setIsOpen={setOpenModal}
        />
      )}
      {isOpenModal.cart && (
        <Cart
          isOpen={isOpenModal.cart}
          setIsOpen={setOpenModal}
          Products={Products}
        />
      )}
      {isOpenModal.favorite && (
        <FavoriteModal
          Products={Products}
          isOpen={isOpenModal.favorite}
          setIsOpen={setOpenModal}
        />
      )}

      {isOpenModal.quickView && (
        <QuickView
          isOpen={isOpenModal.quickView.state}
          setIsOpen={setOpenModal}
          Product={Products?.find(
            (item: ProductProps) => item.id === isOpenModal.quickView.id
          )}
        />
      )}

      <></>
    </>
  );
};

export default Copyright;
