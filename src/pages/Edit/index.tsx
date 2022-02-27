import { Button, List, DatePicker, NavBar, Toast, Dialog } from 'antd-mobile'
import classNames from 'classnames'

import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile,
} from '@/store/actions/profile'
import { useInitState } from '@/utils/hooks'
import { Popup } from 'antd-mobile'
import React, { useRef, useState } from 'react'
import EditInput from './components/EditInput'
import { useDispatch } from 'react-redux'
import EditList from './components/EditList'
import dayjs from 'dayjs'
import { logout } from '@/store/actions/login'

const Item = List.Item

const ProfileEdit = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { userProfile } = useInitState('profile', getUserProfile)
  const fileInputRef = useRef<HTMLInputElement>(null)
  type ShowInputType = { type: '' | 'name' | 'intro'; visible: boolean }
  // 控制昵称和简介的弹层显示和隐藏
  const [showInput, setShowInput] = useState<ShowInputType>({
    type: '',
    visible: false,
  })
  // 关闭编辑昵称和简介的弹层
  const onCloseInput = () => {
    setShowInput({
      type: '',
      visible: false,
    })
  }
  // 更新用户昵称和简介信息
  const onUpdateUserProfile = async (
    type: '' | 'name' | 'intro',
    value: string
  ) => {
    await dispatch(updateUserProfile(type, value))
    Toast.show('更新成功')
    onCloseInput()
  }

  // 实现性别和头像
  type UserListType = {
    type: '' | 'gender' | 'photo'
    visible: boolean
  }
  const [userList, setUserList] = useState<UserListType>({
    type: '',
    visible: false,
  })
  // 性别更新
  const onUpdateGenderOrPhoto = async (type: string, value: string) => {
    if (type === 'photo') {
      fileInputRef.current?.click()
      return
    }
    await dispatch(updateUserProfile(type, value))
    Toast.show('更新成功')
    onCloseUserList()
  }
  const onCloseUserList = () => {
    setUserList({
      type: '',
      visible: false,
    })
  }

  // 选择了图片
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    formData.append('photo', e.target.files![0])
    // 发请求
    await dispatch(updateUserPhoto(formData))
    Toast.show('更新成功')
    onCloseUserList()
  }

  // 控制编辑生日
  const [showBirthday, setShowBirthday] = useState(false)

  // 点击退出
  const onLogout = () => {
    Dialog.show({
      content: '亲，您确定要退出吗？',
      title: '温馨提示',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'confirm',
            text: '确认',
            onClick() {
              dispatch(logout())
              history.replace('/login')
            },
          },
        ],
      ],
    })
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0',
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
              onClick={() =>
                setUserList({
                  type: 'photo',
                  visible: true,
                })
              }
            >
              头像
            </Item>
            <Item
              onClick={() => {
                setShowInput({
                  type: 'name',
                  visible: true,
                })
              }}
              arrow
              extra={userProfile.name}
            >
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {userProfile.intro}
                </span>
              }
              onClick={() => {
                setShowInput({
                  type: 'intro',
                  visible: true,
                })
              }}
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item
              onClick={() =>
                setUserList({
                  type: 'gender',
                  visible: true,
                })
              }
              arrow
              extra={userProfile.gender ? '女' : '男'}
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
            onConfirm={(val) => {
              onUpdateGenderOrPhoto('birthday', dayjs(val).format('YYYY-MM-DD'))
            }}
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
        bodyStyle={{ height: '100vh' }}
        destroyOnClose
      >
        <EditInput
          onUpdateUserProfile={onUpdateUserProfile}
          onClose={onCloseInput}
          type={showInput.type}
        />
      </Popup>

      {/* 编辑性别和头像的弹层 */}
      <Popup
        visible={userList.visible}
        onMaskClick={onCloseUserList}
        destroyOnClose
      >
        <EditList
          onUpdate={onUpdateGenderOrPhoto}
          onClose={onCloseUserList}
          type={userList.type}
        />
      </Popup>
    </div>
  )
}

export default ProfileEdit
