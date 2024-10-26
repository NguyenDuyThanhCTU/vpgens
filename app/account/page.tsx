import Account from "@components/client/Account";
import { find } from "@config/lib/api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tài khoản - Nội Thất Ao Vua",
};

const AccountPage = async () => {
  const Accounts = await find("Accounts", true);
  return (
    <div className="d:w-[1400px] d:mx-auto p:w-auto p:mx-2 ">
      <Account Data={Accounts} />
    </div>
  );
};

export default AccountPage;
