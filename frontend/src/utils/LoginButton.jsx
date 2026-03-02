import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from "./LoginButton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const LoginButton = () => {
  return (
    <Link to="/login" className={cx("login-button")}>
      <button className={cx("login-button-text")}>
        <FontAwesomeIcon icon={faUser} />
        Login
      </button>
    </Link>
  )
}

export default LoginButton
