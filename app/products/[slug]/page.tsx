import { CategoryProps } from "@assets/props/Props";
import { ProductProps } from "@assets/props/PropsProduct";
import { TitleDataProps } from "@components/client/Product/ProductH1";

import { ProductTitle, ProductTitle1 } from "@components/items/HandleMetadata";
import { find } from "@config/lib/api";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";
import slugify from "slugify";

const ProductH1 = dynamic(
  () => import("@components/client/Product/ProductH1"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const Display = dynamic(() => import("@components/client/Product/Display"), {
  loading: () => <p>Loading...</p>,
});

interface ProductPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// export async function generateStaticParams() {
//   const res: CategoryProps[] = await find("ProductCategory", true);
//   const slugRes = res.map((items) =>
//     slugify(items.level0, { locale: "vi", lower: true })
//   );
//   return slugRes.map((res) => ({
//     slug: res,
//   }));
// }

export async function generateMetadata({
  params,
  searchParams,
}: ProductPageProps): Promise<Metadata> {
  const ProductCategory: CategoryProps[] = await find("ProductCategory");
  const searchFilterParams: any = searchParams.filter;

  let TitleData: TitleDataProps = ProductTitle(
    searchParams,
    searchFilterParams,
    ProductCategory,
    params.slug
  );
  const Group: any = ProductCategory.find(
    (item) => item.level0 === "Nhóm sản phẩm"
  );

  let TitleData1: TitleDataProps = ProductTitle1(
    searchParams,
    Group,
    params.slug
  );
  if (params.slug === "all") {
    TitleData.Slug = "Tất cả sản phẩm";
  }

  return {
    title: TitleData.Slug ? TitleData.Slug : TitleData1.Slug,
  };
}

const ProductsPage = async ({ params, searchParams }: ProductPageProps) => {
  const ProductCategory: CategoryProps[] = await find("ProductCategory");
  const Products: ProductProps[] = await find("Products");
  const searchCategory: any = searchParams.category;
  const searchFilterParams: any = searchParams.filter;
  const searchPrams: any = searchParams.s;

  let Datashow: ProductProps[] = [];

  if (params.slug) {
    const LV0Data = Products?.filter((Slug) => Slug.level0 === params.slug);
    const Group1Data = Products?.filter(
      (Slug) => Slug.grouplv1 === params.slug
    );

    if (params.slug === "all") {
      Datashow = Products;

      if (searchPrams) {
        const sort = Products?.filter((product) =>
          product.title.toLowerCase().includes(searchPrams.toLowerCase())
        );

        if (sort) {
          Datashow = sort;
        }
      }
    } else {
      Datashow = LV0Data.length > 0 ? LV0Data : Group1Data;
    }

    if (searchCategory) {
      const LV1Data = LV0Data?.filter((item) => item.level1 === searchCategory);
      const Group2Data = Group1Data?.filter((item) =>
        item.grouplv2.includes(searchCategory)
      );

      Datashow = LV1Data.length > 0 ? LV1Data : Group2Data;

      if (searchFilterParams) {
        const LV2Data = LV1Data?.filter((item) =>
          item.level2?.includes(searchFilterParams)
        );

        Datashow = LV2Data;
      }
    }
  }
  return (
    <div>
      <ProductH1
        Category={ProductCategory}
        FilterParams={searchFilterParams}
        searchParams={searchCategory}
        search={searchPrams}
        slug={params.slug}
      />
      {Datashow && (
        <div className="py-5">
          <Display Data={Datashow} />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
