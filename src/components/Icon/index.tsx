import React from 'react'
import classnames from 'classnames'
type Props = {
  className?: string
  type: string
  onClick?: () => void
}
const index = ({ className, type, onClick }: Props) => {
  return (
    <svg
      onClick={onClick}
      className={classnames('icon', className)}
      aria-hidden="true"
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

export default index
