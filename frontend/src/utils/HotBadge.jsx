import React from 'react'
import styles from './hotBadge.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles);

const HotBadge = ({ text = 'Hot', icon = true }) => {
  return (
    <div className={cx("hot-badge")}>
      {icon && (
        <FontAwesomeIcon icon={faFire} className={cx("hot-badge-icon")} />
      )}
      <span>{text}</span>
    </div>
  )
}

export default HotBadge

