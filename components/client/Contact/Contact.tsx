"use client";
import React, { useState } from "react";
import { notification } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { SiGmail, SiZalo } from "react-icons/si";

import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import Input from "./Input";
import { useStateProvider } from "@context/StateProvider";
import { ContactProps, SocialMediaProps } from "@assets/props/PropsConfig";
import { LocalFindById } from "@components/items/Handle";

const Contact = () => {
  const { isGlobal } = useStateProvider();
  const ContactData: ContactProps = LocalFindById(isGlobal?.Config, "contact");
  const SocialData: SocialMediaProps = LocalFindById(
    isGlobal?.Config,
    "SocialMedia"
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cities, setCities] = useState<any>("");
  const [districts, setDistricts] = useState("");
  const [wards, setWards] = useState("");
  const [content, setContent] = useState("");

  const HandleDiscard = () => {
    setName("");
    setPhone("");
    setEmail("");
    setCities("");
    setDistricts("");
    setWards("");
    setContent("");
  };

  const HandleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !phone) {
      notification["warning"]({
        message: "Thao tác KHÔNG thành công !",
        description: `
           Vui lòng nhập đầy đủ THÔNG TIN !`,
      });
    } else {
      const dataFields = [
        { title: "Họ Tên:", value: name },
        { title: "SĐT:", value: phone },
        { title: "Email:", value: email },
        { title: "Khu vực:", value: `${cities} - ${districts} - ${wards}` },
        { title: "Nội dung lời nhắn:", value: content },
      ];
      let data: any = {};

      dataFields?.forEach((field) => {
        data[field.title] = field.value;
      });

      const response = await fetch(
        `https://formsubmit.co/ajax/${ContactData?.Email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        notification["success"]({
          message: "Thành công !",
          description: `
             Chúng tôi sẽ liên hệ trong thời gian sớm nhất !`,
        });

        HandleDiscard();
      } else {
        notification["error"]({
          message: "Lỗi !",
          description: `
             Lỗi không xác định !`,
        });
      }
    }
  };
  return (
    <div className="flex flex-col gap-10  font-LexendDeca ">
      <div className="grid p:grid-cols-1 d:grid-cols-2 gap-5 font-extralight d:w-[1370px] d:mx-auto p:w-auto p:mx-2 ">
        <div className="h-full w-full border-r">
          <iframe src={ContactData?.GoogleMap} className="w-full h-full">
            {" "}
          </iframe>
        </div>
        <div className="">
          <div className="flex flex-col gap-5">
            <h1 className="text-[26px] font-bold uppercase">
              Công ty cổ phần nông nghiệp tập đoàn Việt Thái
            </h1>
            <div className="w-10 h-1 bg-black"></div>
          </div>

          <div className="mt-5 flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2">
                <CiLocationOn className="" />

                <h2>Địa chỉ chúng tôi:</h2>
              </div>
              <p className="font-semibold">{ContactData?.CompanyAddress}</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <SiGmail className="" />

                <h2>Email chúng tôi:</h2>
              </div>

              <p className="font-semibold">{ContactData?.Email}</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <BsPhone className="" />

                <h2>Điện thoại:</h2>
              </div>
              <p className="font-semibold">{ContactData?.Hotline}</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <AiOutlineClockCircle className="" />

                <h2>Thời gian làm việc:</h2>
              </div>
              <p className="font-semibold">{ContactData?.CompanyTime}</p>
            </div>
            <div className="w-full items-center">
              <h2 className=" font-normal text-[18px] ">
                Chúng tôi trên Social Networks
              </h2>
              <div className=" flex  gap-2 text-black text-[14px] flex-wrap mt-2">
                <Link
                  href={`${SocialData?.facebook}`}
                  target="_blank"
                  className="bg-white rounded-lg cursor-pointer group"
                >
                  <div className="p-2 flex gap-1 items-center bg-gray-200 rounded-xl">
                    <div className="rounded-full text-[20px] p-1 bg-white text-blue-500 ">
                      <FaFacebook />
                    </div>
                    <p className="group-hover:text-lime-400 duration-300">
                      Facebook
                    </p>
                  </div>
                </Link>
                <Link
                  href={`${SocialData?.youtube}`}
                  target="_blank"
                  className="bg-white rounded-lg cursor-pointer group"
                >
                  <div className="p-2 flex gap-1 items-center bg-gray-200 rounded-xl">
                    <div className="rounded-full text-[20px] p-1 bg-white text-red-500">
                      <FaYoutube />
                    </div>
                    <p className="group-hover:text-lime-400 duration-300">
                      Youtube
                    </p>
                  </div>
                </Link>
                <Link
                  href={`${SocialData?.tiktok}`}
                  target="_blank"
                  className="bg-white rounded-lg cursor-pointer group"
                >
                  <div className="p-2 flex gap-1 items-center bg-gray-200 rounded-xl">
                    <div className="rounded-full text-[20px] p-1 bg-white ">
                      <FaTiktok />
                    </div>
                    <p className="group-hover:text-lime-400 duration-300">
                      Tiktok
                    </p>
                  </div>
                </Link>
                <Link
                  href={`${SocialData?.zalo}`}
                  target="_blank"
                  className="bg-white rounded-lg cursor-pointer group"
                >
                  <div className="p-2 flex gap-1 items-center bg-gray-200 rounded-xl">
                    <div className="rounded-full text-[20px] p-1 bg-white text-blue-500">
                      <SiZalo />
                    </div>
                    <p className="group-hover:text-lime-400 duration-300">
                      Zalo
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p:w-auto d:mx-auto p:mx-2 d:w-[1300px] mx-auto">
        <div className="grid p:grid-cols-1 d:grid-cols-2 border rounded-lg mt-5">
          <div className="p-10">
            <Input
              text="Họ tên*"
              Value={name}
              setValue={setName}
              Input={true}
            />
            <Input
              text="Số điện thoại*"
              Value={phone}
              setValue={setPhone}
              Input={true}
            />
            <Input
              text="Email"
              Value={email}
              setValue={setEmail}
              Input={true}
            />

            <div className="flex flex-col gap-2">
              <label className="font-semibold ">Nội dung lời nhắn</label>
              <textarea
                className="p-2 border border-mainorange outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="flex mt-5 justify-center">
              <div
                className="px-8 py-2 bg-mainRed text-white rounded-full hover:bg-red-700 duration-300 cursor-pointer"
                onClick={() => console.log("e")}
              >
                Gửi ngay
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#f5a142] to-[#f7b05294]">
            <div className="p-10 font-Oswald font-normal text-white flex flex-col gap-5">
              <h2 className="text-[25px]">Liên hệ để nhận tư vấn</h2>
              <div className="w-20 h-[2px] bg-white"></div>
              <div className="text-[40px]">
                Hotline <br />
                <Link
                  href={`tel:${ContactData?.Hotline}`}
                  className="hover:text-lime-400 duration-300 "
                >
                  {ContactData?.Hotline}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className=" py-10">
        <div className="grid grid-cols-2 items-center d:w-[1370px] d:mx-auto p:w-auto p:mx-2 ">
          <div>
            <h3 className="text-[48px] font-light ">
              <strong className="font-bold">Liên hệ</strong> với chúng tôi
            </h3>
            <p className="font-[18px]  ">
              Hãy để lại thông tin đầy đủ theo mẫu, Chúng sẽ liên hệ hỗ trợ bạn
              trong thời gian sớm nhất.
            </p>
            <div className="py-4">
              <h2 className=" text-[20px]  font-semibold">
                Chân thành được lắng nghe từ bạn !
              </h2>
              <p className="text-redPrimmary ">* là các thông tin bắt buộc</p>
            </div>
          </div>
          <div className="border border-slate-500 rounded-xl">
            <div className="flex flex-col gap-2 p-4">
              <Input
                text="Họ tên*"
                Value={name}
                setValue={setName}
                Input={true}
              />
              <Input
                text="Số điện thoại*"
                Value={phone}
                setValue={setPhone}
                Input={true}
              />
              <Input
                text="Email"
                Value={email}
                setValue={setEmail}
                Input={true}
              />

              <div className="flex flex-col gap-2">
                <label className="font-semibold ">Nội dung lời nhắn</label>
                <textarea
                  className="p-2 border border-mainorange outline-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-3">
                <div
                  className="bg-orange-400 hover:bg-orange-600 duration-300 cursor-pointer uppercase px-14 text-white rounded-full py-2"
                  onClick={(e) => HandleSubmit(e)}
                >
                  Gửi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Contact;
