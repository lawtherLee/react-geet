import { Button, DatePicker, List, NavBar, Popup } from "antd-mobile";
import classNames from "classnames";

import styles from "./index.module.scss";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/store/actions/profile";
import { RootState } from "@/types/store";

const Item = List.Item;

const ProfileEdit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile,
  );
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
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
            >
              头像
            </Item>
            <Item arrow extra={userProfile.name}>
              昵称
            </Item>
            <Item
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
            <Item arrow extra={userProfile.gender ? "男" : "女"}>
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
        visible={false}
        bodyStyle={{ height: "100vh" }}
        destroyOnClose
      ></Popup>

      {/* 编辑性别和头像的弹层 */}
      <Popup visible={false} destroyOnClose></Popup>
    </div>
  );
};

export default ProfileEdit;
