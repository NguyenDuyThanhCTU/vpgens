"use client";

import { AccountProps } from "@assets/props/PropsAccount";
import { BillProps } from "@assets/props/PropsPayment";
import { ProductProps } from "@assets/props/PropsProduct";
import { CartItemsCacul, IdCount } from "@components/items/Handle";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  Accounts: AccountProps[];
  Products: ProductProps[];
}

export type StateContextType = {
  Bill: BillProps;
  setBill: (Bill: any) => void;
  CurrentUser: AccountProps;
  setCurrentUser: (currentUser: any) => void;
  isFavorite: Array<string>;
  setFavorite: (isFavorite: any) => void;
  isCart: Array<string>;
  setCart: (isFavorite: any) => void;
};

export const StateContext = createContext<StateContextType>({
  Bill: {
    products: [],
    name: "",
    phonenumber: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    email: "",
    note: "",
    company: "",
    tax: "",
    addresscompany: "",
    billPayee: "",
    discountcode: "",
    shippingmethod: "",
    paymentmethod: "",
    totalPrice: "",
    totalDiscountPrice: "",
    totaldiscountedAmount: "",
  },
  setBill: () => {},

  CurrentUser: {
    stt: 0,
    id: "",
    firstname: "",
    address: [],
    defaultAddress: {
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      phonenumber: "",
    },
    checked: false,
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    gender: "",
    date: "",
  },
  setCurrentUser: () => {},
  isFavorite: [],
  setFavorite: () => {},
  isCart: [],
  setCart: () => {},
});

export const UserProvider = ({ children, Accounts, Products }: Props) => {
  const [CurrentUser, setCurrentUser] = useState<AccountProps>({
    stt: 0,
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    address: [],
    defaultAddress: {
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      phonenumber: "",
    },
    checked: false,
    password: "",
    phonenumber: "",
    gender: "",
    date: "",
  });
  const [Bill, setBill] = useState<BillProps>({
    products: [],
    name: "",
    phonenumber: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    email: "",
    note: "",
    company: "",
    tax: "",
    addresscompany: "",
    billPayee: "",
    discountcode: "",
    shippingmethod: "",
    paymentmethod: "",
    totalPrice: "",
    totalDiscountPrice: "",
    totaldiscountedAmount: "",
  });
  let separator = ",";
  const [isFavorite, setFavorite] = useState<Array<string>>([]);

  const [isCart, setCart] = useState<Array<any>>([]);

  useEffect(() => {
    const localFavorite = localStorage.getItem("favorite");
    const localCart = localStorage.getItem("cart");

    if (localFavorite) {
      const resultArray = localFavorite.split(separator);
      setFavorite(resultArray);
    }
    if (localCart) {
      const resultArray = localCart.split(separator);
      // const intCart = resultArray.map((value) => parseInt(value));

      setCart(resultArray);
    }
  }, []);

  useEffect(() => {
    const resultString = isFavorite.join(separator);
    localStorage.setItem("favorite", resultString);
  }, [isFavorite]);

  useEffect(() => {
    const resultString = isCart.join(separator);

    localStorage.setItem("cart", resultString);

    const idCount: { [key: string]: number } = IdCount(isCart);

    const CartItems = idCount ? CartItemsCacul(Products, isCart, idCount) : [];

    if (CartItems) {
      // console.log(CartItems);
      setBill({
        ...Bill,
        products: CartItems,
        totalPrice: `${CartItems.reduce(
          (acc, item) => acc + item.totalPrice,
          0
        )}`,
        totalDiscountPrice: `${CartItems.reduce(
          (acc, item) => acc + item.totalDiscount,
          0
        )}`,
        totaldiscountedAmount: `${CartItems.reduce(
          (acc, item) => acc + item.totaldiscountedAmount,
          0
        )}`,
      });
    }
  }, [isCart]);

  useEffect(() => {
    const userKey = localStorage.getItem("ntav_k");
    if (userKey) {
      const strCurrentUser = atob(userKey);
      const decodeAccount = decodeURIComponent(strCurrentUser);
      const CurrentUser: AccountProps = JSON.parse(decodeAccount);
      const checked = Accounts?.find(
        (item) =>
          item.email === CurrentUser.email &&
          item.password === CurrentUser.password
      );
      if (checked) {
        setCurrentUser({ ...checked, checked: true });
      } else {
        localStorage.removeItem("ntav_k");
      }
    }
  }, [Accounts]);
  return (
    <StateContext.Provider
      value={{
        isCart,
        setCart,
        isFavorite,
        setFavorite,
        CurrentUser,
        setCurrentUser,
        setBill,
        Bill,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useUser = () => useContext(StateContext);
