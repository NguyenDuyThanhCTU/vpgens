export interface CategoryProps {
  id: string;
  stt: number;
  level0: string;
  level1: Array<string>;
  date: string;
  group?: boolean;
  grouplv1?: string;
  grouplv2?: string;
  grouplv0?: string;
  trademarkName?: string;
  [key: string]: any;
}

export interface SlideProps {
  id: string;
  image: string;
  type?: string;
  url?: string;
  date: string;
  stt: number;
}

export interface CollectionProps {
  id: string;
  stt: number;
  date: string;
  image: string;
  type: String;
  video?: string;
  embedVideo: string;
  title?: string;
}
