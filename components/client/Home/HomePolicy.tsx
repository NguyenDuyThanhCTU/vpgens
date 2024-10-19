import { ContactProps } from "@assets/props/PropsConfig";
import { LocalFindById } from "@components/items/Handle";
import Link from "next/link";
import React from "react";
import { BsBox } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { GiAirplaneDeparture } from "react-icons/gi";
import { GrLike } from "react-icons/gr";

interface HomePolicyProps {
  Config: Array<any>;
}

const HomePolicy = ({ Config }: HomePolicyProps) => {
  const ContactData: ContactProps = LocalFindById(Config, "contact");
  const PolicyItems = [
    {
      icon: <GiAirplaneDeparture />,
      title: "Thương hiệu uy tín",
      content: "Thương hiệu uy tín hàng đầu Việt Nam.",
      link: "/thuong-hieu-uy-tin",
    },
    {
      icon: <BsBox />,
      title: "Đa dạng giống heo",
      content: "Năng suất vượt trội, Hiệu quả hàng đầu.",
      link: "/da-dang-giong-heo",
    },
    {
      icon: <GrLike />,
      title: "Bảo đảm chất lượng",
      content: "Sản phẩm đã dược kiểm định.",
      link: "/bao-dam-chat-luong",
    },
    {
      icon: <FiPhoneCall />,
      title: <>Hotline: {ContactData?.Hotline}</>,
      content: "Dịch vụ hỗ trợ bạn 24/7",
      link: `tel:${ContactData?.Hotline}`,
    },
  ];
  return (
    <div>
      <div className="d:w-[1400px] d:mx-auto p:w-auto p:mx-2 grid p:grid-cols-2 d:grid-cols-4 py-10 p:gap-5 d:gap-0">
        {PolicyItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center flex-col justify-center gap-2"
          >
            <div className="text-[50px]">{item.icon}</div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-center d:text-[14px] text-gray-500 d:h-[42px] p:text-[12px] p:h-[36px]">
              {item.content}
            </p>
            <Link
              href={item.link}
              target="_blank"
              className="hover:text-mainOrange duration-300 d:text-[16px] p:text-[12px]"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePolicy;
