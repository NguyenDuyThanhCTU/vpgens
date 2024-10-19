"use client";
import { AddressProps } from "@assets/props";
import UserInput from "@components/layout/Items/UserInput";
import React, { useState } from "react";
import AddressDropdown from "./Address/AddressDropdown";
import { useUser } from "@context/UserProvider";
import { updateOne } from "@config/lib/api";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { IoAddCircleOutline } from "react-icons/io5";

export const AddressCard = ({ Address }: { Address: AddressProps }) => {
  const CardItems = [
    {
      label: "Địa chỉ",
      value: Address?.address ? (
        Address?.address
      ) : (
        <span className="italic ">Đang cập nhật</span>
      ),
    },
    {
      label: "Tỉnh thành",
      value: Address?.ward ? (
        Address?.ward
      ) : (
        <span className="italic ">Đang cập nhật</span>
      ),
    },
    {
      label: "Quận Huyện",
      value: Address?.district ? (
        Address?.district
      ) : (
        <span className="italic ">Đang cập nhật</span>
      ),
    },
    {
      label: "Thành Phố",
      value: Address?.city ? (
        Address?.city
      ) : (
        <span className="italic ">Đang cập nhật</span>
      ),
    },
    {
      label: "Điện thoại",
      value: Address?.phonenumber ? (
        Address?.phonenumber
      ) : (
        <span className="italic ">Đang cập nhật</span>
      ),
    },
  ];
  return (
    <div className="mt-5 ml-5">
      <h5 className="text-[18px]">
        <strong>
          {Address?.firstname} {Address?.lastname}
        </strong>
      </h5>
      <div>
        {CardItems.map((item, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-3 mt-3">
            <div>{item.label}:</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Address = () => {
  const [isOpenForm, setOpenForm] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isAddressForm, setAddressForm] = useState<AddressProps>({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    phonenumber: "",
  });

  const { CurrentUser } = useUser();
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isChecked) {
      const Data = { ...CurrentUser, defaultAddress: isAddressForm };
      updateOne("Accounts", CurrentUser.id, Data).then(() => {
        router.refresh();
      });
    } else {
      let Data;
      if (!CurrentUser.address) {
        Data = { ...CurrentUser, address: [isAddressForm] };
        updateOne("Accounts", CurrentUser.id, Data).then(() => {
          router.refresh();
        });
      } else if (CurrentUser.address.length > 0) {
        const newaddress = [...CurrentUser.address, isAddressForm];
        Data = { ...CurrentUser, address: newaddress };
        updateOne("Accounts", CurrentUser.id, Data).then(() => {
          router.refresh();
        });
      }
    }
  };
  return (
    <>
      {" "}
      <div className="flex flex-col w-max gap-3">
        <h3 className=" text-[18px] font-normal">Danh sách địa chỉ</h3>
        <div className="h-[1px] bg-black w-[70%]"></div>
      </div>
      <div className="grid p:grid-cols-1 d:grid-cols-2 mt-5 gap-5">
        <div className="flex flex-col gap-10">
          <div>
            <h4 className="uppercase">Địa chỉ mặc định</h4>
            <AddressCard Address={CurrentUser?.defaultAddress} />
          </div>
          <div>
            <h4 className="uppercase">Địa chỉ khác</h4>
            <div className="flex flex-col gap-5">
              {CurrentUser?.address && (
                <>
                  {" "}
                  {CurrentUser?.address.map((item, idx) => (
                    <div key={idx}>
                      <AddressCard Address={item} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex justify-end">
            <div
              className="text-end uppercase cursor-pointer border py-2 px-6 bg-mainOrange text-white flex items-center gap-2"
              onClick={() => setOpenForm(!isOpenForm)}
            >
              Nhập địa chỉ mới
              <IoAddCircleOutline className="text-[25px]" />
            </div>
          </div>

          <form className="" onSubmit={handleSubmit}>
            <div
              className={`animate__animated  ${
                isOpenForm ? "animate__backInUp block" : "hidden"
              }`}
            >
              <div className="mt-5 flex flex-col gap-5">
                <UserInput
                  label="Họ của bạn"
                  value={isAddressForm}
                  setValue={setAddressForm}
                  field="firstname"
                  required={true}
                />
                <UserInput
                  label="Tên của bạn"
                  value={isAddressForm}
                  setValue={setAddressForm}
                  field="lastname"
                  required={true}
                />
                <UserInput
                  label="Số điện thoại"
                  value={isAddressForm}
                  setValue={setAddressForm}
                  field="phonenumber"
                />
                <UserInput
                  label="Địa chỉ"
                  value={isAddressForm}
                  setValue={setAddressForm}
                  field="address"
                />
                <AddressDropdown
                  Region={isAddressForm}
                  SelectRegion={setAddressForm}
                />
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    defaultChecked={isChecked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  <span>Đặt làm địa chỉ mặc định</span>
                </div>
                <button
                  type="submit"
                  className="text-center uppercase bg-[#333] py-3 rounded-md text-white"
                >
                  Thêm mới
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Address;
