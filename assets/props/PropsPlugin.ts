import { ProductProps } from "./PropsProduct";

export interface BranchProps {
  stt: number;
  title: string;
  address: string;
  date: string;
  hotline?: string;
  name?: string;
  timeactive?: string;
}

export interface PartnerProps {
  id: string;
  title: string;
  image: string;
  date: string;
  url: string;
}

export interface GuaranteeProps {
  id: string;
  phonenumber: string;
  guaranteeCode: string;
  userID: string;
  name: string;
  product: ProductProps;
  expirationDate: string;
  daysRemaining: string;
  date: string;
}

export interface FeedbackProps {
  id: string;
  stt: string;
  content: string;
  email: string;
  phonenumber: string;
  name: string;
  date: string;
  star: string;
  type: "post" | "product";
  topic: "comment" | "question";
  url: string;
  video?: string;
  subimage?: Array<any>;
}
