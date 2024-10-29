import React from 'react'
import ProductH1 from './ProductH1'
import { CategoryProps } from '@assets/props/Props';
import { ProductProps } from '@assets/props/PropsProduct';
import { find } from '@config/lib/api';
import Display from './Display';

interface ProductPageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
  }

  
const Product = async ({ params, searchParams }: ProductPageProps) => {
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
  )
}

export default Product