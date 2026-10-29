import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const IDLE_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes of inactivity

export const IdleLogout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(logout());
      }, IDLE_TIMEOUT_MS);
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach((evt) => window.addEventListener(evt, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [dispatch]);

  return null;
};

export default IdleLogout;
