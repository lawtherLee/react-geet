import React, { useState } from "react";
import { NavBar, TextArea } from "antd-mobile";

type Props = {
  name: string;
  onClose?: () => void;
  onSubmit?: (value: string) => void;
};
const CommentInput = ({ name, onClose, onSubmit }: Props) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <NavBar
        onBack={onClose}
        right={
          <span className={"publish"} onClick={() => onSubmit?.(value)}>
            发表
          </span>
        }
      >
        {name ? "回复评论" : "评论文章"}
      </NavBar>
      <div className={"input-area"}>
        {name && <div className={"at"}> @{name}:</div>}
        <TextArea
          onChange={(e) => setValue(e)}
          value={value}
          rows={10}
          placeholder={"说点什么"}
        ></TextArea>
      </div>
    </div>
  );
};

export default CommentInput;
