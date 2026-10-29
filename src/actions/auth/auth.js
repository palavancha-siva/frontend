export const AUTH_ACTION_TYPES = {
  SEND_OTP_REQUEST: 'AUTH/SEND_OTP_REQUEST',
  SEND_OTP_SUCCESS: 'AUTH/SEND_OTP_SUCCESS',
  SEND_OTP_FAILURE: 'AUTH/SEND_OTP_FAILURE',

  VERIFY_OTP_REQUEST: 'AUTH/VERIFY_OTP_REQUEST',
  VERIFY_OTP_SUCCESS: 'AUTH/VERIFY_OTP_SUCCESS',
  VERIFY_OTP_FAILURE: 'AUTH/VERIFY_OTP_FAILURE',

  LOGOUT: 'AUTH/LOGOUT',
  SET_CURRENT_USER: 'AUTH/SET_CURRENT_USER',
};

export const sendOtp = (mobile) => ({
  type: AUTH_ACTION_TYPES.SEND_OTP_REQUEST,
  payload: { mobile },
});

export const verifyOtp = (mobile, otp) => ({
  type: AUTH_ACTION_TYPES.VERIFY_OTP_REQUEST,
  payload: { mobile, otp },
});

export const logout = () => ({
  type: AUTH_ACTION_TYPES.LOGOUT,
});

export const setCurrentUser = (user) => ({
  type: AUTH_ACTION_TYPES.SET_CURRENT_USER,
  payload: user,
});
