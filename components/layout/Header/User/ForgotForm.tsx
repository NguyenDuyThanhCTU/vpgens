import { AccountProps, ForgotFormProps } from "@assets/props/PropsAccount";
import UserInput from "@components/layout/Items/UserInput";
import { updateOne } from "@config/lib/api";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ForgotForm {
  Account: AccountProps[];
  setIsOpen: (isOpen: any) => void;
}

const ForgotForm = ({ Account, setIsOpen }: ForgotForm) => {
  const [isForgotForm, setForgotForm] = useState<ForgotFormProps>({
    email: "",
    password: "",
    repassword: "",
    id: "",
  });
  const [isOpenForm, setOpenForm] = useState(false);

  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
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
        setIsOpen("Đăng nhập");
        router.refresh();
      });
    }
  };

  const HandleChecked = () => {
    const checked = Account?.find(
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
    <form className="relative overflow-hidden" onSubmit={handleSubmit}>
      <h2 className="uppercase text-[18px]">Đăng nhập</h2>
      <div className="mt-5 flex flex-col gap-5">
        <UserInput
          label="Email"
          value={isForgotForm}
          setValue={setForgotForm}
          field="email"
          required={true}
        />

        <div
          onClick={() => HandleChecked()}
          className="text-center uppercase bg-[#333] py-3 rounded-md text-white cursor-pointer mt-20"
        >
          Gửi
        </div>
      </div>
      <div
        className={`animate__animated ${
          isOpenForm ? "animate__backInUp block" : "hidden"
        } h-full w-full bg-white  bottom-0 absolute`}
      >
        <div className="mt-5 flex flex-col gap-5">
          <UserInput
            label="Mật khẩu mới"
            value={isForgotForm}
            setValue={setForgotForm}
            field="password"
            required={true}
          />
          <UserInput
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
