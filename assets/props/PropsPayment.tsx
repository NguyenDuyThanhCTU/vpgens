export interface productBillProps {
  product: any;
  quantity: number;
  totalPrice: number;
  totalDiscount: number;
  totaldiscountedAmount: number;
}

export interface BillProps {
  products: productBillProps[];
  //order
  name: string;
  phonenumber: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  email: string;
  note: string;
  // invoice
  company: string;
  tax: string;
  addresscompany: string;
  billPayee: string;
  discountcode: string;
  //payment
  shippingmethod: string;
  paymentmethod: string;
  totalPrice: string;
  totalDiscountPrice: string;
  totaldiscountedAmount: string;
}
