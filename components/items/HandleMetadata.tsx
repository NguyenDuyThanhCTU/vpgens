import { CategoryProps } from "@assets/props/Props";
import slugify from "slugify";

interface TitleDataProps {
  Slug: string;
  Search: string;
  Filter?: string;
}

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

export const ProductTitle = (
  searchParams: any,
  FilterParams: any,
  Category: CategoryProps[],
  slug: string
): TitleDataProps => {
  let isTitle: TitleDataProps = {
    Slug: "",
    Filter: "",
    Search: "",
  };

  if (slug) {
    const SlugName: any = Category?.find(
      (Slug) => slugify(Slug.level0, { locale: "vi", lower: true }) === slug
    )?.level0;

    const SlugData = Category?.find(
      (Slug) => slugify(Slug.level0, { locale: "vi", lower: true }) === slug
    );

    isTitle = { ...isTitle, Slug: SlugName };

    if (searchParams) {
      const searchName = SlugData?.level1.find(
        (search: string) =>
          slugify(search, { locale: "en", lower: true }) === searchParams
      );

      isTitle = { ...isTitle, Search: searchName };

      if (FilterParams && SlugData) {
        const FilterName = SlugData[
          slugify(searchName, { locale: "vi", lower: true })
        ]?.find(
          (filter: string) =>
            slugify(filter, { locale: "vi", lower: true }) === FilterParams
        );

        isTitle = { ...isTitle, Filter: FilterName };
      }
    }
  }

  return isTitle;
};

export const ProductTitle1 = (
  searchParams: any,
  Category: CategoryProps,
  slug: string
): TitleDataProps => {
  let isTitle: TitleDataProps = {
    Slug: "",

    Search: "",
  };

  if (slug) {
    const searchName = Category?.level1.find(
      (search: string) =>
        slugify(search, { locale: "en", lower: true }) === slug
    );

    isTitle = { ...isTitle, Slug: searchName };

    if (searchParams && Category) {
      const FilterName = Category[
        slugify(searchName ? searchName : "", { locale: "vi", lower: true })
      ]?.find(
        (filter: string) =>
          slugify(filter, { locale: "vi", lower: true }) === searchParams
      );

      isTitle = { ...isTitle, Search: FilterName };
    }
  }

  return isTitle;
};
