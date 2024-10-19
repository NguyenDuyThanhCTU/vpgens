import Cart from "@components/client/Cart/Cart";
import SlugH1 from "@components/client/Slug/SlugH1";
import { Metadata } from "next";

import React from "react";
export const metadata: Metadata = {
  title: "Giỏ hàng - Nội Thất Ao Vua",
};
const CartPage = () => {
  return (
    <div>
      <SlugH1 Page="giỏ hàng" Title="Giỏ hàng" type="cart" />
      <div className="d:w-[1370px] d:mx-auto p:w-auto p:mx-2 py-5">
        <Cart />
      </div>
    </div>
  );
};

export default CartPage;
