import { ProductProps } from "@assets/props/PropsProduct";
import Favorite from "@components/layout/Header/Favorite";
import { Drawer } from "antd";
import React from "react";

export interface FavoriteModalProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  Products: ProductProps[];
}

const FavoriteModal = ({ setIsOpen, isOpen, Products }: FavoriteModalProps) => {
  return (
    <Drawer
      onClose={() => setIsOpen(false)}
      closeIcon={null}
      open={isOpen}
      placement="bottom"
      height={250}
      className="reset_Drawer"
    >
      <Favorite setIsOpen={setIsOpen} Data={Products} />
    </Drawer>
  );
};

export default FavoriteModal;
