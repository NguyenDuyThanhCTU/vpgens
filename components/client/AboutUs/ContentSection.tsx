import { PostProps } from "@assets/props/PropsPost";
import Image from "next/image";
import React from "react";

const ContentSection = ({ Data }: { Data: PostProps[] }) => {
  const Introductory = Data?.find((item) => item.id === "introductory");

  return (
    <div className="py-10 bg-slate-100">
      <div className="flex flex-col items-center gap-3">
        <span className="uppercase font-semibold">Việt thái xin chào</span>
        <h2 className="p:text-[24px] d:text-[42px] p:tracking-[4px] d:tracking-[7px] text-center font-semibold">
          Chúng tôi rất vui được hợp tác cùng bạn
        </h2>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/heading-line.webp?alt=media&token=bdcd5ee3-1027-4feb-8377-c0e2aae3e108"
          alt="line"
          width={200}
          height={100}
          className="h-[12px]"
        />
      </div>
      <div className="py-10  d:w-[1300px] d:mx-auto p:w-auto p:mx-2 gap-5 items-center">
        <div
          className="ck-content"
          dangerouslySetInnerHTML={
            Introductory?.content
              ? { __html: Introductory?.content }
              : { __html: "" }
          }
        ></div>
      </div>
    </div>
  );
};

export default ContentSection;
