"use client";
import { useStateProvider } from "@context/StateProvider";
import { Modal } from "antd";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const VideoModal = () => {
  const { setOpenModal, isOpenModal } = useStateProvider();
  return (
    <Modal
      open={isOpenModal.Video.state}
      onCancel={() =>
        setOpenModal({ ...isOpenModal, Video: { url: "", state: false } })
      }
      className="reset_Modal"
      closeIcon={false}
      width={900}
      centered={true}
      footer={false}
      destroyOnClose={true}
    >
      <div className="p-4 bg-[#333] relative">
        <iframe
          className="w-full "
          height={500}
          // src="https://www.youtube.com/embed/cqcvtcHdt1w?si=MgFqrIaTfuo2Ic2f&autoplay=1"
          //   src={`${isOpenModal?.Video.url}&autoplay=1`}
          src={`${isOpenModal.Video.url}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <div
          className="absolute -top-8 -right-8 text-[30px] text-white cursor-pointer"
          onClick={() =>
            setOpenModal({ ...isOpenModal, Video: { url: "", state: false } })
          }
        >
          <RxCross2 />
        </div>
      </div>
    </Modal>
  );
};

export default VideoModal;
