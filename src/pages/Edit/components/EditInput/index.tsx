import { Input, NavBar, TextArea } from "antd-mobile";

import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store";
import { useState } from "react";

type Props = {
  // onUpdateUserProfile: (type: "" | "name" | "intro", value: string) => void;
  onClose: () => void;
  type: "" | "name" | "intro";
};
const EditInput = ({ onClose, type }: Props) => {
  const title = type === "name" ? "昵称" : "简介";
  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile,
  );
  const [value, setValue] = useState(
    type === "name" ? userProfile.name : userProfile.intro,
  );
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={<span className="commit-btn">提交</span>}
        onBack={onClose}
      >
        编辑{title}
      </NavBar>

      <div className="edit-input-content">
        <h3>{title}</h3>
        {type === "name" ? (
          <div className="input-wrap">
            <Input placeholder="请输入" value={value} />
          </div>
        ) : (
          <TextArea
            autoSize
            style={{
              background: "white",
              padding: "10px",
              borderRadius: 5,
            }}
            placeholder="请输入内容"
            value={value}
          />
        )}
      </div>
    </div>
  );
};

export default EditInput;
