import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
  orderBy,
  Timestamp,
  deleteDoc,
  limitToLast,
  setDoc,
  startAt,
  limit,
} from "firebase/firestore";
import { db } from "@config/firebase/Firebase";
import { convertDate, convertDocumentData, convertFieldValue } from "./Handle";
import { notification } from "antd";

export const insertOne = async (Collection: string, data: any) => {
  data.createdAt = serverTimestamp();

  try {
    const collectionRef = collection(db, Collection);

    const newDocument = await addDoc(collectionRef, data);
    notification.success({
      message: "Thêm thành công",
    });
    return newDocument.id;
  } catch (error) {
    notification.error({
      message: "Thêm thất bại",
      description: `Mã lỗi: ${error}`,
    });
  }
};

export const insertAndCustomizeId = async (
  Collection: string,
  data: any,
  customDocumentId: string,
  notificationSatate?: any
) => {
  const documentRef = customDocumentId
    ? doc(db, Collection, customDocumentId)
    : doc(collection(db, Collection));

  data.createdAt = serverTimestamp();

  try {
    await setDoc(documentRef, data);
    if (notificationSatate === undefined) {
      notification.success({
        message: "Thành công",
        description: "Dữ liệu sẽ được cập nhật sau vài giây",
      });
    }

    return customDocumentId || documentRef.id;
  } catch (error) {
    notification.error({
      message: "Thất bại",
      description: `Mã lỗi: ${error}`,
    });
  }
};

export const findById = async (
  Collection: string,
  Id: any,
  Signal?: boolean
) => {
  let firebaseEndpoint = `https://firestore.googleapis.com/v1/projects/${process.env.DB_URL}/databases/(default)/documents/${Collection}/${Id}`;

  try {
    const response = await fetch(firebaseEndpoint, {
      next: { revalidate: Signal ? 0 : 1800 },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    const formattedDoc = convertDocumentData(data.fields);
    formattedDoc.date = convertDate(formattedDoc.createdAt);

    return formattedDoc;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    // throw new Error("Failed to fetch data.");
  }
};

export async function find(CollectionName: string, Signal?: boolean) {
  let firebaseEndpoint: string;
  firebaseEndpoint = `https://firestore.googleapis.com/v1/projects/${process.env.DB_URL}/databases/(default)/documents/${CollectionName}`;
  try {
    const response = await fetch(firebaseEndpoint, {
      next: { revalidate: Signal ? 0 : 1800 },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();

    const documents = data.documents.map((doc: any) => {
      const formattedDoc: any = {
        id: doc.name.split("/").pop(),
      };

      for (const field in doc.fields) {
        if (Object.prototype.hasOwnProperty.call(doc.fields, field)) {
          formattedDoc[field] = convertFieldValue(doc.fields[field]);
        }
      }

      formattedDoc.date = convertDate(formattedDoc.createdAt);

      return formattedDoc;
    });

    documents.sort((a: any, b: any) => {
      return a.stt - b.stt;
    });
    return documents;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    // throw new Error("Failed to fetch data.");
  }
}

export const findLimi1 = async (Collection: string) => {
  try {
    const q = query(
      collection(db, Collection),
      orderBy("createdAt"),
      limitToLast(12)
    );
    const querySnapshot = await getDocs(q);
    const data: Array<any> = [];

    querySnapshot.forEach((doc: any) => {
      const createdAt = doc.data().createdAt.toDate();
      const serverTime = Timestamp.now().toDate();

      const timeDiff = serverTime.getTime() - createdAt.getTime();
      const daysDiff = Math.round(timeDiff / 86400000);

      data.push({ id: doc.id, ...doc.data(), daysSinceCreation: daysDiff });
    });

    return data;
  } catch (error) {
    console.error("Error get document: ", error);
  }
};

export const findLimit = async (Collection: string, PageNumber: number) => {
  try {
    const q = query(
      collection(db, Collection),
      orderBy("stt"),
      startAt(PageNumber * 10),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    const data: Array<any> = [];

    querySnapshot.forEach((doc: any) => {
      const createdAt = doc.data().createdAt.toDate();
      const serverTime = Timestamp.now().toDate();

      const timeDiff = serverTime.getTime() - createdAt.getTime();
      const daysDiff = Math.round(timeDiff / 86400000);

      data.push({ id: doc.id, ...doc.data(), daysSinceCreation: daysDiff });
    });

    return data;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const findOne = async (
  Collection: string,
  field: string,
  value: any
) => {
  try {
    const q = query(collection(db, Collection), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    const data: Array<any> = [];

    querySnapshot.forEach((doc: any) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.error("Error get document: ", error);
  }
};

export const updateOne = async (
  collectionName: string,
  id: string,
  newData: any
) => {
  newData.createdAt = serverTimestamp();

  try {
    await updateDoc(doc(db, collectionName, id), newData);
    notification.success({
      message: "Cập nhật thành công",
    });
  } catch (error) {
    try {
      await insertAndCustomizeId(collectionName, newData, id);
      notification.success({
        message: "Thành công",
      });
    } catch (error) {
      notification.error({
        message: "Cập nhật thất bại",
        description: `Mã lỗi: ${error}`,
      });
    }

    throw error;
  }
};
export async function updateOne1(
  collectionName: string,
  id: string,
  newData: any,
  Signal: boolean
) {
  newData.createdAt = serverTimestamp();

  try {
    await updateDoc(doc(db, collectionName, id), newData);
    notification.success({
      message: "Cập nhật thành công",
    });
  } catch (error) {
    try {
      await insertAndCustomizeId(collectionName, newData, id);
      notification.success({
        message: "Thành công",
      });
    } catch (error) {
      notification.error({
        message: "Cập nhật thất bại",
        description: `Mã lỗi: ${error}`,
      });
    }

    throw error;
  }
}

export const deleteOne = async (CollectionName: string, id: string) => {
  try {
    await deleteDoc(doc(db, CollectionName, id)).then(() => {
      notification.success({
        message: "Xóa thành công",
      });
    });
  } catch (error) {
    notification.error({
      message: "Xóa thất bại",
      description: `Mã lỗi: ${error}`,
    });
  }
};
