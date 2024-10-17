import { CategoryProps } from "@assets/props/Props";
import slugify from "slugify";

export const PostMetadata = async (
  searchTypeParams: any,
  searchTopicParams: any,
  Category: CategoryProps[],
  slug: string
) => {
  let CollectionName: string;

  const DecodeCategory: any = Category?.find(
    (Citem) =>
      slugify(Citem.level0, {
        locale: "vi",
        lower: true,
      }) === slug
  );

  if (searchTypeParams && searchTopicParams) {
    CollectionName = DecodeCategory[searchTypeParams].find(
      (lv2Item: any) =>
        slugify(lv2Item, { locale: "vi", lower: true }) === searchTopicParams
    );
  } else if (searchTypeParams) {
    CollectionName = DecodeCategory?.level1?.find(
      (Citem: any) =>
        slugify(Citem, {
          locale: "vi",
          lower: true,
        }) === searchTypeParams
    );
  } else {
    CollectionName = DecodeCategory?.level0;
  }
  return { CollectionName };
};
