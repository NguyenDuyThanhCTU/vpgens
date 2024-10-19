"use client";
import { Modal, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { FaRegComments, FaRegEdit } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import { useStateProvider } from "@context/StateProvider";

import { getHighestNumber } from "@components/items/Handle";
import { PostForm } from "./Items/Form";
import { FeedbackProps } from "@assets/props/PropsPlugin";

const PostFeedback = ({
  Data,
  URL,
}: {
  Data: FeedbackProps[];
  URL: string;
}) => {
  const [isCommentForm, setCommentForm] = useState(false);
  const { setFormData } = useStateProvider();

  const FeedbackData: FeedbackProps[] = Data?.filter(
    (item) => item.url === URL
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-2">
          <p>Bình luận</p>
          <div className="bg-gray-200 w-[22px] h-[22px] flex justify-center items-center">
            <p className="">{FeedbackData?.length}</p>
          </div>
        </div>
      ),
      children: "Content of Tab Pane 1",
    },
  ];

  return (
    <div>
      <div>
        <h2 className="text-[22px] font-normal text-mainOrange uppercase border-b pb-2">
          Viết bình luận
        </h2>
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
          <div
            className="border rounded-md border-black hover:text-red-600 hover:border-red-600 duration-300 cursor-pointer"
            onClick={() => setCommentForm(true)}
          >
            <div className="py-2 px-3 flex items-center gap-1">
              <FaRegComments />
              <p>Viết bình luận</p>
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
          <PostForm
            setIsOpen={setCommentForm}
            feedbackLength={Data === undefined ? 0 : getHighestNumber(Data) + 1}
            URL={URL}
            type="post"
          />
        </Modal>
      </>
    </div>
  );
};

export default PostFeedback;
