import { ProductProps } from "@assets/props/PropsProduct";
import ShopCart from "@components/layout/Header/ShopCart";
import { Drawer } from "antd";
import React from "react";

export interface CartProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  Products: ProductProps[];
}

const Cart = ({ isOpen, setIsOpen, Products }: CartProps) => {
  return (
    <Drawer
      onClose={() => setIsOpen(false)}
      closeIcon={null}
      width={500}
      open={isOpen}
      className="reset_Drawer"
    >
      <ShopCart setIsOpen={setIsOpen} Data={Products} />
    </Drawer>
  );
};

export default Cart;
