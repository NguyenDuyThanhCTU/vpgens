import { AccountProps, LoginFormProps } from "@assets/props/PropsAccount";
import AccountInput from "@components/layout/Items/AccountInput";
import { useUser } from "@context/UserProvider";
import { notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface LoginForm {
  setIsOpen: (isOpen: boolean) => void;
  Accounts: AccountProps[];
}
const LoginForm = ({ setIsOpen, Accounts }: LoginForm) => {
  const [isLoginForm, setLoginForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });
  const router = useRouter();
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
      router.push(`/account`);
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
    <>
      <h2 className="text-[20px] uppercase">Đăng nhập</h2>
      <form className="mt-5 flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
        <AccountInput
          label="Email"
          value={isLoginForm}
          setValue={setLoginForm}
          field="email"
          required={true}
        />
        <AccountInput
          label="Mật khẩu"
          value={isLoginForm}
          setValue={setLoginForm}
          field="password"
          required={true}
        />
        <div
          className="text-end underline hover:text-blue-600 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Quên mật khẩu?
        </div>
        <button
          type="submit"
          className="text-center uppercase bg-[#333] py-3  text-white"
        >
          Đăng nhập
        </button>
        <div className="flex items-center">
          <div className="w-full h-[1px] bg-gray-400"></div>
          <span className="px-2">Hoặc</span>
          <div className="w-full h-[1px] bg-gray-400"></div>
        </div>
        <Link
          href={`/account?params=register`}
          className="text-center uppercase text-[#333] py-3  border border-black hover:text-white hover:bg-[#333] duration-300"
        >
          Đăng ký
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
