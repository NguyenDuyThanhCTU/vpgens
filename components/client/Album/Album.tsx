"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Image } from "antd";
import { CollectionProps } from "@assets/props/Props";
import { useState } from "react";
import { useStateProvider } from "@context/StateProvider";

const Album = ({ Data }: { Data: CollectionProps[] }) => {
  const { setOpenModal, isOpenModal } = useStateProvider();
  const [isSelected, setSelected] = useState("Hình ảnh");
  const ImageCollection = Data?.filter((item) => item.type === "hinh-anh");
  const VideoCollection = Data?.filter((item) => item.type === "video");
  const [DataShow, setDataShow] = useState<CollectionProps[]>(ImageCollection);
  const AlbumItems = [
    {
      label: "Hình ảnh",
      value: "hinh-anh",
    },
    {
      label: "Video",
      value: "video",
    },
  ];

  const groups = [];
  for (let i = 0; i < DataShow.length; i += 6) {
    groups.push(DataShow.slice(i, i + 6));
  }
  const groupsVideoMobile = [];
  for (let i = 0; i < DataShow.length; i += 4) {
    groupsVideoMobile.push(DataShow.slice(i, i + 4));
  }
  return (
    <div className="h-screen grid grid-cols-2 d:w-[1300px] d:mx-auto p:w-auto p:mx-2 py-2 relative">
      <div></div>
      <div className="bg-slate-200 w-full h-full"></div>
      <div className="w-full h-full absolute top-10 bg-none p:px-2 d:px-20">
        <div className="w-full grid p:grid-cols-1 d:grid-cols-2">
          <h3 className="p:text-[30px] d:text-[48px] font-light ">
            <strong className="font-bold">Album</strong> hình ảnh
          </h3>
          <div className="flex justify-end items-center gap-5">
            {AlbumItems.map((item, idx) => (
              <div
                className={`${
                  isSelected === item.label
                    ? "bg-main text-white"
                    : "bg-white text-gray-600"
                } px-4 py-2  rounded-full italic cursor-pointer `}
                key={idx}
                onClick={() => {
                  setSelected(item.label);
                  if (item.value === "hinh-anh") {
                    setDataShow(ImageCollection);
                  } else if (item.value === "video") {
                    setDataShow(VideoCollection);
                  }
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5  rounded-xl">
          <div
            className={`animate__animated ${
              isSelected === "Hình ảnh" ? "animate__backInUp block" : "hidden"
            } h-[85vh] p:px-0 d:px-10`}
          >
            <Swiper
              slidesPerView={1}
              centerInsufficientSlides={true}
              centeredSlides={true}
              centeredSlidesBounds={true}
              spaceBetween={30}
              modules={[Pagination]}
              pagination={{
                clickable: true,
              }}
              className="mySwiper custom-pagination"
              style={{ paddingBottom: "50px" }}
            >
              {groups?.map((subData, idx) => (
                <SwiperSlide key={idx}>
                  <div className="grid p:grid-cols-2 d:grid-cols-3 gap-5">
                    {subData.map((item, idx) => (
                      <div key={idx}>
                        <div className="d:hidden p:block">
                          <Image
                            key={idx}
                            src={item.image}
                            alt="collection"
                            style={{ height: "160px" }}
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="d:block p:hidden">
                          {" "}
                          <Image
                            key={idx}
                            src={item.image}
                            alt="collection"
                            style={{ height: "350px" }}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div
            className={`animate__animated ${
              isSelected === "Video"
                ? "animate__backInUp d:block  p:hidden"
                : "hidden"
            } h-[85vh] p:px-0 d:px-10 `}
          >
            <Swiper
              slidesPerView={1}
              centerInsufficientSlides={true}
              centeredSlides={true}
              centeredSlidesBounds={true}
              spaceBetween={30}
              modules={[Pagination]}
              pagination={{
                clickable: true,
              }}
              className="mySwiper custom-pagination"
              style={{ paddingBottom: "50px" }}
            >
              <div className="">
                {groups?.map((subData, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="grid p:grid-cols-2 d:grid-cols-3 gap-5">
                      {subData.map((item, idx) => (
                        <div key={idx} className="rounded-md bg-white">
                          <div className="h-[150px] cursor-pointer relative">
                            <iframe
                              className="w-full rounded-t-md"
                              src={item.embedVideo}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                            <div
                              className="bg-[rgba(0,0,0,0.36)] absolute w-full h-full top-0"
                              onClick={() => {
                                setOpenModal({
                                  ...isOpenModal,
                                  Video: { state: true, url: item.embedVideo },
                                });
                              }}
                            ></div>
                          </div>
                          <div className="p-4">
                            <span className="d:text-[16px] p:text-[12px]">
                              {item.date}
                            </span>
                            <h2
                              className="p:text-[14px] d:text-[20px] font-semibold hover:text-mainRed duration-300 cursor-pointer"
                              onClick={() =>
                                setOpenModal({
                                  ...isOpenModal,
                                  Video: { state: true, url: item.embedVideo },
                                })
                              }
                            >
                              {item.title}
                            </h2>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
          <div
            className={`animate__animated ${
              isSelected === "Video"
                ? "animate__backInUp block  p:block d:hidden"
                : " hidden "
            } h-[85vh] p:px-0 d:px-10 `}
          >
            <Swiper
              slidesPerView={1}
              centerInsufficientSlides={true}
              centeredSlides={true}
              centeredSlidesBounds={true}
              spaceBetween={30}
              modules={[Pagination]}
              pagination={{
                clickable: true,
              }}
              className="mySwiper custom-pagination"
              style={{ paddingBottom: "50px" }}
            >
              <div className="">
                {groupsVideoMobile?.map((subData, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="grid p:grid-cols-2 d:grid-cols-3 gap-5">
                      {subData.map((item, idx) => (
                        <div key={idx} className="rounded-md bg-white">
                          <div className="h-[150px] cursor-pointer relative">
                            <iframe
                              className="w-full rounded-t-md"
                              src={item.embedVideo}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                            <div
                              className="bg-[rgba(0,0,0,0.36)] absolute w-full h-full top-0"
                              onClick={() => {
                                setOpenModal({
                                  ...isOpenModal,
                                  Video: { state: true, url: item.embedVideo },
                                });
                              }}
                            ></div>
                          </div>
                          <div className="p-4">
                            <span className="d:text-[16px] p:text-[12px]">
                              {item.date}
                            </span>
                            <h2
                              className="p:text-[14px] d:text-[20px] font-semibold hover:text-mainRed duration-300 cursor-pointer"
                              onClick={() =>
                                setOpenModal({
                                  ...isOpenModal,
                                  Video: { state: true, url: item.embedVideo },
                                })
                              }
                            >
                              {item.title}
                            </h2>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
