import { RootState } from '@/types/store'
import { Input, NavBar, TextArea } from 'antd-mobile'
import { InputRef } from 'antd-mobile/es/components/input'
import { TextAreaRef } from 'antd-mobile/es/components/text-area'
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import styles from './index.module.scss'
type Props = {
  onUpdateUserProfile: (type: '' | 'name' | 'intro', value: string) => void
  onClose: () => void
  type: '' | 'name' | 'intro'
}
const EditInput = ({ onClose, type, onUpdateUserProfile }: Props) => {
  const { userProfile } = useSelector((state: RootState) => state.profile)
  const isName = type === 'name'
  const [value, setValue] = useState(
    isName ? userProfile.name : userProfile.intro
  )
  const name = isName ? '昵称' : '简介'

  // 控制昵称和简介的默认选中
  const inputRef = useRef<InputRef>(null)
  const textAreaRef = useRef<TextAreaRef>(null)
  useEffect(() => {
    if (isName) {
      inputRef.current?.focus()
    } else {
      textAreaRef.current?.focus()
      document.querySelector('textarea')?.setSelectionRange(-1, -1)
    }
  }, [])
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
        编辑{name}
      </NavBar>

      <div className="edit-input-content">
        <h3>{name}</h3>

        {isName ? (
          <div className="input-wrap">
            <Input
              placeholder="请输入"
              value={value}
              onChange={(e) => setValue(e)}
              ref={inputRef}
            />
          </div>
        ) : (
          <TextArea
            ref={textAreaRef}
            style={{ background: '#fff', padding: 10, borderRadius: 5 }}
            rows={5}
            placeholder="请输入内容"
            value={value}
            onChange={(e) => setValue(e)}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
