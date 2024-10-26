import { find } from "@config/lib/api";
import { Metadata } from "next";
import React from "react";
import { IoCalendar } from "react-icons/io5";
import { AiOutlineUser, AiTwotoneClockCircle } from "react-icons/ai";

import slugify from "slugify";
import { PostProps } from "@assets/props/PropsPost";
import { CategoryProps } from "@assets/props/Props";
import { FeedbackProps } from "@assets/props/PropsPlugin";
import SlugH1 from "@components/client/Slug/SlugH1";
import Category from "@components/client/Slug/Category";
import PostFeedback from "@components/items/Feedback/PostFeedback";

interface PostsDetailProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PostsDetailProps): Promise<Metadata> {
  const posts = await find("Posts");

  const Data: PostProps = posts?.find(
    (item: PostProps) => item.url == params.slug
  );
  return {
    title: Data?.title ? Data?.title : "Bài viết",
    description: Data?.description,
  };
}

export async function generateStaticParams() {
  const res: PostProps[] = await find("Posts", true);
  const resFilter = res.filter((item) => item.id !== "introduction");
  return resFilter.map((post) => ({
    slug: post.url,
  }));
}

const PostDetail = async ({ params }: PostsDetailProps) => {
  const Posts = await find("Posts", true);
  const CategoryData: CategoryProps[] = await find("PostCategory");
  const Feedbacks: FeedbackProps[] = await find("Feedbacks", true);

  const Data: PostProps = Posts?.find(
    (item: PostProps) => item.url == params.slug
  );
  const SimilarData = Posts?.filter((item: any) => item.level0 == Data?.level0);

  return (
    <div>
      <SlugH1 Title={Data?.title} Page={Data?.level0} />
      <div className="p:grid-cols-1 d:grid-cols-3 py-5 grid d:w-[1370px] d:mx-auto p:w-auto p:mx-2">
        <div className="col-span-2">
          <div className="flex  flex-wrap border-b-2  pb-2">
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-2">
                <IoCalendar /> <p className="truncate">{Data?.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <AiTwotoneClockCircle />{" "}
                <p className="truncate">
                  {Data?.readingtime ? Data?.readingtime : "1 min"}
                </p>
              </div>
              <div className="flex items-center  gap-1 ">
                <AiOutlineUser />
                <p className="">
                  {Data?.author ? Data?.author : "Hosana HomeSchool"}
                </p>
              </div>
            </div>
          </div>
          <div
            className="ck-content min-h-[500px] py-2"
            dangerouslySetInnerHTML={
              Data?.content ? { __html: Data?.content } : { __html: "" }
            }
          ></div>
          <PostFeedback
            Data={Feedbacks?.filter((item) => item.type === "post")}
            URL={Data?.url}
          />
        </div>
        <div className="">
          <Category CategoryData={CategoryData} SimilarData={SimilarData} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
