"use client";
import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import Profile from "./Account/Profile";
import History from "./Account/History";
import Address from "./Account/Address";
import { AccountProps } from "@assets/props";
import { usePathname, useRouter } from "next/navigation";
import User from "./Account/User";
import { useUser } from "@context/UserProvider";

const Account = ({ Data }: { Data: AccountProps[] }) => {
  const [isCurrentFeature, setCurrentFeature] = useState("Thông tin tài khoản");
  const router = useRouter();
  const { CurrentUser } = useUser();

  useEffect(() => {
    if (!CurrentUser.checked) {
      router.push(`/account?params=login`);
    }
  }, []);

  return (
    <>
      {CurrentUser.checked ? (
        <div className="grid p:grid-cols-1 d:grid-cols-4 gap-5">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col items-center">
              <BiUser className="text-[40px]" />
              <p>
                Hi,{" "}
                <strong>
                  {CurrentUser.lastname} {CurrentUser.firstname}
                </strong>
              </p>
            </div>
            <div>
              <div className="flex flex-col mt-2">
                {[
                  "Thông tin tài khoản",
                  "Lịch sử mua hàng",
                  "Danh sách địa chỉ",
                  "Đăng xuất",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`${
                      isCurrentFeature === item && "bg-slate-100"
                    } rounded-sm hover:bg-slate-100 duration-300 cursor-pointer py-2`}
                    onClick={() => {
                      if (item === "Đăng xuất") {
                        window.location.reload();
                        router.push(`/account?params=login`);
                        localStorage.removeItem("ntav_k");
                      } else {
                        setCurrentFeature(item);
                      }
                    }}
                  >
                    <p className="px-4 text-gray-600"> {item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="p-3">
              {isCurrentFeature === "Thông tin tài khoản" ? (
                <Profile User={CurrentUser} />
              ) : isCurrentFeature === "Lịch sử mua hàng" ? (
                <History />
              ) : (
                isCurrentFeature === "Danh sách địa chỉ" && <Address />
              )}
            </div>
          </div>
        </div>
      ) : (
        <User Accounts={Data} />
      )}
    </>
  );
};

export default Account;
