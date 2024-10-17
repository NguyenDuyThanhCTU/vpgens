interface RulesProps {
  name?: string;
  userAgent: string[];
  allow: string[];
  disallow: string[];
}

export interface RobotsProps {
  rules: RulesProps[];
  sitemap: string[];
  host?: string;
}

export interface SitemapProps {
  url: string;
  lastModified: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: string;
}

export type Icon = {
  name?: string;
  src: string;
  sizes: string;
  type: string;
};

export type RelatedApplication = {
  name?: string;
  platform: string;
  url: string;
  id?: string;
};

export type ManifestProps = {
  name: string;
  short_name: string;
  description: string;
  icons: Icon[];
  theme_color: string;
  background_color: string;
  start_url: string;
  display: "fullscreen" | "standalone" | "minimal-ui" | "browser";
  orientation:
    | "any"
    | "natural"
    | "landscape"
    | "landscape-primary"
    | "landscape-secondary"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary";
  related_applications: RelatedApplication[];
  scope: string;
};

export interface InformationProps {
  ImageNotFound: string;
  NotFoundNavigate: string;
  LogoSnippet: string;
  LogoPosition: string;
  ogimage: string;
  ogtitle: string;
  ogdescription: string;
  twimage: string;
  twdescription: string;
  twtitle: string;
  analytics: string;
  remakerting: string;
  livechat: string;
  tag: Array<string>;
}

export interface ContactProps {
  id: string;
  WebsiteAddress: string;
  Hotline: string;
  PhoneNumber: string;
  Email: string;
  WebsiteTime: string;
  CompanyTime: string;
  CompanyAddress: string;
  LogoWebsite: string | any;
  GoogleMap: string;
  direct: string;
  HotlineEN: string;
  PhoneNumberEN: string;
  WebsiteTimeEN: string;
  CompanyTimeEN: string;
  CompanyAddressEN: string;
}

export interface SEOProps {
  Title: string;
  Description: string;
  Favicon: string | any;
  Keyword: [];
  TitleEN?: string;
  DescriptionEN?: string;
  KeywordEN: string;
  Robots: RobotsProps;
  Sitemap: SitemapProps[];
  Manifest: ManifestProps;
}

export interface SocialMediaProps {
  date: string;
  facebook?: string;
  zalo?: string;
  fanpage?: string;
  messenger?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}
