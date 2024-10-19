import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeStore = () => {
  return (
    <div id="new-letter" className="grid p:grid-cols-1 d:grid-cols-3 gap-4">
      <div className="flex flex-col items-center justify-center">
        <div className="p:px-2 d:px-32">
          <h2 className="text-[32px] font-normal text-center">
            Tập đoàn Heo giống <br /> Việt Thái
          </h2>
          <p className="text-gray-400 text-center">
            Luôn cố gắng để trở thành phiên bản tốt nhất của chính mình, mang
            đến các sản phẩm chất lượng cho mọi người dùng.
          </p>
          <Link href={`/products/all`}>
            <div>
              <div className="border text-center py-2 mt-8 uppercase border-gray-500 hover:border-mainOrange duration-300 hover:text-mainOrange w-full">
                xem ngay
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="col-span-2 h-full relative">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/vpgens-e2128.appspot.com/o/bg-homestore.jpg?alt=media&token=002ef5ca-b8ad-4228-ba90-77e500e40385"
          alt="bg"
          width={2000}
          height={1000}
        />
        <div className="absolute bottom-0 h-[125px] w-full bg-gradient-to-b from-[rgba(255,255,255,0)] to-white"></div>
        <div className="d:block p:hidden absolute bottom-0 w-[125px] h-full bg-gradient-to-l from-[rgba(255,255,255,0)] to-white"></div>
      </div>
    </div>
  );
};

export default HomeStore;
