export const JOURNEY_STEPS = [
  { step: 1, key: 'ELIGIBILITY', label: 'Eligibility Check', path: '/calculator' },
  { step: 2, key: 'OFFERS', label: 'Select Best Offer', path: '/offers' },
  { step: 3, key: 'DETAILS', label: 'Personal & KYC Details', path: '/application' },
  { step: 4, key: 'DOCUMENTS', label: 'Upload Documents', path: '/documents' },
  { step: 5, key: 'VERIFICATION', label: 'Bank Sanction & Disbursal', path: '/dashboard' },
];

export const getNextJourneyStep = (currentStepKey) => {
  const index = JOURNEY_STEPS.findIndex((s) => s.key === currentStepKey);
  if (index !== -1 && index < JOURNEY_STEPS.length - 1) {
    return JOURNEY_STEPS[index + 1];
  }
  return null;
};
