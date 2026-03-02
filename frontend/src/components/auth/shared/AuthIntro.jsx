import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faShieldHalved, faTruck, faStar } from '@fortawesome/free-solid-svg-icons';
import styles from "./authIntro.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const AuthIntro = ({ type = "login" }) => {
  const { t } = useTranslation();
  const content = {
    login: {
      title: t("components.intro.login.title"),
      description: t("components.intro.login.description"),
      features: [
        {
          icon: <FontAwesomeIcon icon={faShoppingCart} />,
          title: t("components.intro.login.features.easy_shopping.title"),
          description: t("components.intro.login.features.easy_shopping.description")
        },
        {
          icon: <FontAwesomeIcon icon={faShieldHalved} />,
          title: t("components.intro.login.features.security_payments.title"),
          description: t("components.intro.login.features.security_payments.description")
        },
        {
          icon: <FontAwesomeIcon icon={faTruck} />,
          title: t("components.intro.login.features.fast_delivery.title"),
          description: t("components.intro.login.features.fast_delivery.description")
        },
        {
          icon: <FontAwesomeIcon icon={faStar} />,
          title: t("components.intro.login.features.best_quality.title"),
          description: t("components.intro.login.features.best_quality.description")
        }
      ],
      stats: [
        { value: "50K+", label: t("components.intro.login.stats.happy_customers") },
        { value: "100K+", label: t("components.intro.login.stats.products_available") },
        { value: "4.9/5", label: t("components.intro.login.stats.rating") }
      ]
    },
    register: {
      title: t("components.intro.register.title"),
      description: t("components.intro.register.description"),
      features: [
        {
          icon: <FontAwesomeIcon icon={faStar} />,
          title: t("components.intro.register.features.exclusive_deals.title"),
          description: t("components.intro.register.features.exclusive_deals.description")
        },
        {
          icon: <FontAwesomeIcon icon={faShoppingCart} />,
          title: t("components.intro.register.features.wishlist_and_save.title"),
          description: t("components.intro.register.features.wishlist_and_save.description")
        },
        {
          icon: <FontAwesomeIcon icon={faTruck} />,
          title: t("components.intro.register.features.order_tracking.title"),
          description: t("components.intro.register.features.order_tracking.description")
        },
        {
          icon: <FontAwesomeIcon icon={faShieldHalved} />,
          title: t("components.intro.register.features.secure_account.title"),
          description: t("components.intro.register.features.secure_account.description")
        }
      ],
      stats: [
        { value: "10K+", label: t("components.intro.register.stats.new_users_this_month") },
        { value: "500+", label: t("components.intro.register.stats.brands") },
        { value: "99%", label: t("components.intro.register.stats.satisfaction") }
      ]
    }
  };

  const currentContent = content[type];

  return (
    <div className={cx("auth-intro")}>
      <div className={cx("intro-content")}>
        <h2 className={cx("intro-title")}>{currentContent.title}</h2>
        <p className={cx("intro-description")}>{currentContent.description}</p>

        <div className={cx("features")}>
          {currentContent.features.map((feature, index) => (
            <div key={index} className={cx("feature-item")}>
              <div className={cx("feature-icon")}>{feature.icon}</div>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={cx("stats")}>
          {currentContent.stats.map((stat, index) => (
            <div key={index} className={cx("stat-item")}>
              <h4>{stat.value}</h4>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthIntro;

