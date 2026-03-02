import styles from './button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const Button = ({ children, onClick, type = "button", className }) => {
  return (
    <button type={type} className={cx("btn", className)} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button