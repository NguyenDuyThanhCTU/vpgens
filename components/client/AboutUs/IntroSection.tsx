"use client";
import { ContactProps } from "@assets/props/PropsConfig";
import { LocalFindById } from "@components/items/Handle";
import { useStateProvider } from "@context/StateProvider";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

const IntroSection = () => {
  const { isGlobal } = useStateProvider();
  const ContactData: ContactProps = LocalFindById(isGlobal?.Config, "contact");
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-3">
        <span className="uppercase font-semibold">Chúng tôi là ai</span>
        <h2 className="p:text-[24px] d:text-[42px] p:tracking-[4px] d:tracking-[7px] text-center font-semibold">
          Đội ngũ những người đam mê heo giống <br /> hơn 20 năm
        </h2>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/heading-line.webp?alt=media&token=bdcd5ee3-1027-4feb-8377-c0e2aae3e108"
          alt="line"
          width={200}
          height={100}
          className="h-[12px]"
        />
      </div>
      <div className="py-10 grid p:grid-cols-1 d:grid-cols-3 d:w-[1300px] d:mx-auto p:w-auto p:mx-2 gap-5 items-center">
        <div className="flex flex-col gap-10">
          <p>
            Hằng năm Trại heo giống Việt Thái cung ứng ra thị trường hướng
            khoảng 5000 ngàn con heo giống các loại, từ nguồn giống heo cụ kỵ,
            ông bà đa dạng được Việt Thái nhập về từ các trung tâm, trại giống
            hàng đầu thế giới.
          </p>
          <p>
            Trang trại heo giống Việt Thái sẽ trở thành nhà cung cấp heo giống
            hàng đầu Việt Nam, góp phần nâng cao hiệu quả chăn nuôi và phát
            triển ngành chăn nuôi bền vững.
          </p>
          <div className="flex gap-4 items-center">
            <div className="text-[40px] text-gray-500">
              <FiPhoneCall />
            </div>
            <div className="flex flex-col">
              <span>Liên hệ</span>
              <Link
                className="text-main text-[22px]"
                href={`tel:${ContactData?.Hotline}`}
              >
                +84 {ContactData?.Hotline}
              </Link>
            </div>
          </div>
          <div className="flex">
            <div className="border border-gray-500">
              <div className="py-3 flex items-center gap-2 px-8">
                <span>Xem thêm</span>
                <FaRegArrowAltCircleRight />
              </div>
            </div>
          </div>
        </div>
        <div className="p:h-auto d:h-[500px]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/About-us-intro.jpg?alt=media&token=a85a2d57-fc68-4559-b520-5ce6f2791083"
            alt="About-us-intro"
            width={400}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p:h-auto d:h-[500px]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/About-us-intro-1.jpg?alt=media&token=a85a2d57-fc68-4559-b520-5ce6f2791083"
            alt="About-us-intro"
            width={400}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
