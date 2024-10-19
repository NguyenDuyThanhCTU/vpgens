export interface CategoryProps {
  id: string;
  stt: number;
  level0: string;
  level1: Array<any>;
  trademark: boolean;
  trademarkName: string;
  [key: string]: any;
  date: string;
}

export interface SlideProps {
  id: string;
  image: string;
  platform: "desktop" | "mobile";
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
