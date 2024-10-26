"use client";
import { AccountProps, ForgotFormProps } from "@assets/props/PropsAccount";
import AccountInput from "@components/layout/Items/AccountInput";
import { updateOne } from "@config/lib/api";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotForm = ({
  setIsOpen,
  Accounts,
}: {
  setIsOpen: (isOpen: boolean) => void;
  Accounts: AccountProps[];
}) => {
  const [isForgotForm, setForgotForm] = useState<ForgotFormProps>({
    email: "",
    password: "",
    repassword: "",
    id: "",
  });
  const [isOpenForm, setOpenForm] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isForgotForm.password !== isForgotForm.repassword) {
      notification.error({
        message: (
          <p className="font-LexendDeca font-normal">Mật khẩu không khớp</p>
        ),
      });
    } else {
      delete isForgotForm.repassword;
      updateOne("Accounts", isForgotForm.id, isForgotForm).then(() => {
        notification.success({
          message: (
            <p className="font-LexendDeca font-normal">
              Cập nhật tài khoản thành công
            </p>
          ),
        });
        setIsOpen(false);

        router.refresh();
      });
    }
  };

  const HandleChecked = () => {
    const checked = Accounts?.find(
      (item: any) => item.email === isForgotForm.email
    );
    if (checked) {
      setOpenForm(true);
      setForgotForm({ ...isForgotForm, id: checked.id });
    } else if (!isForgotForm.email) {
      notification.error({
        message: (
          <p className="font-LexendDeca font-normal">Vui lòng nhập Email</p>
        ),
      });
    } else {
      notification.error({
        message: (
          <p className="font-LexendDeca font-normal">Email không tồn tại</p>
        ),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <h2 className="text-[20px] uppercase">Quên mật khẩu</h2>
      <div className="mt-5 flex flex-col gap-5 w-full">
        <AccountInput
          label="Email"
          value={isForgotForm}
          setValue={setForgotForm}
          field="email"
          required={true}
        />
        <div
          onClick={() => HandleChecked()}
          className="text-center uppercase bg-[#333] py-3  text-white cursor-pointer"
        >
          Gửi
        </div>
        <div className="flex items-center">
          <div className="w-full h-[1px] bg-gray-400"></div>
          <span className="px-2">Hoặc</span>
          <div className="w-full h-[1px] bg-gray-400"></div>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className="text-center uppercase text-[#333] py-3  border border-black hover:text-white hover:bg-[#333] duration-300 cursor-pointer"
        >
          Đăng nhập
        </div>
      </div>
      <div
        className={`animate__animated ${
          isOpenForm ? "animate__backInUp block" : "hidden"
        } h-full w-full bg-white  bottom-0 absolute`}
      >
        <h2 className="text-[20px] uppercase">Đặt lại mật khẩu</h2>
        <div className="mt-5 flex flex-col gap-5">
          <AccountInput
            label="Mật khẩu mới"
            value={isForgotForm}
            setValue={setForgotForm}
            field="password"
            required={true}
          />
          <AccountInput
            label="Nhập lại mật khẩu"
            value={isForgotForm}
            setValue={setForgotForm}
            field="repassword"
            required={true}
          />

          <button
            type="submit"
            className="text-center uppercase bg-[#333] py-3 rounded-md text-white"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotForm;
