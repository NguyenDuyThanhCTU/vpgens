"use client";
import Image from "next/image";
import React, { useState } from "react";
import LoginForm from "./User/LoginForm";
import RegisterForm from "./User/RegisterForm";

import { getHighestNumber } from "@components/items/Handle";
import ForgotForm from "./User/ForgotForm";
import { AccountProps } from "@assets/props/PropsAccount";

interface UserProps {
  Accounts: AccountProps[];
  setIsOpen: (isOpen: boolean) => void;
}

const User = ({ Accounts, setIsOpen }: UserProps) => {
  const [isCurrentFeature, setCurrentFeature] = useState("Đăng nhập");

  return (
    <>
      <div className="p-4 grid grid-cols-4 font-Nunito font-normal text-[16px]">
        <div className="pr-2 border-r border-gray-300">
          <div>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/Your%20paragraph%20text1231.jpg?alt=media&token=351f8eaa-52ce-427c-acfb-1e7cf1d31faa"
              alt="logo"
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-col mt-2">
            {["Đăng nhập", "Đăng ký", "Quên mật khẩu"].map((item, idx) => (
              <div
                key={idx}
                className={`${
                  isCurrentFeature === item && "bg-slate-100"
                } rounded-md hover:text-mainOrange duration-300 cursor-pointer py-2`}
                onClick={() => setCurrentFeature(item)}
              >
                <p className="px-4"> {item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 ml-2 ">
          <div className="p-3">
            {isCurrentFeature === "Đăng nhập" ? (
              <LoginForm Accounts={Accounts} setIsOpen={setIsOpen} />
            ) : isCurrentFeature === "Đăng ký" ? (
              <RegisterForm
                Account={Accounts}
                accountLength={
                  Accounts === undefined ? 0 : getHighestNumber(Accounts) + 1
                }
                setIsOpen={setCurrentFeature}
              />
            ) : (
              <ForgotForm Account={Accounts} setIsOpen={setCurrentFeature} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
