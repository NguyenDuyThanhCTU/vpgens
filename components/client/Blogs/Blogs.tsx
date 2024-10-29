'use client'
import React from 'react'
import ProductH1 from '../Product/ProductH1'
import { PostProps } from '@assets/props/PropsPost';
import { CategoryProps } from '@assets/props/Props';
import { useStateProvider } from '@context/StateProvider';
import BlogCard from './BlogCard';
import Category from '../Slug/Category';
interface ProductPageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
  }

  
const Blogs = ({ params, searchParams }: ProductPageProps) => {
    const {isGlobal} = useStateProvider()
    const searchFilterParams: any = searchParams.filter;
    const searchCategory: any = searchParams.category;
  

  
    let Datashow: PostProps[] = [];
  
    if (params.slug) {
      const LV0Data = isGlobal?.Blogs?.filter((Slug) => Slug.level0 === params.slug);
      Datashow = LV0Data;
  
      if (searchCategory) {
        const LV1Data = LV0Data?.filter((item) => item.level1 === searchCategory);
        Datashow = LV1Data;
        if (searchFilterParams) {
          const LV2Data = LV1Data?.filter((item) =>
            item.level2?.includes(searchFilterParams)
          );
  
          Datashow = LV2Data;
        }
      }
    }
    const SimilarData = isGlobal?.Blogs?.filter((item: any) => item.level0 == params.slug);

  return (
    <div>
    <ProductH1
      Category={isGlobal?.PostCategory}
      FilterParams={searchFilterParams}
      searchParams={searchCategory}
      slug={params.slug}
    />
    <div className="p:grid-cols-1 d:grid-cols-3 py-5 grid d:w-[1370px] d:mx-auto p:w-auto p:mx-2">
      <div className="col-span-2 grid p:grid-cols-1 d:grid-cols-2 gap-5">
        {Datashow?.map((item, idx) => (
          <div key={idx}>
            <BlogCard Data={item} />
          </div>
        ))}
      </div>
      <div className="">
        <Category
          CategoryData={isGlobal?.PostCategory}
          SimilarData={SimilarData}
          type="blogs"
        />
      </div>
    </div>
  </div>
  )
}

export default Blogs