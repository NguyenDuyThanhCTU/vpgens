"use client";
import AccountInput from "@components/layout/Items/AccountInput";
import { useStateProvider } from "@context/StateProvider";
import { useUser } from "@context/UserProvider";
import Link from "next/link";
import React, { useState } from "react";
import CartSubmit from "./Items/CartSubmit";
import CartCard from "./Items/CartCard";
import { useTypingEffect } from "@components/items/ClientHandle";

const Cart = () => {
  const { isCart, Bill, setBill } = useUser();
  const texts = [
    "Chúng tôi có thể giúp gì cho bạn ...?",
    "Nhập ghi chú của bạn ...",
  ];
  // console.log(isCart);

  return (
    <>
      <h2 className="font-semibold text-mainOrange text-[25px] uppercase">
        Giỏ hàng của bạn
      </h2>
      <span className="text-gray-600">
        Bạn đang có {isCart.length} sản phẩm trong giỏ hàng
      </span>
      <div className="grid p:grid-cols-1 d:grid-cols-3 gap-5 w-full">
        <div className="col-span-2 ">
          {Bill?.products.map((item, idx) => (
            <div key={idx}>
              <CartCard Product={item} />
            </div>
          ))}
          <div className="my-10">
            <h2 className="font-bold text-[20px]">Ghi chú đơn hàng</h2>

            <textarea
              className="w-full outline-none border p-5 h-32 rounded-sm mt-5"
              value={Bill.note}
              placeholder={useTypingEffect(texts, 50)}
              onChange={(e) => setBill({ ...Bill, note: e.target.value })}
            />
          </div>
        </div>
        <CartSubmit />
      </div>
    </>
  );
};

export default Cart;
