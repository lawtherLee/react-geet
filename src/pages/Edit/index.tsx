import {
  Button,
  DatePicker,
  Dialog,
  List,
  NavBar,
  Popup,
  Toast,
} from "antd-mobile";
import classNames from "classnames";

import styles from "./index.module.scss";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useInitState } from "@/hooks";
import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile,
} from "@/store/actions/profile";
import EditInput from "@/pages/Edit/components/EditInput";
import { useDispatch } from "react-redux";
import EditList from "@/pages/Edit/components/EditList";
import dayjs from "dayjs";
import { logout } from "@/store/actions/login";

const Item = List.Item;

const ProfileEdit = () => {
  type ShowInputType = { type: "" | "name" | "intro"; visible: boolean };
  const history = useHistory();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = useState<ShowInputType>({
    type: "",
    visible: false,
  });
  // 关闭编辑昵称和简介的弹层
  const onCloseInput = () => {
    setShowInput({ type: "", visible: false });
  };
  const { userProfile } = useInitState("profile", getUserProfile);

  // 父组件更新用户信息（昵称/简介）
  const onUpdateUserProfile = (type: "" | "name" | "intro", value: string) => {
    dispatch(updateUserProfile(type, value));
    Toast.show("更新成功");
    onCloseInput();
  };

  // 实现性别和头像
  type UserListType = {
    type: "" | "gender" | "photo";
    visible: boolean;
  };
  const [userList, setUserList] = useState<UserListType>({
    type: "",
    visible: false,
  });
  const onCloseUserList = () => {
    setUserList({
      type: "",
      visible: false,
    });
  };
  // 父组件更新用户信息（头像/性别）
  const onUpdateGenderOrPhoto = (
    type: "" | "gender" | "photo" | "birthday",
    value: string,
  ) => {
    if (type === "photo") {
      fileInputRef.current?.click();
      return;
    }
    dispatch(updateUserProfile(type, value));
    Toast.show("更新成功");
    onCloseUserList();
  };

  // 选择图片
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files![0]);
    const formData = new FormData();
    formData.append("photo", e.target.files![0]);
    dispatch(updateUserPhoto(formData));
    onCloseUserList();
  };

  // 编辑生日
  const [showBirthday, setShowBirthday] = useState(false);

  // 退出
  const onLogout = () => {
    Dialog.show({
      title: "Are You Sure",
      content: "人在天边月上明，风初紧，吹入画帘旌",
      closeOnAction: true,
      actions: [
        [
          {
            key: "cancel",
            text: "取消",
          },
          {
            key: "confirm",
            text: "确认",
            bold: true,
            danger: true,
            onClick: () => {
              dispatch(logout());
              history.replace("/login");
            },
          },
        ],
      ],
    });
  };
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            "--border-bottom": "1px solid #F0F0F0",
          }}
          onBack={() => history.goBack()}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <input
              onChange={onFileChange}
              type="file"
              hidden
              ref={fileInputRef}
            />
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={userProfile.photo} alt="" />
                </span>
              }
              arrow
              onClick={() => setUserList({ type: "photo", visible: true })}
            >
              头像
            </Item>
            <Item
              onClick={() => setShowInput({ type: "name", visible: true })}
              arrow
              extra={userProfile.name}
            >
              昵称
            </Item>
            <Item
              onClick={() => setShowInput({ type: "intro", visible: true })}
              arrow
              extra={
                <span className={classNames("intro", "normal")}>
                  {userProfile.intro}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item
              onClick={() => setUserList({ type: "gender", visible: true })}
              arrow
              extra={userProfile.gender ? "男" : "女"}
            >
              性别
            </Item>
            <Item
              onClick={() => setShowBirthday(true)}
              arrow
              extra={userProfile.birthday}
            >
              生日
            </Item>
          </List>

          <DatePicker
            visible={showBirthday}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
            onCancel={() => setShowBirthday(false)}
            onConfirm={(value) =>
              onUpdateGenderOrPhoto(
                "birthday",
                dayjs(value).format("YYYY-MM-DD"),
              )
            }
          />
        </div>

        <div className="logout">
          <Button className="btn" onClick={onLogout}>
            退出登录
          </Button>
        </div>
      </div>

      {/* 编辑昵称和简介的弹层 */}
      <Popup
        position="right"
        visible={showInput.visible}
        bodyStyle={{ height: "100vh" }}
        destroyOnClose
      >
        <EditInput
          onUpdateUserProfile={onUpdateUserProfile}
          type={showInput.type}
          onClose={onCloseInput}
        />
      </Popup>

      {/* 编辑性别和头像的弹层 */}
      <Popup
        visible={userList.visible}
        destroyOnClose
        onMaskClick={onCloseUserList}
      >
        <EditList
          onUpdate={onUpdateGenderOrPhoto}
          onClose={onCloseUserList}
          type={userList.type}
        />
      </Popup>
    </div>
  );
};

export default ProfileEdit;
