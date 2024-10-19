"use client";
import { Modal, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { FaRegComments, FaRegEdit } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import { useStateProvider } from "@context/StateProvider";
import { FeedbackProps } from "@assets/props";
import { getHighestNumber } from "@components/items/Handle";
import { CommentForm, QuestionForm } from "./Items/Form";

const ProductFeedback = ({
  Data,
  URL,
}: {
  Data: FeedbackProps[];
  URL: string;
}) => {
  const [isCommentForm, setCommentForm] = useState(false);
  const [isQuestionForm, setQuestionForm] = useState(false);
  const { setFormData } = useStateProvider();

  const FeedbackData: FeedbackProps[] = Data?.filter(
    (item) => item.url === URL
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-2">
          <p>Đánh giá</p>
          <div className="bg-gray-200 w-[22px] h-[22px] flex justify-center items-center">
            <p className="">
              {FeedbackData?.filter((item) => item.topic === "comment").length}
            </p>
          </div>
        </div>
      ),
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2">
          <p>Câu hỏi & trả lời</p>
          <div className="bg-gray-200 w-[22px] h-[22px] flex justify-center items-center">
            <p className="">
              {FeedbackData?.filter((item) => item.topic === "question").length}
            </p>
          </div>
        </div>
      ),
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <div>
      <div>
        <h2 className="text-[22px] font-normal">Đánh giá sản phẩm</h2>
        <div className="flex justify-between w-full mt-3">
          <div className="flex justify-center flex-col items-center">
            <div className="text-yellow-500 flex items-center gap-1">
              <IoIosStarOutline />
              <IoIosStarOutline />
              <IoIosStarOutline />
              <IoIosStarOutline />
              <IoIosStarOutline />
            </div>
            <p>Dựa trên 0 đánh giá</p>
          </div>
          <div className="flex items-center gap-4 text-[14px]">
            <div
              className="border rounded-md border-black hover:text-red-600 hover:border-red-600 duration-300 cursor-pointer"
              onClick={() => setCommentForm(true)}
            >
              <div className="py-2 px-3 flex items-center gap-1">
                <FaRegComments />
                <p>Viết đánh giá</p>
              </div>
            </div>
            <div
              className="border rounded-md border-black hover:text-red-600 hover:border-red-600 duration-300 cursor-pointer"
              onClick={() => setQuestionForm(true)}
            >
              <div className="py-2 px-3 flex items-center gap-1">
                <FaRegEdit />
                <p>Đặt câu hỏi</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-4">
          <Tabs
            defaultActiveKey="1"
            items={items}
            className="font-LexendDeca"
          />
        </div>
      </div>

      <>
        <Modal
          closeIcon={null}
          open={isCommentForm}
          footer={null}
          width={1000}
          destroyOnClose={true}
          afterClose={() => setFormData("")}
          onCancel={() => setCommentForm(false)}
        >
          <CommentForm
            setIsOpen={setCommentForm}
            feedbackLength={Data === undefined ? 0 : getHighestNumber(Data) + 1}
            URL={URL}
            type="product"
          />
        </Modal>

        <Modal
          closeIcon={null}
          open={isQuestionForm}
          footer={null}
          width={1400}
          onCancel={() => setQuestionForm(false)}
          destroyOnClose={true}
          afterClose={() => setFormData({})}
          className="custom-ant"
        >
          <QuestionForm
            setIsOpen={setQuestionForm}
            feedbackLength={Data === undefined ? 0 : getHighestNumber(Data) + 1}
            URL={URL}
            type="product"
          />
        </Modal>
      </>
    </div>
  );
};

export default ProductFeedback;
