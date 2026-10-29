export const SETTINGS_ACTION_TYPES = {
  TOGGLE_THEME: 'SETTINGS/TOGGLE_THEME',
  SET_LANGUAGE: 'SETTINGS/SET_LANGUAGE',
  TOGGLE_NOTIFICATIONS: 'SETTINGS/TOGGLE_NOTIFICATIONS',
};

export const toggleTheme = () => ({
  type: SETTINGS_ACTION_TYPES.TOGGLE_THEME,
});

export const setLanguage = (lang) => ({
  type: SETTINGS_ACTION_TYPES.SET_LANGUAGE,
  payload: lang,
});

export const toggleNotifications = () => ({
  type: SETTINGS_ACTION_TYPES.TOGGLE_NOTIFICATIONS,
});
