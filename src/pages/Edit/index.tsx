import { Button, DatePicker, List, NavBar, Popup, Toast } from "antd-mobile";
import classNames from "classnames";

import styles from "./index.module.scss";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useInitState } from "@/hooks";
import { getUserProfile, updateUserProfile } from "@/store/actions/profile";
import EditInput from "@/pages/Edit/components/EditInput";
import { useDispatch } from "react-redux";
import EditList from "@/pages/Edit/components/EditList";

const Item = List.Item;

const ProfileEdit = () => {
  type ShowInputType = { type: "" | "name" | "intro"; visible: boolean };
  const history = useHistory();
  const dispatch = useDispatch();

  const [showInput, setShowInput] = useState<ShowInputType>({
    type: "",
    visible: false,
  });
  // 关闭编辑昵称和简介的弹层
  const onCloseInput = () => {
    setShowInput({ type: "", visible: false });
  };
  const { userProfile } = useInitState("profile", getUserProfile);

  // 父组件更新用户信息
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
            <input type="file" hidden />
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
            <Item arrow extra={userProfile.birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
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
        <EditList onClose={onCloseUserList} type={userList.type} />
      </Popup>
    </div>
  );
};

export default ProfileEdit;
