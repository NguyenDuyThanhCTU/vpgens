"use client";

import { uploadImage } from "@components/items/Handle";

import { insertAndCustomizeId } from "@config/lib/api";
import { useStateProvider } from "@context/StateProvider";
import { notification, Rate, Upload } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import InputForm from "./InputForm";

interface CommentFormProps {
  setIsOpen: (isOpen: boolean) => any;
  feedbackLength: number;
  URL: string;
  type: "post" | "product";
}
interface QuestionFormProps {
  setIsOpen: (isOpen: boolean) => any;
  feedbackLength: number;
  URL: string;
  type: "post" | "product";
}

export const QuestionForm = ({
  setIsOpen,
  feedbackLength,
  URL,
  type,
}: QuestionFormProps) => {
  const { FormData } = useStateProvider();
  const router = useRouter();
  const HandleQuestion = () => {
    if (!FormData.name) {
      notification.error({ message: "Vui lòng nhập tên của bạn!" });
    } else if (!FormData.phonenumber) {
      notification.error({ message: "Vui lòng nhập số điện thoại của bạn!" });
    } else if (!FormData.content) {
      notification.error({
        message: "Vui lòng nhập nội dung đánh giá của bạn!",
      });
    } else {
      let Data = {
        ...FormData,
        topic: "question",
        type: type,
        url: URL,
        stt: feedbackLength,
      };
      insertAndCustomizeId(
        "Feedbacks",
        Data,
        `${feedbackLength ? 100000000000 + feedbackLength : 100000000000}`
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });
    }
  };

  return (
    <div className="font-LexendDeca ">
      <div className="p-3 flex flex-col  justify-between gap-5 text-[16px] min-h-[50vh]">
        <div>
          <div className="border-b text-center pb-2 text-[25px] uppercase font-semibold border-slate-600">
            Câu hỏi của bạn
          </div>
          <div className="mt-5">
            <div className="flex gap-4">
              <InputForm
                Label="Tên"
                Type="Input"
                field="name"
                PlaceHolder="Nhập tên của bạn"
              />
              <InputForm
                Label="Email"
                Type="Input"
                field="email"
                PlaceHolder="Nhập email của bạn"
              />

              <InputForm
                Label="Số điện thoại"
                Type="Input"
                field="phonenumber"
                PlaceHolder="Nhập số điện thoại của bạn"
              />
            </div>

            <InputForm
              Label="Nội dung"
              Type="TextArea"
              field="content"
              PlaceHolder="Viết câu hỏi của bạn"
            />
          </div>
        </div>

        <div
          className="flex justify-end w-full border-t border-slate-600"
          onClick={() => HandleQuestion()}
        >
          <div className="bg-red-600 px-6 py-2 text-white hover:bg-red-700 duration-300 cursor-pointer rounded-lg mt-2">
            Gửi câu hỏi
          </div>
        </div>
      </div>
    </div>
  );
};

export const CommentForm = ({
  setIsOpen,
  feedbackLength,
  URL,
  type,
}: CommentFormProps) => {
  const { FormData, setFormData } = useStateProvider();

  const customRequest = async (options: any) => {
    options.onSuccess({});

    try {
      const url = await uploadImage(options.file, "Feedback");
      const newUrl = {
        uid: options.file.uid,
        url: url,
      };
      if (FormData?.subimage === undefined) {
        setFormData({ ...FormData, subimage: [newUrl] });
      } else {
        setFormData({ ...FormData, subimage: [...FormData?.subimage, newUrl] });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleRemove = (file: any) => {
    const newImageUrl = FormData?.subimage.filter(
      (item: any) => item.uid !== file.uid
    );
    setFormData({ ...FormData, subimage: newImageUrl });
  };

  const router = useRouter();
  const HandleComment = () => {
    if (!FormData.name) {
      notification.error({ message: "Vui lòng nhập tên của bạn!" });
    } else if (!FormData.phonenumber) {
      notification.error({ message: "Vui lòng nhập số điện thoại của bạn!" });
    } else if (!FormData.star) {
      notification.error({ message: "Hãy chọn điểm số đánh giá của bạn!" });
    } else if (!FormData.title) {
      notification.error({
        message: "Vui lòng nhập tiêu đề đánh giá của bạn!",
      });
    } else if (!FormData.content) {
      notification.error({
        message: "Vui lòng nhập nội dung đánh giá của bạn!",
      });
    } else {
      let Data = {
        ...FormData,
        topic: "comment",
        type: type,
        url: URL,
        stt: feedbackLength,
      };
      insertAndCustomizeId(
        "Feedbacks",
        Data,
        `${feedbackLength ? 100000000000 + feedbackLength : 100000000000}`
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });
    }
  };

  return (
    <div className="font-LexendDeca relative ">
      <div className="p-3 flex flex-col gap-5 text-[16px]">
        <div className="border-b text-center pb-2 text-[25px] uppercase font-semibold border-slate-600">
          Đánh giá của bạn
        </div>
        <div className="flex gap-4">
          <InputForm
            Label="Tên"
            Type="Input"
            field="name"
            PlaceHolder="Nhập tên của bạn"
          />
          <InputForm
            Label="Email"
            Type="Input"
            field="email"
            PlaceHolder="Nhập email của bạn"
          />

          <InputForm
            Label="Số điện thoại"
            Type="Input"
            field="phonenumber"
            PlaceHolder="Nhập số điện thoại của bạn"
          />
        </div>

        <div className="mt-5">
          <label>
            Đánh giá <sup className="text-red-500">(*)</sup> :
          </label>
          <div className="mt-2">
            <Rate
              allowHalf
              onChange={(e) => setFormData({ ...FormData, star: e.toString() })}
            />
          </div>
        </div>

        <InputForm
          Label="Nội dung"
          Type="TextArea"
          field="content"
          PlaceHolder="Viết nội dung đánh giá của bạn"
        />
        <InputForm
          Label="Link Video (không bắt buộc)"
          Type="Input"
          field="video"
          PlaceHolder="Nhập link video của bạn"
        />

        <div className="flex flex-col gap-2">
          <label>Hình ảnh (không bắt buộc)</label>
          <Upload
            customRequest={customRequest}
            fileList={FormData?.subimage ? FormData?.subimage : []}
            listType="picture-card"
            onRemove={handleRemove}
          >
            <div className="flex flex-col items-center">
              <AiOutlinePlus className="text-[24px]" />
              <div className="mt-2">Upload</div>
            </div>
          </Upload>
        </div>
        <div className="flex justify-end w-full border-t border-slate-600">
          <div
            className="bg-red-600 px-6 py-2 text-white hover:bg-red-700 duration-300 cursor-pointer rounded-lg mt-2"
            onClick={() => HandleComment()}
          >
            Gửi đánh giá
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 right-0 text-[25px] cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <RxCross1 />
      </div>
    </div>
  );
};

export const PostForm = ({
  setIsOpen,
  feedbackLength,
  URL,
  type,
}: CommentFormProps) => {
  const { FormData, setFormData } = useStateProvider();

  const router = useRouter();
  const HandleComment = () => {
    if (!FormData.name) {
      notification.error({ message: "Vui lòng nhập tên của bạn!" });
    } else if (!FormData.star) {
      notification.error({ message: "Hãy chọn điểm số đánh giá của bạn!" });
    } else if (!FormData.content) {
      notification.error({
        message: "Vui lòng nhập nội dung bình luận của bạn!",
      });
    } else {
      let Data = {
        ...FormData,
        type: type,
        url: URL,
        stt: feedbackLength,
      };
      insertAndCustomizeId(
        "Feedbacks",
        Data,
        `${feedbackLength ? 100000000000 + feedbackLength : 100000000000}`
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });
    }
  };

  return (
    <div className="font-LexendDeca relative ">
      <div className="p-3 flex flex-col gap-5 text-[16px]">
        <div className="border-b text-center pb-2 text-[25px] uppercase font-semibold border-slate-600">
          Bình luận của bạn
        </div>
        <div className="flex gap-4">
          <InputForm
            Label="Tên"
            Type="Input"
            field="name"
            PlaceHolder="Nhập tên của bạn"
          />
          <InputForm
            Label="Email"
            Type="Input"
            field="email"
            PlaceHolder="Nhập email của bạn"
          />
        </div>

        <div className="mt-5">
          <label>
            Đánh giá <sup className="text-red-500">(*)</sup> :
          </label>
          <div className="mt-2">
            <Rate
              allowHalf
              onChange={(e) => setFormData({ ...FormData, star: e.toString() })}
            />
          </div>
        </div>

        <InputForm
          Label="Nội dung"
          Type="TextArea"
          field="content"
          PlaceHolder="Viết nội dung đánh giá của bạn"
        />

        <div className="flex justify-end w-full border-t border-slate-600">
          <div
            className="bg-red-600 px-6 py-2 text-white hover:bg-red-700 duration-300 cursor-pointer rounded-lg mt-2"
            onClick={() => HandleComment()}
          >
            Gửi bình luận
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 right-0 text-[25px] cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <RxCross1 />
      </div>
    </div>
  );
};
