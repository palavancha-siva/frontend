import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../actions/auth';

export const useSendOtp = () => {
  const [mobile, setMobile] = useState('');
  const [timer, setTimer] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSend = useCallback(
    async (targetMobile) => {
      const mob = targetMobile || mobile;
      if (!mob || mob.length !== 10) {
        setError('Please enter a valid 10-digit mobile number');
        return false;
      }
      setIsSending(true);
      setError(null);
      try {
        dispatch(sendOtp(mob));
        setTimer(30);
        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setIsSending(false);
        return true;
      } catch (err) {
        setError(err.message || 'Failed to dispatch OTP');
        setIsSending(false);
        return false;
      }
    },
    [dispatch, mobile]
  );

  return {
    mobile,
    setMobile,
    timer,
    isSending,
    error,
    handleSend,
  };
};

export default useSendOtp;
