import { takeLatest, put, call } from 'redux-saga/effects';
import { ELIGIBILITY_ACTION_TYPES } from './eligibility';

async function fetchEligibilityOffers(criteria) {
  try {
    const res = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(criteria),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // fallback simulation
  }

  // Graceful fallback simulation
  const income = Number(criteria.monthlyIncome) || 75000;
  const maxEligible = income * 24;
  return {
    offers: [
      {
        bankId: 'HDFC',
        bankName: 'HDFC Bank',
        interestRate: 10.5,
        maxEligibleLoan: Math.min(criteria.requestedLoanAmount || 500000, maxEligible),
        emi: Math.round(((criteria.requestedLoanAmount || 500000) * 0.0105 * 5) / 5),
        processingFee: '0.5%',
        foir: 50,
      },
      {
        bankId: 'ICICI',
        bankName: 'ICICI Bank',
        interestRate: 10.75,
        maxEligibleLoan: Math.min(criteria.requestedLoanAmount || 500000, maxEligible * 0.95),
        emi: Math.round(((criteria.requestedLoanAmount || 500000) * 0.01075 * 5) / 5),
        processingFee: '0.75%',
        foir: 55,
      },
      {
        bankId: 'AXIS',
        bankName: 'Axis Bank',
        interestRate: 11.0,
        maxEligibleLoan: Math.min(criteria.requestedLoanAmount || 500000, maxEligible * 0.9),
        emi: Math.round(((criteria.requestedLoanAmount || 500000) * 0.011 * 5) / 5),
        processingFee: '1.0%',
        foir: 50,
      },
    ],
  };
}

function* handleCalculateOffers(action) {
  try {
    const data = yield call(fetchEligibilityOffers, action.payload);
    yield put({
      type: ELIGIBILITY_ACTION_TYPES.CALCULATE_OFFERS_SUCCESS,
      payload: {
        offers: data.offers || [],
        bestOffer: (data.offers && data.offers[0]) || null,
      },
    });
  } catch (error) {
    yield put({
      type: ELIGIBILITY_ACTION_TYPES.CALCULATE_OFFERS_FAILURE,
      payload: error.message,
    });
  }
}

export default function* eligibilitySaga() {
  yield takeLatest(ELIGIBILITY_ACTION_TYPES.CALCULATE_OFFERS_REQUEST, handleCalculateOffers);
}
