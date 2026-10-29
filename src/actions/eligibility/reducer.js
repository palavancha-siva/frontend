import { ELIGIBILITY_ACTION_TYPES } from './eligibility';

const initialState = {
  criteria: {
    monthlyIncome: 75000,
    requestedLoanAmount: 500000,
    tenureYears: 5,
    employmentType: 'SALARIED',
    cibilScore: 750,
  },
  offers: [],
  bestOffer: null,
  loading: false,
  error: null,
};

export default function eligibilityReducer(state = initialState, action) {
  switch (action.type) {
    case ELIGIBILITY_ACTION_TYPES.SET_CRITERIA:
      return { ...state, criteria: { ...state.criteria, ...action.payload } };

    case ELIGIBILITY_ACTION_TYPES.CALCULATE_OFFERS_REQUEST:
      return { ...state, loading: true, error: null };

    case ELIGIBILITY_ACTION_TYPES.CALCULATE_OFFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        offers: action.payload.offers || [],
        bestOffer: action.payload.bestOffer || null,
        error: null,
      };

    case ELIGIBILITY_ACTION_TYPES.CALCULATE_OFFERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ELIGIBILITY_ACTION_TYPES.RESET_OFFERS:
      return { ...state, offers: [], bestOffer: null, error: null };

    default:
      return state;
  }
}
