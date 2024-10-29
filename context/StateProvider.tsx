"use client";

import { CategoryProps } from "@assets/props/Props";
import { PostProps } from "@assets/props/PropsPost";
import { ProductProps } from "@assets/props/PropsProduct";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  Config: Array<any>;
}

interface CartItemProps {
  products: ProductProps[];
  //order
  name: string;
  phonenumber: string;
  address: string;
  district: string;
  province: string;
  email: string;
  note: string;
  // invoice
  company: string;
  tax: string;
  addresscompany: string;
  billPayee: string;
  discountcode: string;
  //payment
  shippingmethod: string;
  paymentmethod: string;

  //
}

interface OpenModalProps {
  quickView: {
    state: boolean;
    id: string;
  };
  favorite: boolean;
  cart: boolean;
  RemoveFavor: boolean;
  AddCart: boolean;
  Video: {
    state: boolean;
    url: string;
  };
}

interface GlobalProps {
  Config: Array<any>;
  ProductCategory: CategoryProps[];
  PostCategory: CategoryProps[];
  Blogs: PostProps[]
}

export type StateContextType = {
  FormData: any;
  setFormData: (formData: any) => void;
  verify: boolean;
  setVerify: (verify: any) => void;

  isOpenLogin: any;
  setIsOpenLogin: (isOpen: any) => void;
  isClient: boolean;
  setIsClient: (isClient: any) => void;
  isGlobal: GlobalProps;
  setGlobal: (isGlobal: any) => void;
  isOpenModal: OpenModalProps;
  setOpenModal: (isOpenModal: any) => void;
};

export const StateContext = createContext<StateContextType>({
  FormData: {},
  setFormData: () => {},
  verify: false,
  setVerify: () => {},

  isOpenLogin: false,
  setIsOpenLogin: () => {},

  isClient: false,
  setIsClient: () => {},
  isGlobal: {
    Config: [],
    ProductCategory: [],
    PostCategory: [],
    Blogs:[]
  },
  setGlobal: () => {},
  isOpenModal: {
    quickView: {
      state: false,
      id: "",
    },
    favorite: false,
    cart: false,
    RemoveFavor: false,
    AddCart: false,
    Video: {
      state: false,
      url: "",
    },
  },
  setOpenModal: () => {},
});

export const StateProvider = ({ children, Config }: Props) => {
  const [FormData, setFormData] = useState<any>({});

  //Auth
  const [verify, setVerify] = useState<boolean>(false);
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [isOpenModal, setOpenModal] = useState<OpenModalProps>({
    quickView: {
      state: false,
      id: "",
    },
    favorite: false,
    cart: false,
    RemoveFavor: false,
    AddCart: false,
    Video: {
      state: false,
      url: "",
    },
  });
  const [isGlobal, setGlobal] = useState<GlobalProps>({
    Config: [],
    ProductCategory: [],
    PostCategory: [],
    Blogs:[]
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <StateContext.Provider
      value={{
        isOpenModal,
        setOpenModal,
        isGlobal,
        setGlobal,

        isOpenLogin,
        setIsOpenLogin,

        verify,
        setVerify,

        FormData,
        setFormData,

        isClient,
        setIsClient,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () => useContext(StateContext);
