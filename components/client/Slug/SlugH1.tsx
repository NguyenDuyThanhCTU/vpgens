import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";

interface SlugH1Props {
  Title: string;
  Page: string;
  type?: string;
}

const SlugH1 = ({ Title, Page, type }: SlugH1Props) => {
  return (
    <div
      className={`${
        type === "cart"
          ? `bg-[url(https://firebasestorage.googleapis.com/v0/b/klatexpress.appspot.com/o/asdgasdgasaaaaaaaaaaaaaaaaaaab1.jpg?alt=media&token=bf42d30c-015d-42ac-bbc4-bc2cef8b5df9)]`
          : " bg-[url(https://firebasestorage.googleapis.com/v0/b/noithataovua.appspot.com/o/Untitled%20design.jpg?alt=media&token=aec6f94a-5cae-4229-b18f-863b59bd5b29)] "
      } bg-cover bg-no-repeat bg-center `}
    >
      <div className="flex items-center  w-full h-[320px] bg-gradient-to-r from-[rgba(255,255,255,0.64)]  via-[#ffffff3e] to-[rgba(7,0,0,0)]">
        <div className="d:w-[1370px] d:mx-auto p:w-auto text-black  font-Nunito f p:mx-2">
          <h2 className="p:text-[24px]  d:text-[34px] font-bold"> {Title}</h2>
          <div className="flex items-center gap-2 font-normal tracking-widest p:text-[14px] d:text-[18px] flex-wrap">
            <Link href={`/`} className="hover:text-blue-600 duration-300">
              Home
            </Link>
            <FaAngleRight />
            {/* {type !== "cart" && (
              <>
                <span>
                  {Page === "tin-tuc"
                    ? "Tin tức"
                    : Page === "kinh-nghiem"
                    ? "Kinh nghiệm Thiết kế, Thi công"
                    : Page === "chung-loai-go" && "Chủng loại gỗ"}
                </span>
                <FaAngleRight />
              </>
            )} */}
            <span>{Title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlugH1;
