import { ProductProps } from "@assets/props/PropsProduct";
import ProductDetail from "@components/client/Product/ProductDetail";
import ProductH1 from "@components/client/Product/ProductH1";
import { find, findById } from "@config/lib/api";
import { Metadata } from "next";
import React from "react";
import slugify from "slugify";
type ProductDetailProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: ProductDetailProps): Promise<Metadata> {
  const searchValue = searchParams.poid;

  const products = await find("Products");
  const Products = products?.find((item: any) => item.id == searchValue);

  return {
    title: Products.title,
    description: Products.description,
    keywords: Products.keywords,
  };
}
export async function generateStaticParams() {
  const Products: ProductProps[] = await find("Products");

  return Products.map((item) => ({
    slug: slugify(item.title ? item.title : "", {
      lower: true,
      locale: "vn",
    }),
  }));
}
const ProductDetailPage = async ({
  params,
  searchParams,
}: ProductDetailProps) => {
  const searchValue = searchParams.poid;
  const Data: ProductProps = await findById("Products", searchValue);
  const Products = await find("Products");
  const ProductCategory = await find("ProductCategory");
  const Config = await find("Config");
  return (
    <div>
      <ProductH1 Category={[]} slug="all" type={Data.title} />
      <div className="d:w-[1370px] d:mx-auto p:w-auto p:mx-2 py-5">
        <ProductDetail
          Data={Data}
          Products={Products}
          Config={Config}
          Category={ProductCategory}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
