import { SEOProps } from "@assets/props/PropsConfig";
import HomeBlog from "@components/client/Home/HomeBlog";
import HomeCollection from "@components/client/Home/HomeCollection";
import HomeFacebook from "@components/client/Home/HomeFacebook";
import HomeNewLetter from "@components/client/Home/HomeNewLetter";
import HomePolicy from "@components/client/Home/HomePolicy";
import HomeProductTab from "@components/client/Home/HomeProductTab";
import HomeSlide from "@components/client/Home/HomeSlide";
import HomeStore from "@components/client/Home/HomeStore";
import HomeTrend from "@components/client/Home/HomeTrend";
import { LocalFindById } from "@components/items/Handle";
import { find } from "@config/lib/api";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const Config = await find("Config");
  const SEOmetaTag: SEOProps = LocalFindById(Config, "SEOconfig");
  return {
    description: SEOmetaTag?.Description,
    keywords: SEOmetaTag?.Keyword,
    title: SEOmetaTag?.Title,
  };
}

const HomePage = async () => {
  const Slides = await find("Slides", true);
  const Config = await find("Config");
  const Posts = await find("Posts", true);
  const Products = await find("Products", true);
  const Collections = await find("Collections");

  return (
    <div className="">
      {/* <HomeSlide Data={Slides} />
      <>
        <HomeCollection Data={Products} />
        <HomeTrend Data={Products} />
        <HomeFacebook Config={Config} Data={Collections} />
        <HomeProductTab Data={Products} />
      </>
      <HomeBlog Data={Posts} />
      <HomeStore />
      <HomePolicy Config={Config} />
      <HomeNewLetter /> */}
      <HomeProductTab Data={Products} />
    </div>
  );
};

export default HomePage;
