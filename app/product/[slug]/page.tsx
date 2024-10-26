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
  params,
}: ProductDetailProps): Promise<Metadata> {
  const Products: ProductProps[] = await find("Products");
  const Data: any = Products?.find((item) => item.url === params.slug);

  return {
    title: Data?.title,
    description: Data?.description,
  };
}
export async function generateStaticParams() {
  const res: ProductProps[] = await find("Products", true);
  return res?.map((product) => ({
    slug: product.url,
  }));
}

const ProductDetailPage = async ({ params }: ProductDetailProps) => {
  const Products: ProductProps[] = await find("Products");
  const Data: any = Products?.find((item) => item.url === params.slug);

  const ProductCategory = await find("ProductCategory");
  const Config = await find("Config");
  return (
    <div>
      <ProductH1 Category={[]} slug="all" type={Data?.title} />
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
