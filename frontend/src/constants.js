export const TABS = {
  PROFILE: "profile",
  ADDRESS: "address",
  CHANGE_PASSWORD: "change_password",
  NOTIFICATION: "notification",
  PERSONAL_INFO: "personal_info",
  ORDERS: "orders",
  VOUCHERS: "vouchers",
  NOTIFICATIONS_PAGE: "notifications_page",
};

export const ROLE_KEYS = { 0: "user", 1: "seller", 2: "admin" };

// Chỉ user và seller được chọn; admin chỉ do hệ thống gán
export const SELECTABLE_ROLE_KEYS = { 0: "user", 1: "seller" };

export const formatVal = (v) =>
  v !== undefined && v !== null && v !== "" ? v : "-";

export const getFullName = (user, lang = "en") =>
  user?.firstName && user?.lastName
    ? lang === "vi"
      ? `${user.lastName} ${user.firstName}`
      : `${user.firstName} ${user.lastName}`
    : user?.firstName || user?.lastName || "-";
