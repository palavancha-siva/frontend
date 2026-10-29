const SESSION_KEY_PREFIX = 'finkuby_sess_';

export const setSessionItem = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(`${SESSION_KEY_PREFIX}${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('SessionStore save error', e);
  }
};

export const getSessionItem = (key) => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(`${SESSION_KEY_PREFIX}${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const removeSessionItem = (key) => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(`${SESSION_KEY_PREFIX}${key}`);
};

export const clearSession = () => {
  if (typeof window === 'undefined') return;
  sessionStorage.clear();
};
