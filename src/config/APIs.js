const BASE_URL = process.env.REACT_APP_API_URL || '/api';

export const APIS = {
  // Auth & OTP
  SEND_OTP: `${BASE_URL}/auth/send-otp`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh`,

  // Underwriting & Eligibility
  CALCULATE_ELIGIBILITY: `${BASE_URL}/calculate`,
  POLICY_RULES: `${BASE_URL}/admin/policy-matrices`,
  PINCODE_LOOKUP: `${BASE_URL}/admin/pincodes/search`,
  COMPANY_SEARCH: `${BASE_URL}/companies/search`,

  // Customer Portal & Applications
  USER_PROFILE: `${BASE_URL}/portal/profile`,
  APPLICATIONS: `${BASE_URL}/portal/applications`,
  CIBIL_SCORE: `${BASE_URL}/portal/cibil`,
  DOCUMENTS: `${BASE_URL}/portal/documents`,
};

export default APIS;
