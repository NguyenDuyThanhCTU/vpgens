import { ManifestProps, SEOProps } from "@assets/props/PropsConfig";
import { LocalFindById } from "@components/items/Handle";
import { find } from "@config/lib/api";

export default async function manifest() {
  const Config = await find("Config", true);
  const SEOconfig: SEOProps = LocalFindById(Config, "SEOconfig");
  const Manifest: ManifestProps = SEOconfig.Manifest;
  const icons = Manifest?.icons.map((item) => ({
    src: item.src ? item.src : "/favicon.ico",
    sizes: item.sizes ? item.sizes : "any",
    type: item.type ? item.type : "image/x-icon",
  }));
  const RelatedApp = Manifest?.related_applications.map((item) => ({
    platform: item.platform ? item.platform : "/favicon.ico",
    url: item.url ? item.url : "/favicon.ico",
    id: item.id ? item.id : "/favicon.ico",
  }));
  const manifest = {
    name: Manifest?.name ? Manifest?.name : "",
    short_name: Manifest?.short_name ? Manifest?.short_name : "",
    description: Manifest?.description ? Manifest?.description : "",
    icons: icons
      ? icons
      : [
          {
            src: "/favicon.ico",
            sizes: "any",
            type: "image/x-icon",
          },
        ],
    theme_color: Manifest?.theme_color ? Manifest?.theme_color : "#fff",
    background_color: Manifest?.background_color
      ? Manifest?.background_color
      : "#fff",
    start_url: Manifest?.start_url ? Manifest?.start_url : "/",
    display: Manifest?.display ? Manifest?.display : "standalone",
    orientation: Manifest?.orientation ? Manifest?.orientation : "",
    related_applications: RelatedApp ? RelatedApp : [],
    scope: Manifest?.scope ? Manifest?.scope : "",
  };
  return manifest;
}
