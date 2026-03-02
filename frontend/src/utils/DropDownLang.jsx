import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import styles from "./dropDownLang.module.scss";

const cx = classNames.bind(styles);

const DropDownLang = () => {
  const { i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const languages = [
    { code: "vi", label: "Tiếng Việt", flag: "VIE" },
    { code: "en", label: "English", flag: "ENG" },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  return (
    <div className={cx("language-dropdown")} ref={langDropdownRef}>
      <button 
        className={cx("language-button")} 
        onClick={() => setIsLangOpen(!isLangOpen)}
      >
        <FontAwesomeIcon icon={faGlobe} />
        <span>{currentLanguage.flag}</span>
        <FontAwesomeIcon icon={faChevronDown} className={cx("chevron", { open: isLangOpen })} />
      </button>
      {isLangOpen && (
        <div className={cx("language-menu")}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={cx("language-option", { active: lang.code === i18n.language })}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className={cx("flag")}>{lang.flag}</span>
              <span className={cx("label")}>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownLang;

