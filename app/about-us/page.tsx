import ContentSection from "@components/client/AboutUs/ContentSection";
import IntroSection from "@components/client/AboutUs/IntroSection";
import PageH1 from "@components/items/PageH1";
import { find } from "@config/lib/api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Giới thiệu - Heo giống Việt Thái",
  description: " Đội ngũ những người đam mê heo giống hơn 20 năm",
};

const AboutUsPage = async () => {
  const Posts = await find("Posts");

  return (
    <div>
      <PageH1 Title="Giới thiệu" type="introduction" />
      <div>
        <IntroSection />
        <ContentSection Data={Posts} />
      </div>
    </div>
  );
};

export default AboutUsPage;
