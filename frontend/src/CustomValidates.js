export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (value, t) => {
  if (!value?.trim()) return t("components.auth.register.validation.email_required");
  if (!EMAIL_REGEX.test(value.trim())) return t("components.auth.register.validation.email_invalid");
  return null;
};

export const validateProfileForm = (form, t) => {
  const errors = {};
  if (!form.firstName?.trim()) {
    errors.firstName = t('components.ui.account.profile.edit.required.first_name');
  }
  if (!form.lastName?.trim()) {
    errors.lastName = t('components.ui.account.profile.edit.required.last_name');
  }
  if (!form.email?.trim()) {
    errors.email = t('components.ui.account.profile.edit.required.email');
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = t('components.ui.account.profile.edit.validation.email_invalid');
  }
  return errors;
};

