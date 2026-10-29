const { getDocumentStatusLabel, isDocumentExpiring } = require('../src/components/Profile/MyDocuments');

describe('MyDocuments Component Helper Tests', () => {
  it('should return correct display label for document status', () => {
    expect(getDocumentStatusLabel('VERIFIED')).toBe('Verified');
    expect(getDocumentStatusLabel('PENDING')).toBe('Pending Review');
    expect(getDocumentStatusLabel('REJECTED')).toBe('Rejected');
    expect(getDocumentStatusLabel('UNKNOWN')).toBe('Not Uploaded');
  });

  it('should detect expiring documents', () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 5);

    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 2);

    expect(isDocumentExpiring(nextWeek.toISOString())).toBe(true);
    expect(isDocumentExpiring(nextYear.toISOString())).toBe(false);
  });
});
