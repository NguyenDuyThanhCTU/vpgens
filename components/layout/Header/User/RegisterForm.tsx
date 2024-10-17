"use client";

import { AccountProps, RegisterFormProps } from "@assets/props/PropsAccount";
import UserInput from "@components/layout/Items/UserInput";
import { insertAndCustomizeId } from "@config/lib/api";
import { notification, Radio } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface RegisterForm {
  Account: AccountProps[];
  accountLength: number;
  setIsOpen: (isOpen: any) => void;
}

const RegisterForm = ({ Account, accountLength, setIsOpen }: RegisterForm) => {
  const [isRegisterForm, setRegisterForm] = useState<RegisterFormProps>({
    firstname: "",
    lastname: "",
    phonenumber: "",
    gender: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const checked = Account?.find(
      (item: any) => item.email === isRegisterForm.email
    );

    if (checked) {
      notification.error({
        message: (
          <p className="font-LexendDeca font-normal">
            Đăng ký không thành công
          </p>
        ),
        description: <span>Email đã được đăng ký</span>,
      });
    } else {
      let Data = {
        ...isRegisterForm,
        stt: accountLength,
        id: `${accountLength ? 100000000000 + accountLength : 100000000000}`,
        defaultAddress: {
          firstname: isRegisterForm.firstname,
          lastname: isRegisterForm.lastname,
          phonenumber: isRegisterForm.phonenumber,
        },
      };
      insertAndCustomizeId(
        "Accounts",
        Data,
        `${accountLength ? 100000000000 + accountLength : 100000000000}`
      )
        .then(() => {
          router.refresh();
          setIsOpen("Đăng nhập");
          notification.success({
            message: (
              <p className="font-LexendDeca font-normal">
                Tạo tài khoản thành công
              </p>
            ),
          });
        })
        .catch((err) => {
          notification.error({
            message: "Tạo tài khoản không thành công",
          });
        });
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <h2 className="uppercase text-[18px]">Đăng ký</h2>
      <div className="mt-5 flex flex-col gap-8">
        <UserInput
          label="Họ của bạn"
          value={isRegisterForm}
          setValue={setRegisterForm}
          field="lastname"
          required={true}
        />

        <UserInput
          label="Tên của bạn"
          value={isRegisterForm}
          setValue={setRegisterForm}
          field="firstname"
          required={true}
        />
        <UserInput
          label="Số điện thoại"
          value={isRegisterForm}
          setValue={setRegisterForm}
          field="phonenumber"
        />
        <div>
          <label>Giới tính</label>
          <div className=" mt-1">
            <Radio.Group
              onChange={(e) =>
                setRegisterForm({ ...isRegisterForm, gender: e.target.value })
              }
              defaultValue="Nữ"
              value={isRegisterForm.gender}
            >
              <Radio value="Nữ">Nữ</Radio>
              <Radio value="Nam">Nam</Radio>
            </Radio.Group>
          </div>
        </div>
        <UserInput
          label="Email"
          value={isRegisterForm}
          setValue={setRegisterForm}
          field="email"
          required={true}
        />
        <UserInput
          label="Mật khẩu"
          value={isRegisterForm}
          setValue={setRegisterForm}
          field="password"
          required={true}
        />
        <button
          type="submit"
          className="text-center uppercase bg-[#333] py-3 rounded-md text-white"
        >
          Đăng ký
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
