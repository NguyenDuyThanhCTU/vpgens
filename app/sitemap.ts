import {
  ContactProps,
  SEOProps,
  SitemapProps,
} from "@assets/props/PropsConfig";
import { LocalFindById } from "@components/items/Handle";
import { find } from "@config/lib/api";

export default async function sitemap() {
  const Config = await find("Config", true);
  const SEOconfig: SEOProps = LocalFindById(Config, "SEOconfig");
  const contactData: ContactProps = LocalFindById(Config, "contact");

  const Sitemap = SEOconfig?.Sitemap?.map((item: SitemapProps) => ({
    url: item.url,
    lastModified: item.lastModified,
    changeFrequency: item.changeFrequency,
    priority: parseFloat(item.priority),
  }));

  return Sitemap
    ? Sitemap
    : [
        {
          url: "",
          lastModified: "",
          changeFrequency: "",
        },
      ];
}
