import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import styles from "./mainLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const MainLayout = () => {
  return (
    <div className={cx("main-layout")}>
      <header className={cx("header")}>
        <Navbar />
      </header>
      
      <main className={cx("main-content")}>
        <Outlet />
      </main>
      
      <footer className={cx("footer")}>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;

