export interface PostProps {
  id: string;
  stt: number;
  title: string;
  url: string;
  level0: string;
  level2?: string;
  date: string;
  image: string;
  keyword?: [];
  subimage?: Array<any>;
  level1?: string;
  description?: string;
  isHighlight?: boolean;
  content?: string;
  tags?: Array<string>;
  readingtime?: string;
  author?: string;
}

export interface introductoryProps {
  content: string;
  shortDescription: string;
  date: string;
  image: string;
  level0: "Introductory";
}
