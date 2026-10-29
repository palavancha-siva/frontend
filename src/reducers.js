import { combineReducers } from 'redux';
import { authReducer } from './actions/auth';
import { eligibilityReducer } from './actions/eligibility';
import { portalReducer } from './actions/portal';
import { settingsReducer } from './actions/settings';

const rootReducer = combineReducers({
  auth: authReducer,
  eligibility: eligibilityReducer,
  portal: portalReducer,
  settings: settingsReducer,
});

export default rootReducer;
