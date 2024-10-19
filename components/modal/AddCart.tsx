import { Modal } from "antd";
import Link from "next/link";
import React from "react";
import { BsFillCartCheckFill } from "react-icons/bs";

interface AddCart {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const AddCart = ({ setIsOpen, isOpen }: AddCart) => {
  return (
    <Modal
      closeIcon={null}
      open={isOpen}
      footer={null}
      width={500}
      centered={true}
      destroyOnClose={true}
      onCancel={() => setIsOpen(false)}
      className=" "
    >
      <div className="font-LexendDeca flex flex-col gap-4 justify-center items-center">
        <BsFillCartCheckFill className="text-[60px] text-mainOrange animate__animated animate__fadeInDown" />
        <span className="d:text-[28px] p:text-[18px] font-bold text-gray-600">
          Cảm ơn bạn!
        </span>
        <span className="d:text-[16px] p:text-[14px]">
          Sản phẩm đã được thêm vào giỏ thành công
        </span>
        <div className="grid grid-cols-2 w-full gap-2 text-white text-[16px] font-normal">
          <div
            className="bg-gray-400  py-2 text-center rounded-md hover:bg-gray-600 duration-300 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Tiếp tục mua sắm
          </div>
          <Link
            href={`/cart`}
            onClick={() => setIsOpen(false)}
            className="bg-mainOrange  py-2 text-center hover:text-white rounded-md hover:bg-mainRed duration-300"
          >
            Đến giỏ hàng
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default AddCart;
