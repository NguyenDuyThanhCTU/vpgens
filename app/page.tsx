import { SEOProps } from "@assets/props/PropsConfig";
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

const HomePage = () => {
  return <div className="">HomePage</div>;
};

export default HomePage;
