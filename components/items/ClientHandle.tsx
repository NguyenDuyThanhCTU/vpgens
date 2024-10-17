"use client";

import { notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "./Handle";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";

interface ImageUploaderProps {
  setForm: (value: string) => void;
  Form?: any;
  Field?: any;
  PlaceHolder?: any;
}

export function typingEffect(texts: Array<string>, delay: number) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDone, setDone] = useState(false);
  const [RsText, setRsText] = useState("");

  useEffect(() => {
    setRsText(""); // Reset RsText mỗi khi isText thay đổi
    let timeoutIds = [];

    const isText = texts[currentTextIndex];

    // Hiển thị từng ký tự một
    for (let i = 0; i < isText.length; i++) {
      timeoutIds.push(
        setTimeout(() => {
          setRsText((prev) => prev + isText[i]);
        }, i * delay)
      );
    }

    // Đánh dấu là đã hoàn tất hiển thị sau một khoảng thời gian
    timeoutIds.push(
      setTimeout(() => {
        setDone(true);
      }, isText.length * delay)
    );

    // Cleanup timeouts on component unmount
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [currentTextIndex]);

  useEffect(() => {
    if (isDone) {
      let timeoutIds = [];
      const isText = texts[currentTextIndex];

      // Dừng lại 1 giây trước khi bắt đầu xóa
      timeoutIds.push(
        setTimeout(() => {
          // Xóa từng ký tự một
          for (let i = isText.length - 1; i >= 0; i--) {
            timeoutIds.push(
              setTimeout(() => {
                setRsText((prev) => prev.slice(0, i));
              }, (isText.length - i) * delay)
            );
          }

          // Sau khi xóa xong, chuyển sang chuỗi văn bản tiếp theo
          timeoutIds.push(
            setTimeout(() => {
              setDone(false);
              setCurrentTextIndex(
                (prevIndex) => (prevIndex + 1) % texts.length
              );
            }, isText.length * delay)
          );
        }, 2000)
      ); // Chờ 1 giây trước khi bắt đầu xóa

      // Cleanup timeouts on component unmount
      return () => {
        timeoutIds.forEach((id) => clearTimeout(id));
      };
    }
  }, [isDone, currentTextIndex]);

  return RsText;
}

export const StickyTop = (divRef: any) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [height, setHeight] = useState(0);

  if (typeof window !== "undefined") {
    useEffect(() => {
      const handleScroll = () => {
        const position =
          window?.pageYOffset || document.documentElement.scrollTop;
        setScrollPosition(position);
      };

      window?.addEventListener("scroll", handleScroll);
      return () => {
        window?.removeEventListener("scroll", handleScroll);
      };
    }, []);
  }
  useEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight);
    }
  }, []);
  return { height, scrollPosition };
};

export const ImageUploader = ({
  setForm,
  Field,
  Form,
  PlaceHolder,
}: ImageUploaderProps) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = (acceptedFiles: any) => {
    notification.info({
      message: "Đang tải lên",
      description: "Vui lòng chờ trong giây lát",
    });
    const file = acceptedFiles[0];
    uploadImage(file, "avatar").then((url: any) => {
      setForm({ ...Form, [Field]: url });
      setUploadedFile(file);
      notification.success({
        message: "Tải lên thành công",
        description: "Ảnh đã được tải lên thành công",
      });
    });
  };

  useEffect(() => {
    if (Form === undefined) {
      setUploadedFile(null);
    }
  }, [Form]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full max-w-xs mx-auto cursor-pointer">
      <div
        {...getRootProps()}
        className={`bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg p-6 text-center ${
          isDragActive ? "border-blue-500" : ""
        }`}
      >
        <input {...getInputProps()} />
        {Form?.image !== undefined ? (
          <Image
            width={100}
            height={100}
            src={Form[Field]}
            alt="Uploaded"
            className="w-full h-auto mb-4 rounded-lg"
          />
        ) : uploadedFile ? (
          <Image
            height={100}
            width={100}
            src={URL.createObjectURL(uploadedFile)}
            alt="Uploaded"
            className="w-full h-auto mb-4 rounded-lg"
          />
        ) : (
          <div>
            <FaCloudUploadAlt className="mx-auto text-4xl mb-2 text-gray-600" />
            <p>Drag & Drop or Click to Upload</p>
          </div>
        )}
      </div>
    </div>
  );
};
