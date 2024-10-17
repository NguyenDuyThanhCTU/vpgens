import { productBillProps } from "@assets/props/PropsPayment";
import { ProductProps } from "@assets/props/PropsProduct";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";

export const LocalFindById = (
  Data: Array<any>,
  id: "SEOconfig" | "SocialMedia" | "contact" | "information"
) => {
  const RS = Data?.find((item) => item.id === id);
  return RS;
};

export const uploadImage = async (fileOrEvent: any, locate: any) => {
  try {
    let selectImage;
    if (fileOrEvent.target && fileOrEvent.target.files) {
      selectImage = fileOrEvent.target.files[0];
    } else {
      selectImage = fileOrEvent;
    }

    const filetypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (filetypes.includes(selectImage.type)) {
      const storage = getStorage();
      let storageRef = ref(storage, `${locate}/${selectImage.name}`);

      const snapshot = await uploadBytes(storageRef, selectImage);
      console.log("Uploaded a blob or file!");

      const url = await getDownloadURL(snapshot.ref);

      return url;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export function getHighestNumber(dataArray: Array<any>) {
  if (dataArray.length === 0) {
    return null; // If the array is empty, return null
  }

  dataArray.sort((a, b) => b.stt - a.stt);

  // The first element in the sorted array will have the largest sequenceNumber
  return dataArray[0].stt;
}

export const IdCount = (isCart: Array<string>) => {
  const idCount: { [key: string]: number } = {};
  isCart.forEach((id) => {
    idCount[id] = (idCount[id] || 0) + 1;
  });

  return idCount;
};

export const CartItemsCacul = (
  Products: ProductProps[],
  isCart: Array<any>,
  idCount: { [key: string]: number }
) => {
  const CartItems: productBillProps[] = Products?.filter(
    (product: ProductProps) => isCart.includes(product.id)
  ).map((product) => ({
    product,
    quantity: idCount[product.id],
    totalPrice:
      (product.price ? parseInt(product.price.replace(/\s+/g, "")) : 0) *
      idCount[product.id],
    totalDiscount:
      (product.newPrice ? parseInt(product.newPrice.replace(/\s+/g, "")) : 0) *
      idCount[product.id],
    totaldiscountedAmount:
      (product.discountedAmount
        ? parseInt(product.discountedAmount.replace(/\s+/g, ""))
        : 0) * idCount[product.id],
  }));
  return CartItems;
};
