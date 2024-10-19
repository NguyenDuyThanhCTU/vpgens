import { PostProps } from "@assets/props/PropsPost";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface BlogCardProps {
  Data: PostProps;
}

const BlogCard = ({ Data }: BlogCardProps) => {
  return (
    <div className="bg-mainBG rounded-md">
      <div className="p:p-5 d:p-10">
        <Link href={`/${Data?.url}`}>
          <div className="p:h-[100px] d:h-[270px] overflow-hidden rounded-md">
            <Image
              src={Data?.image}
              alt="blog"
              width={400}
              height={400}
              className="w-full h-full hover:scale-105 duration-300 object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col gap-3 mt-3">
          <Link
            href={`/${Data?.url}`}
            className="text-[22px] font-normal text-gray-900 truncate2 d:h-[66px]"
          >
            {Data?.title}
          </Link>
          <div className="text-mainRed font-normal text-[14px]">
            {Data?.date} / {Data?.author ? Data.author : "Nội Thất Ao Vua"}
          </div>
          <p className="truncate3 d:min-h-[72px]">{Data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
