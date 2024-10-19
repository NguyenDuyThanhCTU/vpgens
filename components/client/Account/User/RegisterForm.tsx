import { AccountProps, RegisterFormProps } from "@assets/props";
import AccountInput from "@components/layout/Items/AccountInput";
import { insertAndCustomizeId } from "@config/lib/api";
import { notification, Radio } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface RegisterForm {
  Accounts: AccountProps[];
  accountLength: number;
}

const RegisterForm = ({ Accounts, accountLength }: RegisterForm) => {
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
    const checked = Accounts?.find(
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
          router.push(`/account?params=login`);

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
    <>
      <h2 className="text-[20px] uppercase">Đăng ký</h2>
      <form className="mt-5 flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
        <AccountInput
          label="Họ của bạn"
          value={isRegisterForm}
          setValue={setRegisterForm}
          field="lastname"
          required={true}
        />
        <AccountInput
          label="Tên của bạn"
          value={isRegisterForm}
          setValue={setRegisterForm}
          field="firstname"
          required={true}
        />
        <AccountInput
          label="Số điện thoại"
          value={isRegisterForm}
          setValue={setRegisterForm}
          field="phonenumber"
          required={true}
        />
        <div>
          <label>Giới tính</label>
          <div className=" mt-2">
            <Radio.Group
              onChange={(e) =>
                setRegisterForm({ ...isRegisterForm, gender: e.target.value })
              }
              defaultValue="Nữ"
              className="grid grid-cols-2 font-LexendDeca font-normal"
              value={isRegisterForm.gender}
            >
              <Radio value="Nữ">Nữ</Radio>
              <Radio value="Nam">Nam</Radio>
            </Radio.Group>
          </div>
        </div>
        <AccountInput
          label="Email"
          value={isRegisterForm}
          setValue={setRegisterForm}
          field="email"
          required={true}
        />
        <AccountInput
          label="Mật khẩu"
          value={isRegisterForm}
          setValue={setRegisterForm}
          field="password"
          required={true}
        />
        <button
          type="submit"
          className="text-center uppercase bg-[#333] py-3  text-white"
        >
          Đăng ký
        </button>
        <div className="flex items-center">
          <div className="w-full h-[1px] bg-gray-400"></div>
          <span className="px-2">Hoặc</span>
          <div className="w-full h-[1px] bg-gray-400"></div>
        </div>
        <Link
          href={`/account?params=login`}
          className="text-center uppercase text-[#333] py-3  border border-black hover:text-white hover:bg-[#333] duration-300"
        >
          Đăng nhập
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
