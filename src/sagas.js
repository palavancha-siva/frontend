import { all } from 'redux-saga/effects';
import { authSaga } from './actions/auth';
import { eligibilitySaga } from './actions/eligibility';
import { portalSaga } from './actions/portal';
import { settingsSaga } from './actions/settings';

export default function* rootSaga() {
  yield all([
    authSaga(),
    eligibilitySaga(),
    portalSaga(),
    settingsSaga(),
  ]);
}
