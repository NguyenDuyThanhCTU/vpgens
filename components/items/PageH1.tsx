import Link from "next/link";
import React from "react";

interface PageH1Props {
  Title: string;
  type?: string;
}

const PageH1 = ({ Title, type }: PageH1Props) => {
  return (
    <div
      className={`${
        type === "introduction"
          ? `bg-[url(https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/banner-header-about-us.jpg?alt=media&token=18d64faf-57e4-445d-ae52-afc73217eb95)]`
          : type === "collection"
          ? `bg-[url(https://firebasestorage.googleapis.com/v0/b/noithataovua.appspot.com/o/Untitled%20design.jpg?alt=media&token=aec6f94a-5cae-4229-b18f-863b59bd5b29)]`
          : " bg-[url(https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/banner-contact.jpg?alt=media&token=0bc4f419-a647-4999-91f2-4c9cca7e23f6)] "
      } bg-cover bg-no-repeat bg-center bg-right `}
    >
      <div className="flex items-center  w-full h-[320px] bg-gradient-to-r from-[rgba(255,255,255,0.64)]  via-[#ffffff3e] to-[rgba(7,0,0,0)]">
        <div className="w-full text-black  font-Nunito f p:mx-2 flex flex-col justify-between h-full">
          <div></div>
          <h2 className="p:text-[50px]  d:text-[60px] font-bold text-center heading-redborder  ">
            {" "}
            {Title}
          </h2>
          <div
            className={`${
              type === "introduction" &&
              "bg-gradient-to-b from-[rgba(255,255,255,0)] to-white"
            } flex items-center gap-3 justify-center uppercase text-[14px]  py-5  `}
          >
            <Link
              href={`/`}
              className="hover:text-red-600 duration-300 underline"
            >
              Trang chủ
            </Link>
            <span>/</span>
            <span>{Title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageH1;
