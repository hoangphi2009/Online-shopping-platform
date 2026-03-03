import styles from './button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const Button = ({ children, onClick, type = "button", className, disabled }) => {
  return (
    <button type={type} className={cx("btn", className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button