import Album from "@components/client/Album/Album";
import SlugH1 from "@components/client/Slug/SlugH1";
import PageH1 from "@components/items/PageH1";
import { find } from "@config/lib/api";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Bộ sưu tập - Heo giống Việt Thái",
  description: 'Tại Việt Thái mỗi giống heo là một "Câu chuyện"',
};

const AlbumPage = async () => {
  const Collections = await find("Collections");
  return (
    <div>
      <PageH1 Title="Bộ sưu tập" type="collection" />
      <div className="flex flex-col items-center gap-3 py-10">
        <h2 className="p:text-[24px] d:text-[42px] p:tracking-[4px] d:tracking-[7px] text-center font-semibold">
          Tại Việt Thái mỗi giống heo là một <br /> &quot;Câu chuyện&quot;
        </h2>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/heading-line.webp?alt=media&token=bdcd5ee3-1027-4feb-8377-c0e2aae3e108"
          alt="line"
          width={200}
          height={100}
          className="h-[12px]"
        />
      </div>
      <div>
        <Album Data={Collections} />
      </div>
    </div>
  );
};

export default AlbumPage;
