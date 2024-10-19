import { ContactProps } from "@assets/props/PropsConfig";
import { ProductProps } from "@assets/props/PropsProduct";
import AddressDropdown from "@components/client/Account/Address/AddressDropdown";
import { StickyTop } from "@components/items/ClientHandle";
import { LocalFindById } from "@components/items/Handle";
import AccountInput from "@components/layout/Items/AccountInput";
import UserInput from "@components/layout/Items/UserInput";
import { useStateProvider } from "@context/StateProvider";
import { useUser } from "@context/UserProvider";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const CartSubmit = () => {
  const [isOpenBill, setOpenBill] = useState(false);
  const { isGlobal } = useStateProvider();
  const { Bill, setBill } = useUser();
  const divRef: any = useRef(null);
  const stickyValue = StickyTop(divRef);
  const ContactData: ContactProps = LocalFindById(isGlobal.Config, "contact");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const currentTime = new Date();

    const dataFields = [
      { title: "Họ Tên KH: ", value: Bill.name },
      { title: "Email: ", value: Bill.email },
      { title: "Số điện thoại: ", value: Bill.phonenumber },
      { title: "Địa chỉ: ", value: Bill?.address },
      { title: "Tỉnh thành", value: Bill?.district },
      { title: "Quận huyện: ", value: Bill?.ward },
      { title: "Thành phố: ", value: Bill?.city },
      { title: "Ghi chú", value: Bill.note },
      {
        title: "Tổng số lượng sản phẩm",
        value: `${Bill?.products.length} Sản phẩm`,
      },
      {
        title: "Chi tiết hóa đơn: ",
        value: `${Bill?.products
          .map((item, idx) => {
            const iProduct: ProductProps = item.product;

            return `----------------------------------------------- Sản phẩm ${idx} ------------------------------------------------- \nTên sản phẩm: ${
              iProduct.title
            } \n số lượng: ${item.quantity} \n mã sản phẩm: ${
              iProduct.id
            } \n mã loại: ${iProduct.level0} \n mã nhóm: ${
              iProduct.grouplv1
            }\n Giá sản phẩm: ${iProduct.price} VNĐ \n Giá mới: ${`${
              iProduct.newPrice ? iProduct.newPrice : 0
            }VNĐ - Giảm ${iProduct.discount}%`} VNĐ \n`;
          })
          .join("")}
        `,
      },
      {
        title: "Tổng Giá trị hóa đơn: ",
        value:
          Bill.totalDiscountPrice !== "0"
            ? `${Number(Bill.totalDiscountPrice).toLocaleString("vi-VN")}₫`
            : `${Number(Bill.totalPrice).toLocaleString("vi-VN")}₫`,
      },
      {
        title: "Tổng Số tiền đã giảm: ",
        value: Bill.totaldiscountedAmount,
      },
      { title: "Thời gian đặt hàng: ", value: currentTime },
    ];

    const data: { [key: string]: string | any } = {};

    dataFields.forEach((field) => {
      data[field.title] = field.value;
    });

    const response = await fetch(
      `https://formsubmit.co/ajax/${
        ContactData?.Email ? ContactData?.Email : "noithataovua86@gmail.com"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      // HandleDiscard();
      // notification["success"]({
      //   message: "Thành công !",
      //   description: `
      //      Chúng tôi sẽ liên hệ trong thời gian sớm nhất !`,
      // });
    } else {
      // notification["error"]({
      //   message: "Lỗi !",
      //   description: `
      //      Lỗi không xác định !`,
      // });
    }
  };
  return (
    <div
      className={`${
        typeof window !== "undefined" &&
        `${
          window?.innerHeight + stickyValue.scrollPosition >
            stickyValue.height && `sticky top-[0px]`
        } border h-max`
      }`}
      ref={divRef}
    >
      <div className="bg-black text-white uppercase p-3 font-normal ">
        Thông tin đơn hàng
      </div>
      <form className="px-3 py-5" onSubmit={handleSubmit}>
        <span className="">
          <strong>Tổng tiền:</strong>
        </span>{" "}
        <span className=" text-[24px] text-mainOrange font-normal">
          {Bill.totalDiscountPrice !== "0"
            ? `${Number(Bill.totalDiscountPrice).toLocaleString("vi-VN")}₫`
            : `${Number(Bill.totalPrice).toLocaleString("vi-VN")}₫`}
        </span>
        <p className="text-[14px]  italic text-mainRed">
          Tiết kiệm:{" "}
          {Number(Bill.totaldiscountedAmount).toLocaleString("vi-VN")}₫
        </p>
        <p className="text-gray-400 text-[14px] py-3 border-b border-dashed border-gray-400">
          Phí vận chuyển sẽ được tính ở trang thanh toán. Bạn cũng có thể nhập
          mã giảm giá ở trang thanh toán.
        </p>
        <div className="py-3 flex flex-col gap-2">
          <AccountInput
            label="Họ của bạn"
            value={Bill}
            setValue={setBill}
            field="name"
            required={true}
          />
          <AccountInput
            label="Gmail của bạn"
            value={Bill}
            setValue={setBill}
            field="gmail"
            required={true}
          />
          <AccountInput
            label="Số điện thoại"
            value={Bill}
            setValue={setBill}
            field="phonenumber"
          />
          <AccountInput
            label="Địa chỉ"
            value={Bill}
            setValue={setBill}
            field="address"
          />
          <AddressDropdown Region={Bill} SelectRegion={setBill} />
        </div>
        <div className="flex  items-center gap-5 mt-4">
          <input
            type="checkbox"
            onChange={(e) => setOpenBill(e.target.checked)}
          />
          <label className={`${isOpenBill && "font-normal text-mainOrange"}`}>
            Xuất hóa đơn
          </label>
        </div>
        <div
          className={`py-2 text-[14px] flex flex-col gap-2 animate__animated ${
            isOpenBill ? "animate__backInUp block" : "hidden"
          }`}
        >
          <AccountInput
            label="Tên công ty"
            value={Bill}
            setValue={setBill}
            field="company"
          />
          <AccountInput
            label="Mã số thuế"
            value={Bill}
            setValue={setBill}
            field="tax"
          />
          <AccountInput
            label="Địa chỉ công ty"
            value={Bill}
            setValue={setBill}
            field="addresscompany"
          />
          <AccountInput
            label="Người nhận hóa đơn"
            value={Bill}
            setValue={setBill}
            field="string"
          />
        </div>
        <div className="w-full mt-4">
          <Link
            href={`/products/all`}
            className="py-2 border border-black text-center  w-full block hover:border-mainOrange duration-300 hover:text-mainOrange"
          >
            {" "}
            Tiếp tục mua hàng
          </Link>

          <button
            type="submit"
            className="py-2 text-white text-center  w-full bg-mainOrange border border-mainOrange mt-2 block hover:bg-mainRed duration-300 cursor-pointer "
          >
            Thanh toán
          </button>
        </div>
      </form>
    </div>
  );
};

export default CartSubmit;
