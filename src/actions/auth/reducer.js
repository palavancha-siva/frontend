import { AUTH_ACTION_TYPES } from './auth';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  otpSent: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SEND_OTP_REQUEST:
    case AUTH_ACTION_TYPES.VERIFY_OTP_REQUEST:
      return { ...state, loading: true, error: null };

    case AUTH_ACTION_TYPES.SEND_OTP_SUCCESS:
      return { ...state, loading: false, otpSent: true, error: null };

    case AUTH_ACTION_TYPES.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case AUTH_ACTION_TYPES.SEND_OTP_FAILURE:
    case AUTH_ACTION_TYPES.VERIFY_OTP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case AUTH_ACTION_TYPES.LOGOUT:
      return { ...initialState };

    case AUTH_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: Boolean(action.payload),
      };

    default:
      return state;
  }
}
