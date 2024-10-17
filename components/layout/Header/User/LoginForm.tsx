"use client";

import { AccountProps, LoginFormProps } from "@assets/props/PropsAccount";
import UserInput from "@components/layout/Items/UserInput";
import { useStateProvider } from "@context/StateProvider";
import { useUser } from "@context/UserProvider";
import { notification } from "antd";
import React, { useState } from "react";

interface LoginForm {
  Accounts: AccountProps[];
  setIsOpen: (isOpen: boolean) => void;
}

const LoginForm = ({ Accounts, setIsOpen }: LoginForm) => {
  const [isLoginForm, setLoginForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });
  const { setCurrentUser } = useUser();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const checked = Accounts?.find(
      (item: any) =>
        item.email === isLoginForm.email &&
        item.password === isLoginForm.password
    );
    if (checked) {
      const encodeAccount = encodeURIComponent(JSON.stringify(checked));
      const BaseCurrentUser = btoa(encodeAccount);
      localStorage.setItem("ntav_k", BaseCurrentUser);
      setCurrentUser({ ...checked, checked: true });
      notification.success({
        message: (
          <p className="font-LexendDeca font-normal">Đăng nhập thành công</p>
        ),
        description: (
          <p className="font-normal">Chào mừng bạn đến với Nội Thất Ao Vua</p>
        ),
      });
      setIsOpen(false);
    } else {
      notification.error({
        message: (
          <p className="font-LexendDeca font-normal">
            Đăng nhập không thành công
          </p>
        ),
        description: (
          <p className="font-normal">
            Thông tin email hoặc mật khẩu không chính xác
          </p>
        ),
      });
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <h2 className="uppercase text-[18px]">Đăng nhập</h2>
      <div className="mt-5 flex flex-col gap-5">
        <UserInput
          label="Email"
          value={isLoginForm}
          setValue={setLoginForm}
          field="email"
          required={true}
        />
        <UserInput
          label="Mật khẩu"
          value={isLoginForm}
          setValue={setLoginForm}
          field="password"
          required={true}
        />
        <button
          type="submit"
          className="text-center uppercase bg-[#333] py-3 rounded-md text-white"
        >
          Đăng nhập
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
