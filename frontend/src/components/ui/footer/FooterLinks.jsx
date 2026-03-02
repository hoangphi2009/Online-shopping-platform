import { Link } from "react-router-dom";
import styles from "./footerLinks.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const FooterLinks = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("components.ui.footer.footer_links.quick_links.title"),
      links: [
        {
          name: t("components.ui.footer.footer_links.quick_links.home"),
          path: "/home",
        },
        {
          name: t("components.ui.footer.footer_links.quick_links.best_sellers"),
          path: "/best-sellers",
        },
        {
          name: t("components.ui.footer.footer_links.quick_links.categories"),
          path: "/categories",
        },
        {
          name: t("components.ui.footer.footer_links.quick_links.offers_deals"),
          path: "/offers-deals",
        },
        {
          name: t("components.ui.footer.footer_links.quick_links.about_us"),
          path: "/about-us",
        },
      ],
    },
    {
      title: t("components.ui.footer.footer_links.customer_service.title"),
      links: [
        {
          name: t(
            "components.ui.footer.footer_links.customer_service.delivery_info"
          ),
          path: "/delivery-info",
        },
        {
          name: t(
            "components.ui.footer.footer_links.customer_service.return_refund"
          ),
          path: "/return-refund-policy",
        },
        {
          name: t(
            "components.ui.footer.footer_links.customer_service.payment_methods"
          ),
          path: "/payment-methods",
        },
        {
          name: t(
            "components.ui.footer.footer_links.customer_service.track_order"
          ),
          path: "/track-order",
        },
        {
          name: t("components.ui.footer.footer_links.customer_service.faqs"),
          path: "/faqs",
        },
      ],
    },
    {
      title: t("components.ui.footer.footer_links.contact_us.title"),
      links: [
        {
          name: t("components.ui.footer.footer_links.contact_us.blog"),
          path: "/blog",
        },
        {
          name: t("components.ui.footer.footer_links.contact_us.careers"),
          path: "/careers",
        },
        {
          name: t("components.ui.footer.footer_links.contact_us.press"),
          path: "/press",
        },
        {
          name: t("components.ui.footer.footer_links.contact_us.newsletter"),
          path: "/newsletter",
        },
        {
          name: t("components.ui.footer.footer_links.contact_us.networks"),
          path: "/networks",
        },
      ],
    },
  ];

  return (
    <div className={cx("footer-links")}>
      {columns.map((column, index) => (
        <div key={index} className={cx("footer-column")}>
          <h3>{column.title}</h3>
          <ul>
            {column.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;
