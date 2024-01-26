import { Input, NavBar, TextArea } from "antd-mobile";

import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store";
import { useEffect, useRef, useState } from "react";
import { InputRef } from "antd-mobile/es/components/input";
import { TextAreaRef } from "antd-mobile/es/components/text-area";

type Props = {
  onUpdateUserProfile: (type: "" | "name" | "intro", value: string) => void;
  onClose: () => void;
  type: "" | "name" | "intro";
};
const EditInput = ({ onClose, type, onUpdateUserProfile }: Props) => {
  const isName = type === "name";
  const title = type === "name" ? "昵称" : "简介";
  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile,
  );
  const [value, setValue] = useState(
    isName ? userProfile.name : userProfile.intro,
  );
  const inputRef = useRef<InputRef>(null);
  const textAreaRef = useRef<TextAreaRef>(null);
  useEffect(() => {
    if (isName) {
      inputRef.current?.focus();
    } else {
      textAreaRef.current?.focus();
      // 文本域选中
      document.querySelector("textarea")?.setSelectionRange(-1, -1);
    }
  }, []);
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span
            className="commit-btn"
            onClick={() => onUpdateUserProfile(type, value)}
          >
            提交
          </span>
        }
        onBack={onClose}
      >
        编辑{title}
      </NavBar>

      <div className="edit-input-content">
        <h3>{title}</h3>
        {isName ? (
          <div className="input-wrap">
            <Input
              ref={inputRef}
              placeholder="请输入"
              value={value}
              onChange={(e) => setValue(e)}
            />
          </div>
        ) : (
          <TextArea
            ref={textAreaRef}
            autoSize
            style={{
              background: "white",
              padding: "10px",
              borderRadius: 5,
            }}
            placeholder="请输入内容"
            value={value ? value : ""}
            onChange={(e) => setValue(e)}
          />
        )}
      </div>
    </div>
  );
};

export default EditInput;
