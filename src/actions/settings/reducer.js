import { SETTINGS_ACTION_TYPES } from './settings';

const initialState = {
  theme: 'light',
  language: 'en',
  notificationsEnabled: true,
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_ACTION_TYPES.TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case SETTINGS_ACTION_TYPES.SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SETTINGS_ACTION_TYPES.TOGGLE_NOTIFICATIONS:
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    default:
      return state;
  }
}
