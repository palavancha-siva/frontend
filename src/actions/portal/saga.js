import { takeLatest, put } from 'redux-saga/effects';
import { PORTAL_ACTION_TYPES } from './portal';

function* handleFetchApplications() {
  try {
    // In connected environment, this fetches from /api/applications
    yield put({
      type: PORTAL_ACTION_TYPES.FETCH_APPLICATIONS_SUCCESS,
      payload: [
        {
          id: 'APP-10291',
          bankName: 'HDFC Bank',
          loanType: 'Personal Loan',
          amount: 500000,
          status: 'UNDERWRITING',
          appliedOn: '2026-10-20',
          progressStep: 2,
        },
      ],
    });
  } catch (error) {
    yield put({ type: PORTAL_ACTION_TYPES.FETCH_APPLICATIONS_FAILURE, payload: error.message });
  }
}

function* handleUpdateProfile(action) {
  try {
    yield put({ type: PORTAL_ACTION_TYPES.UPDATE_PROFILE_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: PORTAL_ACTION_TYPES.UPDATE_PROFILE_FAILURE, payload: error.message });
  }
}

export default function* portalSaga() {
  yield takeLatest(PORTAL_ACTION_TYPES.FETCH_APPLICATIONS_REQUEST, handleFetchApplications);
  yield takeLatest(PORTAL_ACTION_TYPES.UPDATE_PROFILE_REQUEST, handleUpdateProfile);
}
