import { SEOProps } from "@assets/props/PropsConfig";
import { LocalFindById } from "@components/items/Handle";
import { find } from "@config/lib/api";

export default async function robots() {
  const Config = await find("Config", true);
  const SEOconfig: SEOProps = LocalFindById(Config, "SEOconfig");

  const Robots = SEOconfig?.Robots;
  const Rules = Robots?.rules?.map((item) => ({
    userAgent: item?.userAgent ? item?.userAgent : "*",
    allow: item?.allow ? item?.allow : "/",
    disallow: item?.disallow ? item?.disallow : "",
  }));

  const Sitemap = Robots?.sitemap.map((item) => item);
  const RobotsRs = {
    rules: Rules,
    sitemap: Sitemap,
    host: Robots?.host,
  };
  return RobotsRs.rules || RobotsRs.host || RobotsRs.sitemap
    ? RobotsRs
    : {
        rules: {
          userAgent: "*",
          allow: "/",
          disallow: "/private/",
        },
        sitemap: "https://acme.com/sitemap.xml",
      };
}
