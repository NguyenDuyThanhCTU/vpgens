import { AccountProps } from "@assets/props/PropsAccount";
import React from "react";

interface ProfileProps {
  User: AccountProps;
}

const Profile = ({ User }: ProfileProps) => {
  const profileItems = [
    {
      label: "Ho tên",
      value: `${User.lastname} ${User.firstname}`,
    },
    {
      label: "Email",
      value: User.email,
    },
    {
      label: "Giới tính",
      value: User.gender ? (
        User.gender
      ) : (
        <span className="italic ">Đang cập nhật</span>
      ),
    },
    {
      label: "Số điện thoại",
      value: User.phonenumber ? (
        User.phonenumber
      ) : (
        <span className="italic ">Đang cập nhật</span>
      ),
    },
    {
      label: "Địa chỉ",
      value: <span className="italic ">Đang cập nhật</span>,
    },
  ];
  return (
    <>
      <div className="flex flex-col w-max gap-3">
        <h3 className=" text-[18px] font-normal">Thông tin tài khoản</h3>
        <div className="h-[1px] bg-black w-[70%]"></div>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {profileItems.map((item, idx) => (
          <div key={idx} className="grid grid-cols-2">
            <div>{item.label}</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;
