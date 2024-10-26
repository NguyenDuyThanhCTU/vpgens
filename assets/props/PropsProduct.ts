export interface SubProductProps {
  id: string;
  pId: string;
  title: string;
  price: any;
  discount?: number;
  discountedAmount?: string;
  newPrice?: string;
  detail?: string;
  image:
    | {
        uid: string;
        url: string;
      }[]
    | any;
}

export interface ProductProps {
  id: string;
  pId: string;
  title: string;
  url: string;
  stt: number;
  image: string;
  level0: string;
  date: string;
  group?: boolean;
  grouplv0: string;
  grouplv1: string;
  grouplv2: string;
  branches?: string;
  price?: string;
  subimage?: {
    uid: string;
    url: string;
  }[];
  bestselling?: boolean;
  content?: string;
  description?: string;
  detail?: string;
  latest?: boolean;
  describe?: string;
  level1?: string;
  level2?: Array<any>;
  Keyword?: [] | any;
  discount?: string;
  discountedAmount?: string;
  newPrice?: string;
  trademark: boolean;
  trademarkName: string;
}

export interface ProductDetailProps extends ProductProps {
  subimage?: {
    uid: string;
    url: string;
  }[];
  content?: string;
  description?: string;
  detail?: string;
  describe?: string;
  Keyword?: [] | any;
}

export interface SaleInfoProps {
  date: string;
  start: string;
  end: string;
  note?: string;
}

export interface SaleDataProps extends ProductProps {
  id: string;
  stt: number;
  // discount: string;
  // discountedAmount: string;
  // newPrice: string;
}

export interface FilterItems {
  label: string;
  value: string;
}

export interface isFilterProps {
  category: FilterItems[];
  group: FilterItems[];
  trademark: FilterItems[];
}
