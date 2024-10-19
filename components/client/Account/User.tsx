"use client";

import Link from "next/link";
import React, { useState } from "react";
import LoginForm from "./User/LoginForm";
import { usePathname, useSearchParams } from "next/navigation";
import RegisterForm from "./User/RegisterForm";
import ForgotForm from "./User/ForgotForm";
import { AccountProps } from "@assets/props";
import { getHighestNumber } from "@components/items/Handle";

interface UserProps {
  Accounts: AccountProps[];
}

const User = ({ Accounts }: UserProps) => {
  const [isForgotForm, setForgotForm] = useState(false);

  const searchParams = useSearchParams();
  const paramsValue = searchParams.get("params");

  return (
    <div className="flex flex-col items-center py-10 p:w-auto  d:w-[400px] p:mx-2 d:mx-auto">
      {paramsValue === "login" ? (
        <>
          {isForgotForm ? (
            <ForgotForm setIsOpen={setForgotForm} Accounts={Accounts} />
          ) : (
            <LoginForm setIsOpen={setForgotForm} Accounts={Accounts} />
          )}
        </>
      ) : (
        paramsValue === "register" && (
          <RegisterForm
            Accounts={Accounts}
            accountLength={
              Accounts === undefined ? 0 : getHighestNumber(Accounts) + 1
            }
          />
        )
      )}
    </div>
  );
};

export default User;
