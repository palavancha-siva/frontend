import { takeLatest, put, call } from 'redux-saga/effects';
import { AUTH_ACTION_TYPES } from './auth';

// Simulated API call for OTP request
function mockSendOtpApi(mobile) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, mobile }), 400);
  });
}

// Simulated API call for OTP verification
function mockVerifyOtpApi(mobile, otp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === '1234' || otp.length === 4 || otp.length === 6) {
        resolve({
          id: 'USR_' + mobile.slice(-4),
          mobile,
          name: 'Verified Customer',
          token: 'finkuby_jwt_mock_token',
        });
      } else {
        reject(new Error('Invalid OTP code. Use 1234 for sandbox mode.'));
      }
    }, 500);
  });
}

function* handleSendOtp(action) {
  try {
    const response = yield call(mockSendOtpApi, action.payload.mobile);
    yield put({ type: AUTH_ACTION_TYPES.SEND_OTP_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: AUTH_ACTION_TYPES.SEND_OTP_FAILURE, payload: error.message });
  }
}

function* handleVerifyOtp(action) {
  try {
    const user = yield call(mockVerifyOtpApi, action.payload.mobile, action.payload.otp);
    yield put({ type: AUTH_ACTION_TYPES.VERIFY_OTP_SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: AUTH_ACTION_TYPES.VERIFY_OTP_FAILURE, payload: error.message });
  }
}

export default function* authSaga() {
  yield takeLatest(AUTH_ACTION_TYPES.SEND_OTP_REQUEST, handleSendOtp);
  yield takeLatest(AUTH_ACTION_TYPES.VERIFY_OTP_REQUEST, handleVerifyOtp);
}
