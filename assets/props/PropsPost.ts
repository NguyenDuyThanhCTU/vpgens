export interface PostProps {
  id: string;
  stt: number;
  title: string;
  url: string;
  level0: string;
  date: string;
  image: string;
  keyword?: [];
  level1?: string;
  description?: string;
  content?: string;
  tags?: Array<string>;
}

export interface introductoryProps {
  content: string;
  shortDescription: string;
  date: string;
  image: string;
  level0: "Introductory";
}
