import { CategoryProps } from "@assets/props/Props";
import { PostProps } from "@assets/props/PropsPost";
import BlogCard from "@components/client/Blogs/BlogCard";
import ProductH1 from "@components/client/Product/ProductH1";
import Category from "@components/client/Slug/Category";
import { PostMetadata } from "@components/items/HandleMetadata";
import { find } from "@config/lib/api";
import { Metadata } from "next";
import React from "react";
import slugify from "slugify";

interface BlogPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const searchFilterParams: any = searchParams.filter;
  const searchCategory: any = searchParams.category;
  const Category: CategoryProps[] = await find("PostCategory");

  const PostTitle = await PostMetadata(
    searchCategory,
    searchFilterParams,
    Category,
    params.slug
  );

  return {
    title: PostTitle.CollectionName ? PostTitle.CollectionName : "Blogs",
  };
}

// export async function generateStaticParams() {
//   const res: CategoryProps[] = await find("PostCategory", true);
//   const slugRes = res.map((items) =>
//     slugify(items.level0, { locale: "vi", lower: true })
//   );
//   return slugRes.map((res) => ({
//     slug: res,
//   }));
// }

const BlogPage = async ({ params, searchParams }: BlogPageProps) => {
  const searchFilterParams: any = searchParams.filter;
  const searchCategory: any = searchParams.category;

  const Posts: PostProps[] = await find("Posts");
  const PostCategory: CategoryProps[] = await find("PostCategory");

  let Datashow: PostProps[] = [];

  if (params.slug) {
    const LV0Data = Posts?.filter((Slug) => Slug.level0 === params.slug);
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
  const SimilarData = Posts?.filter((item: any) => item.level0 == params.slug);

  return (
    <div>
      <ProductH1
        Category={PostCategory}
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
            CategoryData={PostCategory}
            SimilarData={SimilarData}
            type="blogs"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
