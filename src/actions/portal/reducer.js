import { PORTAL_ACTION_TYPES } from './portal';

const initialState = {
  applications: [
    {
      id: 'APP-10291',
      bankName: 'HDFC Bank',
      loanType: 'Personal Loan',
      amount: 500000,
      status: 'UNDERWRITING',
      appliedOn: '2026-10-20',
      progressStep: 2,
    },
    {
      id: 'APP-09432',
      bankName: 'ICICI Bank',
      loanType: 'Instant Cash Loan',
      amount: 250000,
      status: 'APPROVED',
      appliedOn: '2026-09-12',
      progressStep: 4,
    },
  ],
  cibil: {
    score: 782,
    category: 'EXCELLENT',
    lastChecked: '2026-10-25',
    activeAccounts: 3,
    totalOutstanding: 142000,
  },
  profile: {
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    mobile: '9876543210',
    pan: 'ABCDE1234F',
    dob: '1990-05-15',
    monthlyIncome: 85000,
    companyName: 'Tata Consultancy Services',
    pincode: '560001',
    city: 'Bangalore',
    state: 'Karnataka',
  },
  loading: false,
  error: null,
};

export default function portalReducer(state = initialState, action) {
  switch (action.type) {
    case PORTAL_ACTION_TYPES.FETCH_APPLICATIONS_REQUEST:
    case PORTAL_ACTION_TYPES.FETCH_CIBIL_REQUEST:
    case PORTAL_ACTION_TYPES.UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case PORTAL_ACTION_TYPES.FETCH_APPLICATIONS_SUCCESS:
      return { ...state, loading: false, applications: action.payload };

    case PORTAL_ACTION_TYPES.FETCH_CIBIL_SUCCESS:
      return { ...state, loading: false, cibil: action.payload };

    case PORTAL_ACTION_TYPES.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: { ...state.profile, ...action.payload },
      };

    case PORTAL_ACTION_TYPES.FETCH_APPLICATIONS_FAILURE:
    case PORTAL_ACTION_TYPES.FETCH_CIBIL_FAILURE:
    case PORTAL_ACTION_TYPES.UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
