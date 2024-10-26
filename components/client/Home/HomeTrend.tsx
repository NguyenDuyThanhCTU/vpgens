import React from "react";
import { revalidateTag } from "next/cache";
import { ProductProps } from "@assets/props/PropsProduct";
import ProductCard from "../Product/ProductCard";

const HomeTrend = ({ Data }: { Data: ProductProps[] }) => {
  const bestselling = Data?.filter((item) => item.bestselling === true);

  async function refetch1() {
    "use server";
    revalidateTag("refetch");
  }
  return (
    <div className="py-10" id="hottrend">
      <div className="d:w-[1400px] p:w-auto d:mx-auto p:mx-2">
        <form className="text-center" action={refetch1}>
          <button
            type="submit"
            className="text-[30px] font-semibold cursor-pointer"
          >
            Hot Trend
          </button>
          <p className="text-gray-400">
            Cập nhật các sản phẩm bán chạy nhất trong tuần!
          </p>
        </form>
        <div className="grid p:grid-cols-2 d:grid-cols-4 gap-6  mt-6">
          {bestselling
            .reverse()
            .slice(0, 8)
            .map((item, idx) => (
              <div key={idx}>
                <ProductCard Product={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTrend;
