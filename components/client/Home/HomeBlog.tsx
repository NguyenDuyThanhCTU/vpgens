import { PostProps } from "@assets/props/PropsPost";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface HomeBlogProps {
  Data: PostProps[];
}
const HomeBlog = ({ Data }: HomeBlogProps) => {
  // const newPosts = Data?.reverse().filter(
  //   (item) => item.level0 === "kinh-nghiem-heo-giong"
  // );
  const newPosts = Data.reverse();
  return (
    <div
      id="news"
      className="d:w-[1400px] d:mx-auto p:w-auto p:mx-2 grid p:grid-cols-1 d:grid-cols-2 gap-20 py-10"
    >
      <div>
        <h2 className="text-[30px] font-semibold">Kiến thức chăn nuôi</h2>
        <p className="text-gray-400 mt-2">
          Cùng tìm hiểu kiến thức về chăn nuôi: Cách chọn giống heo, Kỹ thuật
          chăm sóc heo con, ... sẽ như thế nào nhé!
        </p>
        <div className="bg-mainBG mt-4 rounded-md ">
          <div className="p:p-4 d:p-8">
            <Link href={`/${newPosts[0]?.url}`}>
              <div className="w-full h-[353px] rounded-md overflow-hidden">
                <Image
                  src={newPosts[0]?.image}
                  alt="posts"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover rounded-md hover:scale-110 duration-300"
                />
              </div>
            </Link>
            <div className="mt-3">
              <Link
                href={`/${newPosts[0]?.url}`}
                className="text-[22px] font-normal "
              >
                {newPosts[0]?.title}
              </Link>

              <div className="text-mainOrange font-normal mt-2">
                {newPosts[0]?.date} / Tin tức
              </div>

              <p className="truncate3">{newPosts[0]?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {newPosts?.slice(1, 5).map((item, idx) => (
          <div key={idx} className="bg-mainBG">
            <div className="py-8 p:px-4 d:px-8 grid grid-cols-4 gap-5 items-center">
              <Link
                href={`/${item.url}`}
                className="p:h-[50px] d:h-[90px] rounded-lg overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt="posts"
                  width={200}
                  height={200}
                  className="h-full w-full object-cover rounded-lg hover:scale-110 duration-300"
                />
              </Link>
              <div className="col-span-3 gap-5">
                <Link
                  href={`/${item.url}`}
                  className=" hover:text-mainRed duration-300 p:text-[15px] d:text-[20px] font-normal"
                >
                  {item.title}
                </Link>
                <div className="text-mainRed font-normal mt-2 d:text-[16px] p:text-[12px]">
                  {item.date} / Tin tức
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBlog;
