import Contact from "@components/client/Contact/Contact";
import SlugH1 from "@components/client/Slug/SlugH1";
import PageH1 from "@components/items/PageH1";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Liên Hệ - Heo giống Việt Thái",
  description: "Việt Thái - Trang trại heo giống Số 1 tại Việt Nam",
};

const ContactPage = () => {
  return (
    <div>
      <PageH1 Title="Liên hệ" type="contact" />
      <div className="flex flex-col items-center gap-3 py-10">
        <h2 className="p:text-[24px] d:text-[42px] p:tracking-[4px] d:tracking-[7px] text-center font-semibold">
          Việt Thái - Trang trại heo giống <br /> Số 1 tại Việt Nam
        </h2>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/heading-line.webp?alt=media&token=bdcd5ee3-1027-4feb-8377-c0e2aae3e108"
          alt="line"
          width={200}
          height={100}
          className="h-[12px] "
        />
      </div>
      <div className="py-5">
        <Contact />
      </div>
    </div>
  );
};

export default ContactPage;
