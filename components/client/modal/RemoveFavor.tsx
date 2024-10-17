import { Modal } from "antd";
import React from "react";
import { TiTick } from "react-icons/ti";

interface RemoveFavorProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const RemoveFavor = ({ setIsOpen, isOpen }: RemoveFavorProps) => {
  return (
    <Modal
      closeIcon={null}
      open={isOpen}
      footer={null}
      width={500}
      centered={true}
      destroyOnClose={true}
      onCancel={() => setIsOpen(false)}
      className="animate__animated"
    >
      <div className="font-LexendDeca flex flex-col gap-4 justify-center items-center">
        <TiTick className="text-[60px] text-blue-600 " />
        <span className="d:text-[16px] p:text-[14px]">
          Sản phẩm đã được xóa khỏi danh sách yêu thích
        </span>
        <div className="flex justify-center mt-2">
          <div
            className="bg-blue-600 text-[18px] px-8 py-2 rounded-md text-white cursor-pointer hover:bg-blue-800 duration-300"
            onClick={() => setIsOpen(false)}
          >
            OK
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveFavor;
