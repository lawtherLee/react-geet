import classnames from 'classnames'
import { useState } from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/types/store'
import { differenceBy } from 'lodash'
import { addChannel, delChannel, setChannelActive } from '@/store/actions/home'
import { Channel } from '@/types/data'
type Props = {
  onClose: () => void
}
const Channels = ({ onClose }: Props) => {
  const dispatch = useDispatch()
  const { channels, active } = useSelector((state: RootState) => state.home)

  const recomendChannels = useSelector((state: RootState) => {
    const { allChannels } = state.home
    // 计算一个数据 allChannels - channels
    // 循环每一项,每一项是否在channels中
    return differenceBy(allChannels, channels, 'id')
  })

  // 点击我的频道
  const onClickMyChannel = (id: number) => {
    if (isEdit) {
      // 处于编辑状态
      dispatch(delChannel(id))
    } else {
      // 未处于编辑状态
      dispatch(setChannelActive(id))
      onClose()
    }
  }

  // 编辑
  const [isEdit, setIsEdit] = useState(false)

  // 点击推荐频道
  const onClickRecomendChannel = (item: Channel) => {
    dispatch(addChannel(item))
  }

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item', isEdit ? 'edit' : '')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {isEdit ? '点击删除频道' : '点击进入频道'}
            </span>
            <span
              onClick={() => setIsEdit(!isEdit)}
              className="channel-item-edit"
            >
              {isEdit ? '完成' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {channels.map((item) => {
              return (
                <span
                  key={item.id}
                  onClick={() => onClickMyChannel(item.id)}
                  className={classnames(
                    'channel-list-item',
                    active === item.id ? 'selected' : ''
                  )}
                >
                  {item.name}
                  <Icon type="iconbtn_tag_close" />
                </span>
              )
            })}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recomendChannels.map((item) => {
              return (
                <span
                  onClick={() => onClickRecomendChannel(item)}
                  key={item.id}
                  className="channel-list-item"
                >
                  + {item.name}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
