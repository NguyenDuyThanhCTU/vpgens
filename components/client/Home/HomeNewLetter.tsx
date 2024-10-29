"use client";
import { ContactProps } from "@assets/props/PropsConfig";
import { useTypingEffect } from "@components/items/ClientHandle";
import { LocalFindById } from "@components/items/Handle";
import { useStateProvider } from "@context/StateProvider";
import { notification } from "antd";
import Image from "next/image";
import React, { useState } from "react";

interface isFormProps {
  email: string;
}

const HomeNewLetter = () => {
  const { isGlobal } = useStateProvider();
  const ContactData: ContactProps = LocalFindById(isGlobal?.Config, "contact");
  const [isForm, setForm] = useState<isFormProps>({
    email: "",
  });
  const texts = ["Bạn cần tư vấn ...?", "Nhập địa chỉ email của bạn ..."];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    notification["info"]({
      message: "Thông tin đang được gửi đi",
    });
    const currentTime = new Date();

    const dataFields = [
      { title: "Loại Form: ", value: "Khách hàng đăng ký coupon" },
      { title: "Email: ", value: isForm.email },
      { title: "Thời gian gửi form: ", value: currentTime },
    ];

    const data: { [key: string]: string | any } = {};

    dataFields.forEach((field) => {
      data[field.title] = field.value;
    });

    const response = await fetch(
      `https://formsubmit.co/ajax/${
        ContactData?.Email ? ContactData?.Email : "caonguyenviet007@gmail.com"
      }`,
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
      setForm({ email: "" });
      notification["success"]({
        message: "Thành công",
        description: `
           Chúng tôi sẽ liên hệ trong thời gian sớm nhất !`,
      });
    } else {
      notification["error"]({
        message: "Thất bại",
        description: `Yêu cầu của bạn chưa được gửi đi`,
      });
    }
  };
  return (
    <div id="coupon" className="bg-mainBG">
      <div className="d:w-[1400px] d:mx-auto p:w-auto p:mx-2 py-10 grid p:grid-cols-1 d:grid-cols-2 items-center">
        <div className="flex flex-col gap-3">
          <h3 className="p:text-[18px] d:text-[30px] font-normal">
            Nhận ưu đãi và coupon mới nhất!
          </h3>
          <p>Chúng tôi cam kết bảo mật không lộ thông tin của bạn.</p>
          <form
            className="flex items-center gap-2 w-full "
            onSubmit={handleSubmit}
          >
            <div className="border-2 border-gray-200 w-full rounded-sm">
              <input
                type="text"
                required={true}
                className="outline-none p-2 bg-white w-full"
                placeholder={useTypingEffect(texts, 50)}
              />
            </div>
            <button
              type="submit"
              className="bg-mainOrange text-white font-normal py-2 px-12 uppercase  rounded-sm"
            >
              <p className="w-max"> Đăng ký</p>
            </button>
          </form>
          <p className="text-gray-400">
            Nhận ngay nhiều coupon giảm giá khi đăng ký ngay
          </p>
        </div>
        <div className="h-[375px]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/bg-homenewletter.png?alt=media&token=b960e56b-bb8a-4276-829f-f8b2f0b6cc9e"
            alt="bg"
            width={700}
            height={700}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeNewLetter;
