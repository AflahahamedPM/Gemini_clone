import { SendOutlined } from "@ant-design/icons";
import React from "react";

const SendButton = ({ handleClick }) => {
  return (
    <div
      className="md:p-1 max-md:p-0.5 rounded-full hover:bg-gray-200 bg-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      <SendOutlined className="md:text-xl max-md:text-sm p-1" />
    </div>
  );
};

export default SendButton;
